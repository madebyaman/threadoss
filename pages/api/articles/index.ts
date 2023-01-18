import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get all user articles. For pagination pass `cursor` with id of the last element.
 */
async function getAllUserArticles(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req as any;
  if (!user || !user.sub) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const userArticles = await prisma.article.findMany({
      take: 10,
      where: {
        authorId: user.sub,
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

export default getAllUserArticles;
