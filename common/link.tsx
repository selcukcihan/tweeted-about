import Link from 'next/link'
import React from 'react'

export const getLink = (href: string, text: string) => (
  <div className='group text-xl'>
    <Link href={href}>
      <button className='opacity-80 hover:opacity-100 hover:text-slate-200 font-light text-slate-100 rounded bg-sky-600 p-4'>{text}</button>
    </Link>
  </div>
)
