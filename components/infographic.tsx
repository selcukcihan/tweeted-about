import React from 'react'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import { Topic } from '../types'

export default function Infographic(props: { user: UserProfile, topics: Topic[] }) {
  return (
    <div>
      <img src={props.user.picture as string} alt={props.user.name as string} />
      <h2>{props.user.name}</h2>
      {props.topics.map((t, idx) => (<div key={idx.toString()}>{t.name}: {t.count}</div>))}
    </div>
  )
}
