import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'optional',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className={`${inter.variable} 'font-serif'`}>
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
