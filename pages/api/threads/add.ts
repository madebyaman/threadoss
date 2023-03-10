import { prisma } from '@/lib/prisma';
import { validateRoute } from '@/lib/validateRoute';
import { Article, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { NodeHtmlMarkdown } from 'node-html-markdown';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function addArticle(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  // Check if request is 'POST'
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }
  const { articleId, totalTweets } = req.body;
  if (
    typeof articleId !== 'string' ||
    Number.isNaN(Number(articleId)) ||
    !totalTweets ||
    Number.isNaN(Number(totalTweets))
  ) {
    return res.status(500).json({ error: 'Data not provided' });
  }

  // Check open AI key
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'No api key',
      },
    });
    return;
  }

  // Check if Article with same URL exists
  let article: Article | null;
  try {
    article = await prisma.article.findFirst({
      where: {
        AND: [{ id: Number(articleId) }, { authorId: user.id }],
      },
    });
  } catch (e) {
    return res.status(500);
  }

  // If no article found, return early
  if (!article) {
    return res.status(400).json({ error: 'No article with given id' });
  }

  // Generate the thread
  let result: string | null = null;
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(article.content, totalTweets),
      temperature: 1,
      max_tokens: 200 * Number(totalTweets),
      top_p: 1.0,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (
      completion &&
      completion.data.choices &&
      completion.data.choices[0].text
    )
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
    // Remove unwanted initial letters
    const indexOfFirst = result.indexOf('Tweet: ');
    const newResult = result.substring(indexOfFirst);
    const threadContent = newResult
      .split('Tweet: ')
      .filter((item) => item.length !== 0);
    const thread = await prisma.thread.create({
      data: {
        content: threadContent,
        authorId: user.id,
        articleId: article.id,
      },
    });
    return res.status(200).json({ result: thread.content });
  } catch (e) {
    res.status(500).json({
      error: 'An error occurred during your request.',
    });
  }
}

function generatePrompt(article: string, tweet: number) {
  return `Convert this article into a twitter thread with ${tweet} fun tweets. Begin each tweet clearly marked with "Tweet: ". Add emojis and hashtags. Article: ${article}`;
}

export default validateRoute(addArticle);
