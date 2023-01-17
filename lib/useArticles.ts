import { Article } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from './fetcher';

type Result = {
  result: Article[];
};

export function useArticles() {
  const { data, error, isLoading } = useSWR<Result>('articles', fetcher);
  return { articles: data?.result, error, isLoading };
}
