import { prisma } from '@/lib/prisma';
import { ArticleData, extract } from '@extractus/article-extractor';
import { Article } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

async function addArticle(req: NextApiRequest, res: NextApiResponse) {
  // Check if request is 'POST'
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }
  const { url, totalTweets } = req.body;
  if (typeof url !== 'string' || !totalTweets) {
    return res.status(500).json({ error: 'Data not provided' });
  }
  const { user } = req as any;
  if (!user || !user.sub) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check if Article with same URL exists
  try {
    const alreadyPresentArticle = await prisma.article.findFirst({
      where: {
        AND: [{ url }, { authorId: user.sub }],
      },
    });
    if (alreadyPresentArticle) {
      return res.status(400).json({ error: 'Article already present' });
    }
  } catch (e) {
    return res.status(500);
  }

  // Parse article
  let article: ArticleData | null;
  try {
    article = await extract(url);
  } catch (err) {
    return res.status(500).json({ error: 'Unable to parse article' });
  }

  // Next add article to DB
  let newArticle: Article | null = null;
  try {
    if (!article || !article.content || !article.title) {
      return res.status(500).json({ error: 'Unable to parse' });
    }
    newArticle = await prisma.article.create({
      data: {
        authorId: user.sub,
        url,
        content: article.content,
        title: article.title,
      },
    });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }

  // Check open AI key
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  // Generate the thread
  let result: string | null = null;
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Convert this article into 4 fun tweets. Begin each tweet with "Tweet: ". Add emojis and hashtags. Article:\n\n${article.content}`,
      temperature: 0.6,
      max_tokens: 50 * Number(totalTweets),
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    if (completion.data.choices && completion.data.choices[0].text)
      result = completion.data.choices[0].text;
  } catch (e) {
    res.status(500).json({
      error: 'An error occurred during your request.',
    });
  }

  // Save the thread
  try {
    if (!result) {
      return res.status(500).json({ error: 'AI failure' });
    }
    const thread = await prisma.thread.create({
      data: {
        content: result,
        authorId: user.sub,
        articleId: newArticle.id,
      },
    });
    return res.status(200).json({ result: thread.content });
  } catch (e) {
    res.status(500).json({
      error: 'An error occurred during your request.',
    });
  }
}

export default addArticle;
