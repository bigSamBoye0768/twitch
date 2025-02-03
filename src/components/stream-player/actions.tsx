"use client"


import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { onFollow, onUnfollow } from '../../../actions/follow'
import { toast } from 'sonner'
import { Skeleton } from '../ui/skeleton'

export const Actions = ({ isFollowing, isHost, hostIdentity }: { hostIdentity: string, isFollowing: boolean, isHost: boolean }) => {
    const router = useRouter()
    const { userId } = useAuth()
    const [isPending, startTransition] = useTransition()

    const onfollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
            .then((data) => toast.success(`You're now following ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"))
        })
        
    }

    const onunfollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
            .then((data) => toast.success(`You unfollowed ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"))
        })
        
    }

    const toggleFollow = () => {
        if(!userId){
            return router.push("/sign-in")
        }

        if(isHost) return

        if(isFollowing){
            onunfollow()
        }else{
            onfollow()
        }

    }

    return (
        <>
            {
                !isHost && (
                    <Button className='w-full md:w-auto' onClick={toggleFollow} disabled={isPending} size="sm">
                        <Heart className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}/>
                        {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                )
            }

        </>

    )
}



export const ActionsSkeleton = () => {
    return(
        <Skeleton className='w-full h-10 md:w-24'/>
    )
}