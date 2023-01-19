import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0'
import Infographic from '../components/infographic'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Head from '../components/head'
import React from 'react'
import { Topic } from '../types'

type Props = {
  user?: UserProfile
  lastModified?: number
  topics?: Topic[]
}

const convert = (topics: any) => Object.entries(topics).map((t: any) => ({ name: t[0] as string, count: t[1] as number }))

export default function Home(props: Props) {
  const user = props.user as UserProfile
  const [topics, setTopics] = useState(props.topics || [])
  useEffect(() => {
    if (!props.lastModified || +new Date() - props.lastModified > 24 * 3600 * 1000) {
      const fetchApi = async () => {
        const response = await fetch('/api/topics')
        const _topics = await response.json()
        console.log(`GOT TOPICS: ${JSON.stringify(_topics, null, 2)}`)
        setTopics(convert(_topics))
      }
      fetchApi()
    }
  }, [props.lastModified])
  return (
    <>
      <Head />
      <main className='bg-stone-100'>
        <div className="flex flex-col mx-auto place-items-center h-screen w-screen md:w-1/2">
          <div className='flex-grow text-center w-full p-4'>
            <div className='flex flex-row justify-center items-center text-xs md:text-xl'>
              <h2 className='flex-1'>{user.name}</h2>
              <div className='group'>
                <Link href='/api/auth/logout'>
                  <button className='opacity-80 hover:opacity-100 hover:text-slate-200 font-light text-slate-100 rounded bg-sky-600 p-4'>Logout</button>
                </Link>
              </div>
            </div>
            <Infographic user={user} topics={topics}/>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx): Promise<{ props: Props }> {
    const session = await getSession(ctx.req, ctx.res)
    console.log('FETCHING FROM S3')
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
        topics: convert(topics),
        lastModified: new Date(response.headers.get('Last-Modified') as string).getTime(),
      }
    }
  }
})
