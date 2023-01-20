import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute } from '@/lib/validateRoute';

function GetProfile(req: NextApiRequest, res: NextApiResponse, user: User) {
  const { codeVerifier, token, ...profile } = user; // Pluck out certain values
  return res.status(200).json({ result: profile });
}

export default validateRoute(GetProfile);
