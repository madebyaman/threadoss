import { prisma } from '@/lib/prisma';
import { twitterClient } from '@/lib/twitterClient';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import process from 'process';

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

  // Find if user is saved with same token
  let user: User | null = null;
  try {
    user = await prisma.user.findFirst({
      where: {
        token: state,
      },
    });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
  if (!user) {
    return res.status(400).json({ error: "Tokens don't match" });
  }

  const {
    client: loggedClient,
    accessToken,
    refreshToken,
  } = await twitterClient.loginWithOAuth2({
    code,
    codeVerifier: user.codeVerifier,
    redirectUri: process.env.BASE_URL + '/callback',
  });
  const { data } = await loggedClient.v2.me(); // start using the client if you want
  console.log({ accessToken, refreshToken });
  return res.json({ data });
}
