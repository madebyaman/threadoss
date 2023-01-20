import '@/styles/globals.css';
import { UserProfile } from '@/types';
import { Inter } from '@next/font/google';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import DisclosureNav from './DisclosureNav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'optional',
});

async function fetchProfile() {
  const cookieInstance = cookies();
  const authorization = cookieInstance.get('THREADOSS_TOKEN');
  if (!authorization) throw new Error('Failed to fetch profile');
  const res = await fetch(`${process.env.BASE_URL}/api/profile`, {
    headers: {
      authorization: authorization.value,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  const result = await res.json();
  return result.result as UserProfile;
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await fetchProfile();
  return (
    <html lang="en" className={`h-full bg-gray-100`}>
      <body className={`h-full ${inter.className}`}>
        <div className="min-h-full">
          <DisclosureNav
            name={user.name}
            username={user.username}
            picture={user.pictureUrl || undefined}
          />
          <div className="py-10">
            <main>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="py-4">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
