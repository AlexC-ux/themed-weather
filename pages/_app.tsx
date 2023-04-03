import '@/styles/normalize.css'
import '@/styles/global.css'
import 'material-icons/iconfont/material-icons.css';
import type { AppProps } from 'next/app'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
