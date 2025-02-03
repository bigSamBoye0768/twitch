import { Stream, User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { Thumbnail, ThumbnailSkeleton } from './thumbnail'
import { Skeleton } from '@/components/ui/skeleton'
import { LiveBadge } from '@/components/live-badge'
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar'

export const ResultCard = ({ data }: { data: Stream & { user: User } }) => {
    return (
        <Link href={`/${data.user.username}`}>
            <div className='h-full w-full space-y-3'>
                <Thumbnail src={data.thumbnailUrl} fallback={data.user.imgUrl} isLive={data.isLive} username={data.user.username as string} />

                <div className='flex flex-col text-sm gap-x-3'>
                    <UserAvatar username={data.user.username} isLive={data.isLive} imgUrl={data.user.imgUrl} />
                    <div className='flex flex-col  text-sm'>
                        <p className='truncate font-semibold hover:underline'>{data.name}</p>
                        <p className='text-xs truncate hover:underline'>{data.user.username}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}


export const ResultCardSkeleton = () => {
    return (
        <div className='h-full w-full space-y-3'>
            <ThumbnailSkeleton />

            <div className='h-full w-full space-y-3'>
                <UserAvatarSkeleton />
                <div className='flex flex-col gap-y-1'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-3 w-24' />
                </div>
            </div>
        </div>
    )
}