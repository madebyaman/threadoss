import { ArticleDashboard } from '@/types';
import { PlusIcon } from '@heroicons/react/24/outline';
import { cookies } from 'next/headers';
import Link from 'next/link';

async function getTotalArticleCount() {
  const cookieInstance = cookies();
  const authorization = cookieInstance.get('THREADOSS_TOKEN');
  if (!authorization) return undefined;
  const res = await fetch(`${process.env.BASE_URL}/api/articles/count`, {
    headers: {
      authorization: authorization.value,
    },
  });
  if (!res.ok) {
    return undefined;
  }
  const result = await res.json();
  return result.result;
}
async function getArticles() {
  const cookieInstance = cookies();
  const authorization = cookieInstance.get('THREADOSS_TOKEN');
  if (!authorization) return [];
  const res = await fetch(`${process.env.BASE_URL}/api/articles`, {
    headers: {
      authorization: authorization.value,
    },
  });
  if (!res.ok) {
    return [];
  }
  const result = await res.json();
  return result.result as ArticleDashboard[];
}

export default async function Articles() {
  const countData = getTotalArticleCount();
  const articlesData = getArticles();
  const [count, articles] = await Promise.all([countData, articlesData]);
  // const [lastItemIndex, setLastItemIndex] = useState<Number | null>(null);

  // function setArticles(e: MouseEvent, type: 'PREVIOUS' | 'NEXT') {
  //   e.preventDefault();
  //   if (!articles) return;
  //   if (type === 'PREVIOUS') {
  //     setLastItemIndex(articles[0].id);
  //   }
  //   if (type === 'NEXT') {
  //     setLastItemIndex(articles[articles.length - 1].id);
  //   }
  // }

  return (
    <div className="font-sans">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Recent Articles
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the articles in your account including their title,
            url and date added.
          </p>
        </div>
        {articles.length ? (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              href="/app/articles/new"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto gap-2"
            >
              <PlusIcon className="h-4 w-4 text-gray-200" aria-hidden="true" />
              New article
            </Link>
          </div>
        ) : (
          <>&nbsp;</>
        )}
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            {articles.length ? (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        URL
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date Added
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {articles.map((article) => (
                      <tr key={article.title}>
                        <td
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:px-6"
                          title={article.title}
                        >
                          {article.title.length > 75
                            ? article.title.substring(0, 75) + '...'
                            : article.title}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {article.url}
                        </td>
                        <td
                          className="whitespace-nowrap px-4 py-4 text-sm text-gray-500"
                          title={new Date(article.createdAt).toTimeString()}
                        >
                          {new Date(article.createdAt).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/app/articles/${article.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {count && (
                  <nav
                    className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{' '}
                        <span className="font-medium">10</span> of{' '}
                        <span className="font-medium">{count}</span> results
                      </p>
                    </div>
                    <div className="flex-1 flex justify-between sm:justify-end">
                      <button
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        // onClick={(e) => setArticles(e, 'PREVIOUS')}
                      >
                        Previous
                      </button>
                      <button
                        // onClick={(e) => setArticles(e, 'NEXT')}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </nav>
                )}
              </div>
            ) : (
              <div className="bg-white rounded shadow-sm p-4 py-16">
                <h4 className="text-center text-xl font-semibold">
                  No Articles
                </h4>
                <p className="mt-2 text-center text-sm">
                  Click on New Article button to start generating twitter
                  threads ??????
                </p>
                <div className="block text-center my-4">
                  <Link
                    href="/app/articles/new"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto gap-2"
                  >
                    <PlusIcon
                      className="h-4 w-4 text-gray-200"
                      aria-hidden="true"
                    />
                    New article
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
