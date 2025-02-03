import Image from 'next/image'
import React from 'react'

export const Logo = () => {
  return (
    <div className=''>
        <Image src="/twitch.svg" alt='Logo' width={80} height={80}/>
    </div>
  )
}