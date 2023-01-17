import useSWR from 'swr';
import { fetcher } from './fetcher';

export function useArticleCount() {
  const { data, error, isLoading } = useSWR<{ result: string }>(
    'articles/count',
    fetcher
  );
  const totalArticles =
    data && !Number.isNaN(Number(data.result)) ? Number(data.result) : 0;
  return { count: totalArticles, error, isLoading };
}
