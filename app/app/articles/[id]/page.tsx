import { Article, Thread } from '@prisma/client';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Breadcrumb, { BreadcrumbType } from '../Breadcrumb';
import GenerateThread from './GenerateThread';
import SelectedTweet from './SelectedThread';

async function getArticle(id: string): Promise<Article | null> {
  const cookieInstance = cookies();
  const authorization = cookieInstance.get('THREADOSS_TOKEN');
  if (!authorization) return null;
  const res = await fetch(
    `${process.env.BASE_URL}/api/articles/article/${id}`,
    {
      headers: {
        authorization: authorization.value,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch article count');
  }
  const result = await res.json();
  return result.result as Article;
}

async function getArticleThreads(id: string): Promise<Thread[]> {
  const cookieInstance = cookies();
  const authorization = cookieInstance.get('THREADOSS_TOKEN');
  if (!authorization) return [];
  const res = await fetch(`${process.env.BASE_URL}/api/threads/${id}`, {
    headers: {
      authorization: authorization.value,
    },
  });
  if (!res.ok) {
    return [];
  }
  const result = await res.json();
  return result.result as Thread[];
}

function getBreadcrumbData(title: string, id: string): BreadcrumbType[] {
  return [
    {
      name: 'Articles',
      link: `${process.env.BASE_URL}/app/articles`,
      current: false,
    },
    {
      name: title,
      link: `${process.env.BASE_URL}/app/articles/${id}`,
      current: true,
    },
  ];
}

export default async function ViewArticle({
  params,
}: {
  params: { id: string };
}) {
  const threadData = getArticleThreads(params.id);
  const articleData = getArticle(params.id);
  const [threads, article] = await Promise.all([threadData, articleData]);

  if (!article) return <p>No article with such id</p>;
  return (
    <div>
      <div>
        <Breadcrumb items={getBreadcrumbData(article.title, params.id)} />
        <h1 className="mt-4 text-xl md:text-3xl font-semibold">
          {article.title}
        </h1>
        <GenerateThread threads={threads.length} articleId={params.id} />
        <div className="flex flex-col md:flex-row">
          <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {threads.length ? (
              <>
                {threads.map((thread) => (
                  <ThreadViewer
                    thread={thread}
                    key={thread.id}
                    articleId={params.id}
                  />
                ))}
              </>
            ) : (
              <>No threads found for this article. Generate a new one 🌱</>
            )}
          </div>
          <SelectedTweet threads={threads} />
        </div>
      </div>
    </div>
  );
}

function ThreadViewer({
  thread,
  articleId,
}: {
  thread: Thread;
  articleId: string;
}) {
  return (
    <Link
      href={{
        pathname: `/app/articles/${articleId}`,
        query: { thread: thread.id },
      }}
      className="bg-white p-4 border border-gray-300 hover:border-indigo-700 rounded-md cursor-pointer leading-relaxed"
    >
      {thread.content[0].substring(0, 100) + '...'}
    </Link>
  );
}
