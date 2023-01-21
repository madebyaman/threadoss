import { prisma } from '@/lib/prisma';
import { validateRoute } from '@/lib/validateRoute';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get all user articles. For pagination pass `cursor` with id of the last element.
 */
async function getArticleThreads(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  const { id } = req.query;
  const numberedId = Number(id);
  if ((id && typeof id !== 'string') || Number.isNaN(numberedId))
    return res.status(400).json({ error: 'ID not valid' });
  try {
    const articleThreads = await prisma.thread.findMany({
      where: {
        authorId: user.id,
        articleId: numberedId,
      },
    });
    if (!articleThreads)
      return res.status(400).json({ error: 'No article threads' });
    return res.status(200).json({ result: articleThreads });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
}

export default validateRoute(getArticleThreads);
