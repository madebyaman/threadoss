import { User } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from './fetcher';

export function useProfile() {
  const { data, error, isLoading } = useSWR<{ result: User }>(
    'profile',
    fetcher
  );
  return { profile: data?.result, error, isLoading };
}
