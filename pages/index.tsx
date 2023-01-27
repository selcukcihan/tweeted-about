import { useRouter }  from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect } from 'react'
import Head from '../components/head'
import React from 'react'
import Footer from '../components/footer'
import { getLink } from '../common/link'

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
          {getLink('/api/auth/login', 'Login with Twitter to create your infographic!')}
          <Footer/>
        </div>
      </main>
    </>
  )
}
