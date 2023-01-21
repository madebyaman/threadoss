import { Article } from '@prisma/client';
import { cookies } from 'next/headers';
import Breadcrumb, { BreadcrumbType } from '../Breadcrumb';

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
  const article = await getArticle(params.id);
  if (!article) return <p>No article with such id</p>;
  return (
    <div>
      <Breadcrumb items={getBreadcrumbData(article.title, params.id)} />
      <h1 className="mt-4 text-xl md:text-3xl font-semibold">
        {article.title}
      </h1>
    </div>
  );
}
