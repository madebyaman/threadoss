import { Article } from '@prisma/client';
import { cookies } from 'next/headers';

async function getArticlesIds(): Promise<{ id: number }[]> {
  const cookieInstance = cookies();
  const authorization = cookieInstance.get('THREADOSS_TOKEN');
  if (!authorization) return [];
  const res = await fetch(`${process.env.BASE_URL}/api/articles/ids`, {
    headers: {
      authorization: authorization.value,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch article count');
  }
  const result = await res.json();
  return result.result as { id: number }[];
}

export async function generateStaticParams() {
  const articleIds = await getArticlesIds();
  return articleIds.map((article) => ({
    id: article.id.toString(),
  }));
}

async function getArticle(id: string): Promise<Article | null> {
  const cookieInstance = cookies();
  const authorization = cookieInstance.get('THREADOSS_TOKEN');
  if (!authorization) return null;
  const res = await fetch(`${process.env.BASE_URL}/api/articles/${id}`, {
    headers: {
      authorization: authorization.value,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch article count');
  }
  const result = await res.json();
  return result.result as Article;
}
export default async function ViewArticle({
  params,
}: {
  params: { id: string };
}) {
  const article = await getArticle(params.id);
  if (!article) return <p>No article with such id</p>;
  return (
    <div>
      <h1>{article.title}</h1>
    </div>
  );
}
