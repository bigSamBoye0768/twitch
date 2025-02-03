"use client"

import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { onFollow, onUnfollow } from '../../../../../actions/follow'
import { toast } from 'sonner'

export const Actions = ({userId, isFollowing}:{userId:string, isFollowing:boolean}) => {
    const [isPending, startTransition] = useTransition()

    const onfollow = () => {
        startTransition(() => {
            onFollow(userId)
            .then((data) => toast.success(`You're now following ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"))
        })
        
    }

    const onunfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
            .then((data) => toast.success(`You unfollowed ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"))
        })
        
    }
    
    const onClick = () => {
        if(isFollowing){
            onunfollow()
        }else{
            onfollow()
        }
    }

  return (
    
    <Button disabled={isPending} onClick={onClick}>
        {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}
