import { prisma } from '@/lib/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get all user articles count.
 * @returns
 */
async function getAllUserArticlesCount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);
  const user = session?.user;
  if (!user || !user.sub) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const count = await prisma.article.count({
      where: {
        authorId: user.sub,
      },
    });
    return res.status(200).json({ result: count });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Server not provided' });
  }
}

export default withApiAuthRequired(getAllUserArticlesCount);
