import { prisma } from '@/lib/prisma';
import { validateRoute } from '@/lib/validateRoute';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get all user articles. For pagination pass `cursor` with id of the last element.
 */
async function getAllUserArticles(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  try {
    const userArticles = await prisma.article.findMany({
      take: 10,
      where: {
        authorId: user.id,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return res.status(200).json({ result: userArticles });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Server not provided' });
  }
}

export default validateRoute(getAllUserArticles);
