import { twitterClient } from '@/lib/twitterClient';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    process.env.BASE_URL + '/callback',
    { scope: ['tweet.read', 'tweet.write', 'users.read'] }
  );

  // store verifier in cookie
  const token = jwt.sign(
    {
      codeVerifier,
      token: state,
      time: Date.now(),
    },
    process.env.PRIVATE_KEY || 'secret',
    { expiresIn: '1h' }
  );

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('THREADOSS_TEMP_TOKEN', token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );
  res.redirect(url);
}
