import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Callback() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { state, code } = router.query;

  useEffect(() => {
    let controller = new AbortController();
    fetch('/api/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state, code }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(setUser)
      .catch(console.log);
    return () => controller.abort();
  }, [code, state]);

  return (
    <div>Loading...{user && <pre>{JSON.stringify(user, null, 2)}</pre>}</div>
  );
}
