import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export type BreadcrumbType = {
  name: string;
  link: string;
  current: boolean;
};

type BradcrumbProps = {
  items: BreadcrumbType[];
};

export default function Breadcrumb({ items }: BradcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {items.map((item) => (
          <li key={item.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="flex-shrink-0 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={item.link}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={item.current ? 'page' : undefined}
                title={item.name}
              >
                {item.name.length > 25
                  ? item.name.substring(0, 25) + '...'
                  : item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
