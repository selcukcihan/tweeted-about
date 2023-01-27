import Infographic from '../../components/infographic'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import Head from '../../components/head'
import React from 'react'
import { Topic } from '../../common/types'
import { convertTopics, normalizeTopics } from '../../common/utils'
import Footer from '../../components/footer'
import { getLink } from '../../common/link'

type Props = {
  user?: UserProfile
  lastModified?: number
  topics?: Topic[]
}

const loginButton = (
  <React.Fragment>
    <div className='flex flex-row justify-center items-center text-xs md:text-xl'>
      {getLink('/api/auth/login', 'Login with Twitter to create your infographic!')}
    </div>
  </React.Fragment>
)

const getDescription = (topics: Topic[]) => {
  if (topics.length > 1) {
    return 'Other frequently tweeted topics were ' + topics.slice(1, 4).map(t => `"${t.name}"`).join(', ')
  } else {
    return ''
  }
}

const getTitle = (topics: Topic[]) => topics.length > 0 ? `Mostly tweeted about "${topics[0].name}".` : 'No topics were detected :('

export default function Home(props: Props) {
  if (!props.topics || props.topics?.length === 0) {
    return (
      <>
        <Head />
        <main className='bg-stone-100'>
          <div className="flex flex-col mx-auto place-items-center h-screen w-screen md:w-1/2">
            <div className='flex-grow text-center w-full p-4'>
              <div className='text-2xl'>
                {`Could not detect any topics from the tweets :(`}
              </div>
            </div>
            <Footer/>
          </div>
        </main>
      </>
    )
  } else {
    return (
      <>
        <Head title={getTitle(props.topics)} description={getDescription(props.topics)} />
        <main className='bg-stone-100'>
          <div className="flex flex-col mx-auto place-items-center h-screen w-screen md:w-1/2">
            <div className='flex-grow text-center w-full p-4'>
              {loginButton}
              <Infographic topics={props.topics}/>
            </div>
            <Footer/>
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
      topics: normalizeTopics(convertTopics(topics)),
    }
  }
}
