"use client"

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import React, { useEffect, useState } from 'react'
import { RecommendedSkeleton } from './recommended'
import { FollowingSkeleton } from './following'

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const { collapsed } = useSidebar((state) => state)
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <aside className={cn('fixed left-0 w-[70px] md:w-60 h-full z-50 bg-[#EFEFF1] dark:bg-[#1F1F23]')}>
                <FollowingSkeleton />
                <RecommendedSkeleton />
            </aside>
        )
    }

    return (
        <aside className={cn('fixed left-0 w-60 h-full z-50 bg-[#EFEFF1] dark:bg-[#1F1F23]', collapsed && 'w-[70px]')}>
            {children}
        </aside>
    )
}

