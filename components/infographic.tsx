import React from 'react'
import Image from 'next/image'
import { UserProfile } from '@auth0/nextjs-auth0/client'

export default function Infographic(props: { user: UserProfile, topics: { [k: string]: number } }) {
  return (
    <div>
      <Image width="30" height="30" src={props.user.picture as string} alt={props.user.name as string} />
      <h2>{props.user.name}</h2>
      {Object.entries(props.topics).map((t, idx) => (<div key={idx.toString()}>{t[0]}: {t[1]}</div>))}
    </div>
  )
}
