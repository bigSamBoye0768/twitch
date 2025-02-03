"use client"


import { useSidebar } from '@/store/use-sidebar'
import { Follow, Stream, User } from '@prisma/client'
import React from 'react'
import { UserItem, UserItemSkeleton } from './user-item'

export const Following = ({ data }: { data: (Follow & {following: User & {stream: {isLive: boolean} | null}})[] }) => {
    const { collapsed } = useSidebar((state) => state)

    if(data.length <= 0) return null



    return (
        <div className='mt-2'>
            {!collapsed && (
                <div className='mb-3 px-3 hidden md:block'>
                    <p className='text-xs font-semibold'>FOLLOWING</p>
                </div>
            )}

            <ul className='space-y-2 mt-2'>
                {data.map((user) => (
                    <UserItem username={user.following.username} imgUrl={user.following.imgUrl} isLive={user.following.stream?.isLive} key={user.following.id} />
                ))}
            </ul>
        </div>
    )
}



export const FollowingSkeleton = () => {
    return (
        <ul className='space-y-2 mt-2'>
            {[...Array(3)].map((_, index) => (
                <UserItemSkeleton key={index}/>
            ))}
        </ul>
    )
}
