import React from 'react'

export default function Footer() {
  return (
    <section id='about' className='break-words p-10 text-left font-mono opacity-60'>
      <ul className='list-disc pl-10'>
        <li>The data is fetched from Twitter through AWS Lambda + API Gateway. It contains topics that a twitter user has tweeted.</li>
        <li>Frontend code can be found at <a className='opacity-80 hover:opacity-100' href='https://github.com/selcukcihan/tweeted-about' rel="noreferrer" target='_blank'>https://github.com/selcukcihan/tweeted-about</a>.</li>
        <li>More details on how the backend works is explained in <a className='opacity-80 hover:opacity-100' href='https://github.com/selcukcihan/tweeted-about-backend' rel="noreferrer" target='_blank'>https://github.com/selcukcihan/tweeted-about-backend</a>.</li>
        <li>Check <a className='opacity-80 hover:opacity-100' href='https://selcukcihan.com' rel="noreferrer" target='_blank'>selcukcihan.com</a> to reach out!</li>
      </ul>
    </section>
  )
}
