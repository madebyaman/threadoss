import { prisma } from '@/lib/prisma';
import { validateRoute } from '@/lib/validateRoute';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get all user articles. For pagination pass `cursor` with id of the last element.
 */
async function getUserArticleIds(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  try {
    const userArticles: { id: number }[] = await prisma.article.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        id: 'asc',
      },
      select: {
        id: true,
      },
    });
    return res.status(200).json({ result: userArticles });
  } catch (e) {
    return res.status(500).json({ error: 'Server not provided' });
  }
}

export default validateRoute(getUserArticleIds);
