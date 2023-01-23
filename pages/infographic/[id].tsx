import Infographic from '../../components/infographic'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import Head from '../../components/head'
import React from 'react'
import { Topic } from '../../types'

type Props = {
  user?: UserProfile
  lastModified?: number
  topics?: Topic[]
}

const convert = (topics: any) => Object.entries(topics).map((t: any) => ({ name: t[0] as string, count: t[1] as number }))

export default function Home(props: Props) {
  if (!props.topics || props.topics?.length === 0) {
    return (
      <>
        <Head />
        <main className='bg-stone-100'>
          <div className="flex flex-col mx-auto place-items-center h-screen w-screen md:w-1/2">
            <div className='flex-grow text-center w-full p-4'>
              <div className='text-2xl'>
                {`Could not detect any topics from your tweets :(`}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  } else {
    return (
      <>
        <Head />
        <main className='bg-stone-100'>
          <div className="flex flex-col mx-auto place-items-center h-screen w-screen md:w-1/2">
            <div className='flex-grow text-center w-full p-4'>
              <Infographic topics={props.topics}/>
            </div>
          </div>
        </main>
      </>
    )
  }
}

export async function getServerSideProps(ctx: any): Promise<{ props: Props }> {
  const { id } = ctx.query
  console.log('FETCHING FROM S3')
  const response = await fetch(`https://cihan-tweeted-about-backend-bucket.s3.eu-west-1.amazonaws.com/user/${id}/topics.json`)
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
    }
  }
}
