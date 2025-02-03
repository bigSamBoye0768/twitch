import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { LiveBadge } from './live-badge';
import { Skeleton } from './ui/skeleton';


const avatarVariants = cva(
    "aspect-square",
    {
        variants: {
            size: {
                default: "h-8 w-8",
                lg: "h-14 w-14"
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
    username: string | null;
    imgUrl:string;
    isLive?:boolean;
    showBadge?:boolean;
}

export const UserAvatar:React.FC<UserAvatarProps> = ({username, imgUrl, isLive, size, showBadge}) => {

    const canShowBadge = showBadge && isLive
  return (
    <div className='relative'>
        <Avatar className={cn(
            isLive && 'ring-2 ring-rose-500 border border-background',
            avatarVariants({size})
        )}>
            <AvatarImage src={imgUrl} className='object-cover'/>
            <AvatarFallback>
                {username && username[0]}
                {username && username[username.length - 1]}
            </AvatarFallback>
        </Avatar>
        {
            canShowBadge && (
                <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2'>
                    <LiveBadge />
                </div>
            )
        }
    </div>
  )
}



interface UserAvatarSkeletonProps extends VariantProps<typeof avatarVariants> {};


export const UserAvatarSkeleton:React.FC<UserAvatarSkeletonProps> = ({size}) => {
  return (
    <Skeleton className={cn("rounded-full" ,avatarVariants({size}))}/>
  )
}
