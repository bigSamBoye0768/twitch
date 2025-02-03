import React, { useMemo } from 'react'
import { Hint } from '../hint'
import { Info } from 'lucide-react'

export const ChatInfo = ({isDelayed, isFollowerOnly}:{isFollowerOnly:boolean, isDelayed:boolean}) => {
    const hint = useMemo(() => {
        if(isFollowerOnly && !isDelayed) return"Followers-Only Chat"
        if(!isFollowerOnly && isDelayed) return"Messages are delayed by 3secs"
        if(isFollowerOnly && isDelayed) return"Followers-Only Chat. Messages are delayed by 3secs"
        return ""
    }, [isDelayed, isFollowerOnly])


    const label = useMemo(() => {
        if(isFollowerOnly && !isDelayed) return"Followers-Only Chat"
        if(!isFollowerOnly && isDelayed) return"Slow Mode"
        if(isFollowerOnly && isDelayed) return"Followers-Only Chat and Slow Mode"
        return ""
    }, [isDelayed, isFollowerOnly])

    if(!isDelayed && !isFollowerOnly) return null


  return (
    <div className='w-full rounded-t-md flex items-center gap-x-2 p-2'>
        <Hint label={hint}>
            <Info className='h-4 w-4'/>
        </Hint>
        <p className='text-xs'>{label}</p>
    </div>
  )
}
