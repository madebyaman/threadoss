import { prisma } from '@/lib/prisma';
import { validateRoute } from '@/lib/validateRoute';
import { ArticleData, extract } from '@extractus/article-extractor';
import { Article, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function addArticle(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>HERE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
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

  // Check if Article with same URL exists
  try {
    const alreadyPresentArticle = await prisma.article.findFirst({
      where: {
        AND: [{ url }, { authorId: user.id }],
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
    const md = NodeHtmlMarkdown.translate(article.content);
    newArticle = await prisma.article.create({
      data: {
        authorId: user.id,
        url,
        content: md.substring(0, 5000),
        title: article.title,
      },
    });
    console.log(
      '>>>>>>>>>>>>>>>>>>>>>>>ADDED<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'
    );
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
  console.log('Article generate continuing>>>>>>>>>>>>>>>>>>>>>>>');

  // Generate the thread
  let result: string | null = null;
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(newArticle.content, totalTweets),
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
      error: 'AI Error: An error occurred during your request.',
    });
  }

  // Save the thread
  try {
    if (!result) {
      return res.status(500).json({ error: 'AI failure' });
    }
    console.log('>>>>>>>>>>>>>>>>COMPLETIONT>>>>>>>>>>>>>>>>>>>>>>>', result);
    // Tweets are in following variations: Tweet 1, Tweet #1, Tweet: . Also check for smaller case.
    // Remove unwanted initial letters
    const indexOfFirst = result.indexOf('Tweet: ');
    const newResult = result.substring(indexOfFirst);
    const threadContent = newResult
      .toLowerCase()
      .split('tweet: ')
      .filter((item) => item.length !== 0);
    const thread = await prisma.thread.create({
      data: {
        content: threadContent,
        authorId: user.id,
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

function generatePrompt(article: string, tweet: number) {
  return `Convert this article into a twitter thread with ${tweet} fun tweets. Begin each tweet with "Tweet: ". Add emojis and hashtags. Article: ${article}`;
}

export default validateRoute(addArticle);
