import '../styles/globals.css'
import React from 'react'
import NextNProgress from 'nextjs-progressbar'

import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <NextNProgress height={8} />
      <Component {...pageProps} />
    </UserProvider>
  )
}
