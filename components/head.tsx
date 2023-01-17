import Head from 'next/head'

const DESCRIPTION = 'Infographic to show what you have been tweeting on.'
const TITLE = 'Tweeted About'

export default function H() {
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content="https://tweeted-about.selcukcihan.com" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      {/* <meta property="og:image" content="/sw-chatter-img.png" />
      <meta property="twitter:image" content="/sw-chatter-img.png" /> */}
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:title" content={TITLE} />
      <meta property="twitter:description" content={DESCRIPTION} />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  )
}
