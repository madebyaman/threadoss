import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Open_Sans } from '@next/font/google';
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'optional',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${openSans.variable} 'font-serif'`}>
      <Component {...pageProps} />
    </div>
  );
}
