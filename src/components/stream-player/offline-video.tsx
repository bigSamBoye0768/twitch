import { WifiOff } from 'lucide-react'
import React from 'react'

export const OfflineVideo = ({username}: {username:string}) => {
  return (
    <div className='h-full flex flex-col space-y-4 justify-center items-center'>
        <WifiOff className='h-10 w-10'/>
        <p className='text-sm'>{username} is offline</p>
    </div>
  )
}
