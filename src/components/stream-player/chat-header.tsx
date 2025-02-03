import React from 'react'
import { ChatToggle } from './chat-toggle'
import { VariantToggle } from './variant-toggle'
import { Skeleton } from '../ui/skeleton'

export const ChatHeader = () => {
  return (
    <div className='border-b p-3 relative'>
      <div className='absolute left-2 top-2 hidden lg:block'>
        <ChatToggle />
      </div>
      <div className='font-semibold text-sm text-center'>STREAM CHAT</div>
      <div className='absolute right-2 top-2 '>
        <VariantToggle />
      </div>
    </div>
  )
}


export const ChatHeaderSkeleton = () => {
  return (
    <div className='border-b p-3 relative'>
      <div className='absolute left-2 top-2 hidden lg:block'>
        <Skeleton className='w-8 h-8' />
      </div>
      <Skeleton className='w-32 mx-auto h-7' />
      <div className='absolute right-2 top-2 '>
        <Skeleton className='w-8 h-8' />
      </div>
    </div>
  )
}