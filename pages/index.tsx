import { useRouter }  from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { useEffect } from 'react'
import Head from '../components/head'
import React from 'react'

const getLink = (href: string, text: string) => (
  <div className='group text-xl'>
    <Link href={href}>
      <button className='opacity-80 hover:opacity-100 hover:text-slate-200 font-light text-slate-100 rounded bg-sky-600 p-4'>{text}</button>
    </Link>
  </div>
)

export default function Home() {
  const { user } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (user) {
      router.push('/infographic')
    }
  }, [router, user])

  return (
    <>
      <Head />
      <main className="bg-stone-100 h-screen flex">
        <div className='container py-20 mx-auto flex-auto text-center'>
          {getLink('/api/auth/login', 'Login with Twitter to create your infographic')}
          <div className='break-all p-10 text-left font-mono opacity-60'>
            <ul className='list-disc pl-10'>
              <li>The data is fetched from Twitter through AWS Lambda + API Gateway. It contains topics that a twitter user has tweeted.</li>
              <li>Frontend code can be found at <a className='opacity-80 hover:opacity-100' href='https://github.com/selcukcihan/tweeted-about' rel="noreferrer" target='_blank'>https://github.com/selcukcihan/tweeted-about</a>.</li>
              <li>More details on how the backend works is explained in <a className='opacity-80 hover:opacity-100' href='https://github.com/selcukcihan/tweeted-about-backend' rel="noreferrer" target='_blank'>https://github.com/selcukcihan/tweeted-about-backend</a>.</li>
              <li>Check <a className='opacity-80 hover:opacity-100' href='https://selcukcihan.com' rel="noreferrer" target='_blank'>selcukcihan.com</a> to reach out!</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
