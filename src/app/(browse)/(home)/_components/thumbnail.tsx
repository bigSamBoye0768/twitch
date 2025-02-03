import { LiveBadge } from '@/components/live-badge';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/user-avatar';
import Image from 'next/image';
import React from 'react'

export const Thumbnail = ({ src, fallback, username, isLive }: { src: string | null, fallback: string, isLive: boolean, username: string }) => {

    let content;

    if (!src) {
        content = (
            <div className='bg-[#EFEFF1] dark:bg-[#1F1F23] flex flex-col items-center justify-center gap-y-3 h-full w-full transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rounded-md'>
                <UserAvatar size={'lg'} showBadge username={username} imgUrl={fallback} isLive={isLive} />
            </div>
        )
    } else {
        content = (
            <Image src={src} fill alt={username} className='object-cover transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rounded-md' />
        )
    }

    return (
        <div className='group aspect-video relative rounded-md cursor-pointer'>
            <div className='rounded-md absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center' />
            {content}

            {isLive && (
                <div className='absolute left-2 right-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform'>
                    <LiveBadge />
                </div>
            )}
        </div>
    )
}



export const ThumbnailSkeleton = () => {
    return (
        <div className='group aspect-video relative rounded-md'>
            <Skeleton className='h-full w-full' />
        </div>
    )
}