import Head from 'next/head'
import React from 'react'

const DESCRIPTION = 'Infographic to show what you have been tweeting on.'
const TITLE = 'Tweeted About'

export default function H(props?: { title?: string, description?: string }) {
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={props?.description || DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content="https://tweeted-about.selcukcihan.com" />
      <meta property="og:title" content={props?.title || TITLE} />
      <meta property="og:description" content={props?.description || DESCRIPTION} />
      <meta property="og:image" content="https://tweeted-about.selcukcihan.com/tweeted-about-ss.png" />
      <meta property="twitter:image" content="https://tweeted-about.selcukcihan.com/tweeted-about-ss.png" />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:title" content={props?.title || TITLE} />
      <meta property="twitter:description" content={props?.description || DESCRIPTION} />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  )
}
