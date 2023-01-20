import { prisma } from '@/lib/prisma';
import { validateRoute } from '@/lib/validateRoute';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get all user articles count.
 * @returns
 */
async function getAllUserArticlesCount(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  try {
    const count = await prisma.article.count({
      where: {
        authorId: user.id,
      },
    });
    return res.status(200).json({ result: count });
  } catch (e) {
    return res.status(500).json({ error: 'Server not provided' });
  }
}

export default validateRoute(getAllUserArticlesCount);
