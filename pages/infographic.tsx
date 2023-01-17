import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Infographic from '../components/infographic'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Topic } from '../types'
import Head from '../components/head'

const getLink = (href: string, text: string) => (
  <div className='group text-xl'>
    <Link href={href}>
      <button className='opacity-80 hover:opacity-100 hover:text-slate-200 font-light text-slate-100 rounded bg-sky-600 p-4'>{text}</button>
    </Link>
  </div>
)

type ProfileProps = { user: UserProfile }

const createView = (user: UserProfile, topics: Topic[]) => {
  return (
    <>
      <Infographic user={user as UserProfile} topics={topics} />
      {getLink('/api/auth/logout', 'Logout')}
    </>
  )
}

export default function Home({ user }: ProfileProps) {
  const [topics, setTopics] = useState([] as Topic[])
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('/api/topics')
      const _topics = await response.json()
      console.log(`GOT TOPICS: ${JSON.stringify(_topics, null, 2)}`)
      setTopics(_topics)
    }

    fetchApi()
  }, [])
  return (
    <>
      <Head />
      <main className="bg-stone-100 h-screen flex">
        <div className='container m-auto flex-auto text-center'>
          {createView(user, topics)}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()
