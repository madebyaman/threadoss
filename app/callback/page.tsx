'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '../app/Spinner';

type CallbackProps = {
  state: string;
  code: string;
  signal: AbortSignal;
};

async function verifyUser({ state, code, signal }: CallbackProps) {
  return fetch(`/api/callback`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state, code }),
    signal: signal,
  });
}

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userVerified, setUserVerified] = useState(false);
  const state = searchParams.get('state');
  const code = searchParams.get('code');

  useEffect(() => {
    let controller = new AbortController();
    let mounted = true;
    let timer: NodeJS.Timeout | null = null;
    if (
      !state ||
      !code ||
      typeof state !== 'string' ||
      typeof code !== 'string'
    )
      return;

    verifyUser({ state, code, signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Error');
        res.json();
      })
      .then((res) => {
        mounted && setUserVerified(true);
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
  }, [code, state, router]);

  return (
    <div className="text-center py-12">
      {userVerified ? (
        <>
          <h2 className="font-sans font-medium text-xl mb-2">
            Successfully signed ✅
          </h2>
          <p>Redirecting you back to the app!</p>
        </>
      ) : (
        <>
          <Spinner />
          <h2 className="mt-2 font-sans font-medium">Logging in...</h2>
        </>
      )}
    </div>
  );
}
