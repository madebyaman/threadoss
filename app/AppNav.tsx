'use client';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './logo';
import LogoSmall from './logo_small';

const navigation = [
  { name: 'Articles', href: '#', current: true },
  { name: 'Profile', href: '#', current: false },
  { name: 'Sign out', href: '/api/auth/logout', current: false },
];

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

type NavProps = {
  username: string;
  name: string;
  picture?: string;
};

export default function AppNav({ username, name, picture }: NavProps) {
  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between">
              <div className="flex-shrink-0 flex items-center">
                <Logo className="hidden lg:block h-8 w-32" />
                <LogoSmall className="block lg:hidden h-8 w-8" />
              </div>
              <div className="hidden sm:flex sm:items-center gap-4">
                <div className="hidden sm:-my-px sm:ml-16 sm:flex sm:gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-indigo-100 text-indigo-900'
                          : 'hover:bg-slate-100',
                        'inline-flex text-gray-900 items-center px-3 py-1 rounded-full text-sm font-medium font-sans'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                {picture ? (
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={picture}
                    height={32}
                    width={32}
                    alt={name}
                  />
                ) : (
                  <UserIcon className="h-8 w-8 bg-indigo-700 rounded-full text-gray-100 p-1" />
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'hover:bg-slate-100',
                    'block pl-3 pr-4 py-2 rounded-full text-base font-medium text-center text-gray-900 font-sans'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  {picture ? (
                    <Image
                      className="rounded-full"
                      src={picture}
                      height={40}
                      width={40}
                      alt={name}
                    />
                  ) : (
                    <UserIcon className="h-8 w-8 bg-indigo-700 rounded-full text-gray-100 p-1" />
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-semibold font-sans text-gray-700">
                    {name}
                  </div>
                  <div className="text-sm font-semibold font-sans text-gray-500">
                    {username}
                  </div>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
