'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Callback() {
  const [userVerified, setUserVerified] = useState(false);
  const searchParams = useSearchParams();
  const state = searchParams.get('state');
  const code = searchParams.get('code');

  useEffect(() => {
    let controller = new AbortController();
    fetch(`/api/callback`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state, code }),
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error');
        res.json();
      })
      .then((res) => {
        setUserVerified(true);
      })
      .catch(console.log);
    return () => controller.abort();
  }, [code, state]);

  return <div>{userVerified ? 'success' : 'Loading...'}</div>;
}
