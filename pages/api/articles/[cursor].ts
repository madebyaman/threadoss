import { prisma } from '@/lib/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get all user articles. For pagination pass `cursor` with id of the last element.
 */
async function getAllUserArticles(req: NextApiRequest, res: NextApiResponse) {
  const { cursor } = req.query;
  const session = await getSession(req, res);
  const user = session?.user;
  if (!user || !user.sub) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const userArticles = await prisma.article.findMany({
      take: Number(cursor) < 0 ? -10 : 10,
      skip: 1,
      cursor: {
        id: Math.abs(Number(cursor)),
      },
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

export default withApiAuthRequired(getAllUserArticles);
