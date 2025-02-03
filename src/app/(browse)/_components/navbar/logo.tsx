import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Logo = () => {
  return (
    <Link href="/">
      <div className=''>
        <Image src="/twitch.svg" alt='Logo' width={40} height={40} />
      </div>
    </Link>
  )
}