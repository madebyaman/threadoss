import Link from 'next/link';
import Logo from './logo';
import LogoSmall from './logo_small';

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Nav() {
  return (
    <nav className="bg-white shadow-sm">
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between">
            <div className="flex-shrink-0 flex items-center">
              <Logo className="hidden lg:block h-8 w-32" />
              <LogoSmall className="block lg:hidden h-8 w-8" />
            </div>
            <Link
              href={`${process.env.BASE_URL}/login`}
              target="_blank"
              className="hover:bg-slate-100 inline-flex text-gray-900 items-center px-3 py-1 rounded-full text-sm font-medium font-sans"
            >
              Signin
            </Link>
          </div>
        </div>
      </>
    </nav>
  );
}
