import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'

export default function Profile() {
  const { user, error, isLoading } = useUser()
  console.log('HERE 1' + isLoading)
  console.log(JSON.stringify(user, null, 2))

  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log('HERE 2')

  if (error) {
    return <div>{error.message}</div>
  }
  console.log('HERE 4')

  return (
    (user || null) && (
      <div>
        <Image src={user?.picture as string} alt={user?.name as string} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    )
  )
}
