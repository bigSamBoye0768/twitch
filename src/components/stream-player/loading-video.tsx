import { Loader, WifiOff } from 'lucide-react'
import React from 'react'

export const LoadingVideo = ({label}: {label:string}) => {
  return (
    <div className='h-full flex flex-col space-y-4 justify-center items-center'>
        <Loader className='h-10 w-10 animate-spin'/>
        <p className='text-muted capitalize'>{label}</p>
    </div>
  )
}
