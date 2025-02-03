"use client"

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import React, { useEffect, useState } from 'react'


export const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const { collapsed } = useCreatorSidebar((state) => state)
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <aside className={cn('fixed left-0 w-[70px] md:w-60 h-full z-50 bg-white dark:bg-[#18181B]')}>

            </aside>
        )
    }

    return (
        <aside className={cn('fixed left-0 w-60 h-full z-50 bg-white dark:bg-[#18181B]', collapsed && 'w-[70px]')}>
            {children}
        </aside>
    )
}

