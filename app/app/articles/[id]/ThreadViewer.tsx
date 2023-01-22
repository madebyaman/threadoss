'use client';

import { Thread } from '@prisma/client';
import { useState } from 'react';
import SelectedThread from './SelectedThread';
import ThreadOption from './ThreadOption';

export default function ThreadViewer({ threads }: { threads: Thread[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedThread = threads.find((t) => t.id === selected);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {threads.length ? (
          <>
            {threads.map((thread) => (
              <ThreadOption
                thread={thread}
                key={thread.id}
                selectedThread={selected}
                onSelect={setSelected}
              />
            ))}
          </>
        ) : (
          'No selected threads'
        )}
      </div>
      {selectedThread && <SelectedThread thread={selectedThread} />}
    </div>
  );
}
