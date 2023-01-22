'use client';

import { Spinner } from '@/app/Spinner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function logoutUser(signal: AbortSignal) {
  return fetch('/api/auth/logout', {
    method: 'GET',
    signal: signal,
  }).then((res) => res.json());
}

export default function Logout() {
  const router = useRouter();
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    let controller = new AbortController();
    let mounted = true;
    let timer: NodeJS.Timeout | null = null;

    logoutUser(controller.signal)
      .then((res) => {
        mounted && setLoggedOut(true);
        timer = setTimeout(() => {
          router.push('/');
        }, 1_000);
      })
      .catch(console.log);
    return () => {
      mounted = false;
      controller.abort();
      if (timer) clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="text-center py-12">
      {loggedOut ? (
        <>
          <h2 className="font-sans font-medium text-xl mb-2">
            Successfully logged out ✅
          </h2>
          <p>Redirecting you back to the app!</p>
        </>
      ) : (
        <>
          <Spinner />
          <h2 className="mt-2 font-sans font-medium">Signing out...</h2>
        </>
      )}
    </div>
  );
}
