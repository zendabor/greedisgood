import { SWRConfig } from 'swr';
import RootLayout from './layout';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { fallback } = pageProps

  return (
    <SessionProvider>
      <SWRConfig value={{ fallback }}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp