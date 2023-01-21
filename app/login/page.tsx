'use client';
import { useEffect } from 'react';
import { Spinner } from '../app/Spinner';
import { useRouter } from 'next/navigation';

type CallbackProps = {
  signal: AbortSignal;
};

async function loginUser({ signal }: CallbackProps) {
  return fetch(`/api/auth`, {
    credentials: 'include',
    method: 'GET',
    signal: signal,
  });
}

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let controller = new AbortController();

    loginUser({ signal: controller.signal })
      .then((res) => {
        // if (!res.ok) throw new Error('Error');
        return res.json();
      })
      .then(({ result }) => {
        timer = setTimeout(() => {
          router.push(result);
        }, 1_000);
      })
      .catch((e) => console.log('errr>>>', e));
    return () => {
      controller.abort();
      if (timer) clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="text-center py-12">
      <Spinner />
      <h2 className="mt-2 font-sans">Redirecting you to Twitter to login</h2>
    </div>
  );
}
