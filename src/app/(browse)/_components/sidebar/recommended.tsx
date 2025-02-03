"use client"


import { useSidebar } from '@/store/use-sidebar'
import { Stream, User } from '@prisma/client'
import React from 'react'
import { UserItem, UserItemSkeleton } from './user-item'

export const Recommended = ({ data }: { data: (User & {stream: {isLive:boolean} | null})[] }) => {
    const { collapsed } = useSidebar((state) => state)

    const showLabel = !collapsed && data.length > 0;

    return (
        <div className='mt-2'>
            {showLabel && (
                <div className='mb-3 px-3 hidden md:block'>
                    <p className='text-xs font-semibold'>RECOMMENDED</p>
                </div>
            )}

            <ul className='space-y-2 mt-2'>
                {data.map((user) => (
                    <UserItem username={user.username} imgUrl={user.imgUrl} isLive={user.stream?.isLive} key={user.id} />
                ))}
            </ul>
        </div>
    )
}



export const RecommendedSkeleton = () => {
    return (
        <ul className='space-y-2 mt-2'>
            {[...Array(3)].map((_, index) => (
                <UserItemSkeleton key={index}/>
            ))}
        </ul>
    )
}
