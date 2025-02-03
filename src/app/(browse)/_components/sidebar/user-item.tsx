"use client"

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import Link from 'next/link'

export const UserItem = ({ username, imgUrl, isLive }: { username: string | null, imgUrl: string, isLive?: boolean }) => {
    const { collapsed } = useSidebar((state) => state)
    // const pathname = usePathname()
    const href = `/${username}`

    // const isActive = pathname === href

    return (
        <Link href={href} className='w-full flex'>
            <Button variant='ghost' className=' h-full py-1 w-full px-3'>
                <div className={cn('flex items-center w-full ', collapsed ? 'justify-center' : 'justify-between gap-1')}>
                    <div className='flex items-center justify-start gap-2'>
                        <UserAvatar username={username} imgUrl={imgUrl} isLive={isLive} />

                        {!collapsed && (
                            <p className='truncate'>{username}</p>
                        )}
                    </div>

                    {!collapsed && isLive && (
                        <div className='flex items-center gap-1'>
                            <div className='w-2 h-2 rounded-full aspect-square bg-red-600'></div>
                            <p className='text-sm'>7.9k</p>
                        </div>
                    )}
                </div>
            </Button>
        </Link>
    )
}


export const UserItemSkeleton = () => {
    return (
        <li className='flex items-center gap-x-4 px-3 py-1'>
            <UserAvatarSkeleton />
            {/* <Skeleton className='min-h-[32px] min-w-[32px] mark roun'/> */}
            <div className='flex-1'>
                <Skeleton className='h-6' />
            </div>
        </li>
    )
}

