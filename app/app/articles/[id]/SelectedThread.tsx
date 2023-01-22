'use client';

import { Thread } from '@prisma/client';

export default function SelectedThread({ thread }: { thread: Thread }) {
  return (
    <aside className="flex">
      {/* Avatar */}
      <span>AT</span>

      {/* Tweet body */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header row */}
        <p className="flex text-sm">
          <span className="truncate text-cool-gray-500">
            <span className="font-bold text-cool-gray-900">Aman Thakur</span>{' '}
            <span className="pl-1 text-cool-gray-500">@ImAmanThakur</span>
          </span>
          <span className="flex-shrink-0">
            <span className="px-1 text-cool-gray-500">·</span>
            <span className="text-cool-gray-500">
              {new Date(thread.createdAt).toDateString()}
            </span>
          </span>
        </p>

        {/* Tweet text */}

        <p className="text-sm">{thread.content[0]}</p>
      </div>
    </aside>
  );
}
