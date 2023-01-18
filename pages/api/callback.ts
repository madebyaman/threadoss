import { prisma } from '@/lib/prisma';
import { twitterClient } from '@/lib/twitterClient';
import { NextApiRequest, NextApiResponse } from 'next';
import process from 'process';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookie from 'cookie';
import { UserV2 } from 'twitter-api-v2';

export default async function Callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { state, code } = req.body;
  if (
    !state ||
    !code ||
    typeof state !== 'string' ||
    typeof code !== 'string'
  ) {
    return res.status(400).json({ error: 'Unauthorized' });
  }

  // Find if same token is present in cookies
  const { THREADOSS_TEMP_TOKEN } = req.cookies;
  if (!THREADOSS_TEMP_TOKEN) {
    return res.status(400).json({ error: 'Token not found' });
  }
  const { codeVerifier, token } = jwt.verify(
    THREADOSS_TEMP_TOKEN,
    process.env.PRIVATE_KEY || 'string'
  ) as JwtPayload;
  if (token !== state) {
    return res.status(400).json({ error: "Tokens don't match" });
  }

  let data: UserV2 | null = null;
  try {
    const { client: loggedClient } = await twitterClient.loginWithOAuth2({
      code,
      codeVerifier: codeVerifier,
      redirectUri: process.env.BASE_URL + '/callback',
    });
    data = (await loggedClient.v2.me()).data;
  } catch (e) {
    return res.status(500).json({ error: 'Twitter error' });
  }

  if (!data) {
    return res.status(500).json({ error: 'Twitter not sent data' });
  }
  // Use the data to create a new profile
  try {
    const user = await prisma.user.create({
      data: { username: data.username, token: code, codeVerifier },
    });
    const token = jwt.sign(
      {
        id: user.id,
        time: Date.now(),
      },
      process.env.PRIVATE_KEY || 'secret',
      { expiresIn: '8h' }
    );

    console.log('setting cookies');
    res.setHeader('Set-Cookie', [
      cookie.serialize('THREADOSS_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }),
      'THREADOSS_TEMP_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; HttpOnly',
    ]);
    console.log('cookies set');
  } catch (e) {
    return res.status(500).json({ error: 'DB error' });
  }
  return res.status(200).json({ result: 'Success' });
}
