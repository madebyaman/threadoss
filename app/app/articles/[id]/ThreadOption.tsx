'use client';

import { classNames } from '@/app/AppNav';
import { Thread } from '@prisma/client';
import { MouseEvent } from 'react';

type ThreadOptionProps = {
  thread: Thread;
  selectedThread: number | null;
  onSelect: (id: number) => void;
};

export default function ThreadOption({
  thread,
  selectedThread,
  onSelect,
}: ThreadOptionProps) {
  function selectCurrentThread(e: MouseEvent<HTMLButtonElement>, id: number) {
    e.preventDefault();
    onSelect(id);
  }

  return (
    <button
      onClick={(e) => selectCurrentThread(e, thread.id)}
      className={classNames(
        `bg-white p-4 border rounded-md cursor-pointer leading-relaxed text-left`,
        selectedThread === thread.id
          ? 'border-indigo-700'
          : 'border-gray-300 hover:border-gray-700'
      )}
    >
      {thread.content[0].substring(0, 100) + '...'}
    </button>
  );
}
