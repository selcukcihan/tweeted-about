import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0'
import Infographic from '../components/infographic'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { ReactElement, useEffect, useState } from 'react'
import Head from '../components/head'
import React from 'react'
import { Topic } from '../types'
import { normalizeTopics } from '../utils'

type Props = {
  user?: UserProfile
  lastModified?: number
  topics?: Topic[]
  isLoaded?: boolean
}

const convert = (topics: any) => Object.entries(topics).map((t: any) => ({ name: t[0] as string, count: t[1] as number }))

const getOuterComponent = (isLoaded: boolean, inner: ReactElement) => (
  <>
  <Head />
  <main className='bg-stone-100'>
    <div className="flex flex-col mx-auto place-items-center h-screen w-screen md:w-1/2">
      <div className='flex-grow text-center w-full p-4'>
        {!isLoaded && 
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-slate-300 text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-slate-300">Please wait until user data is ready...</p>
          </div>}
        {isLoaded && inner}
      </div>
    </div>
  </main>
</>
)

const getTwitterShareLink = (user: UserProfile, topics: Topic[]) => {
  const MAX_BODY_LENGTH = 220

  const link = `https://${'tweeted-about.selcukcihan.com'}/infographic/${user.sub?.split('|')[1]}`
  const header = `I've tweeted about`
  let body = []

  for (let i = 0; i < topics.length; i++) {
    if (body.join('\n').length > MAX_BODY_LENGTH) {
      break
    }
    body.push(`${i + 1}- ${topics[i].name}`)
  }
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent([header, ...body].join('\n'))}&url=${link}&hashtags=TweetedAbout`
}

export default function Home(props: Props) {
  const user = props.user as UserProfile
  const [topics, setTopics] = useState(props.topics || [])
  const [isLoaded, setIsLoaded] = useState(true)
  useEffect(() => {
    if (!props.lastModified || +new Date() - props.lastModified > 24 * 3600 * 1000) {
      const fetchApi = async () => {
        const response = await fetch('/api/topics')
        const _topics = await response.json()
        setTopics(convert(_topics))
        setIsLoaded(true)
      }
      setIsLoaded(false)
      fetchApi()
    }
  }, [props.lastModified])
  if (topics.length === 0) {
    return getOuterComponent(
      isLoaded,
      <React.Fragment>
        <div className='flex flex-row justify-center items-center text-xs md:text-xl'>
          <h2 className='flex-1'>{user.name}</h2>
          <div className='group'>
            <Link href='/api/auth/logout'>
              <button className='opacity-80 hover:opacity-100 hover:text-slate-200 font-light text-slate-100 rounded bg-sky-600 p-4'>Logout</button>
            </Link>
          </div>
        </div>
        <div className='text-2xl'>
          {`Could not detect any topics from your tweets :(`}
        </div>
      </React.Fragment>
    )
  } else {
    return getOuterComponent(
      isLoaded,
      <React.Fragment>
        <div className='flex flex-row justify-center items-center text-xs md:text-xl'>
          <h2 className='flex-1'>{user.name}</h2>
          <div className='group px-10'>
            <Link href={getTwitterShareLink(user, topics)}>
              <button className='opacity-80 hover:opacity-100 hover:text-slate-200 font-light text-slate-100 rounded bg-sky-600 p-4'>Share on Twitter</button>
            </Link>
          </div>
          <div className='group'>
            <Link href='/api/auth/logout'>
              <button className='opacity-80 hover:opacity-100 hover:text-slate-200 font-light text-slate-100 rounded bg-sky-600 p-4'>Logout</button>
            </Link>
          </div>
        </div>
        <Infographic topics={topics}/>
      </React.Fragment>
    )
  }
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx): Promise<{ props: Props }> {
    const session = await getSession(ctx.req, ctx.res)
    console.log('FETCHING FROM S3 ' + session?.user['sub'])
    const response = await fetch(`https://cihan-tweeted-about-backend-bucket.s3.eu-west-1.amazonaws.com/user/${(session?.user['sub'] as string).split('|')[1]}/topics.json`)
    console.log('FETCHED FROM S3: ' + response.headers.get('Last-Modified'))
    if (response.status !== 200) {
      return {
        props: {}
      }
    }
    const topics = await response.json()
    return {
      props: {
        topics: normalizeTopics(convert(topics)),
        lastModified: new Date(response.headers.get('Last-Modified') as string).getTime(),
      }
    }
  }
})
