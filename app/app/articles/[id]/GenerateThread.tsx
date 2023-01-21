'use client';

import { MouseEvent, useState } from 'react';

type GenerateThreadProps = {
  articleId: string;
  threads: number;
};

export default function GenerateThread({
  articleId,
  threads,
}: GenerateThreadProps) {
  const [status, setStatus] = useState<
    'LOADING' | 'ERROR' | 'INIT' | 'SUCCESS'
  >('INIT');

  async function generateThread(e: MouseEvent) {
    e.preventDefault();
    setStatus('LOADING');
    const res = await fetch('/api/threads/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleId, totalTweets: 4 }),
    });
    if (!res.ok) {
      setStatus('ERROR');
    }
    const data = await res.json();
    setStatus('SUCCESS');
    return data.result;
  }

  return (
    <button onClick={generateThread}>
      {threads > 0 ? 'Regenerate Threads' : 'Generate Threads'}
    </button>
  );
}
