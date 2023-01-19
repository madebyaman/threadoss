import '@/styles/globals.css';
import { Inter } from '@next/font/google';
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'optional',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`h-full bg-gray-100`}>
      <body className={`h-full ${inter.className}`}>{children}</body>
    </html>
  );
}
