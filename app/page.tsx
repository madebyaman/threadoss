import Link from 'next/link';
import { UserProfile } from '@/types';
import { cookies } from 'next/headers';
import AppNav from './AppNav';
import SigninNav from './SigninNav';

async function fetchProfile(): Promise<UserProfile | undefined> {
  const cookieInstance = cookies();
  const authorization = cookieInstance.get('THREADOSS_TOKEN');
  if (!authorization) return undefined;
  const res = await fetch(`${process.env.BASE_URL}/api/profile`, {
    headers: {
      authorization: authorization.value,
    },
  });
  if (!res.ok) {
    return undefined;
  }
  const result = await res.json();
  return result.result as UserProfile;
}
export default async function Home() {
  const user = await fetchProfile();
  return (
    <div className="min-h-full">
      {user ? (
        <AppNav
          name={user.name}
          username={user.username}
          picture={user.pictureUrl || undefined}
        />
      ) : (
        <SigninNav />
      )}
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="py-4">
              <Link className="block" href="/app/articles">
                Articles
              </Link>
              <Link href="/api/auth">Login</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
