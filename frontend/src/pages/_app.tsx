import '@/styles/globals.scss';
import '@/styles/slider.scss';
import '@/styles/buttons.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
