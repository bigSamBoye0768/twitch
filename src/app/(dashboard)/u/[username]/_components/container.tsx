"use client"


import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

export const Container = ({ children }: { children: React.ReactNode }) => {
    const { collapsed, onCollapse, onExpand } = useCreatorSidebar((state) => state)
    const matches = useMediaQuery("(max-width: 768px)")
    useEffect(() => {
        if(matches) onCollapse()
        else onExpand()
    }, [matches, onCollapse, onExpand])

  return (
    <div className={cn('flex-1 bg-[#F7F7F8] dark:bg-[#0E0E10]', collapsed ? 'pl-[70px]' : 'pl-[70px] md:pl-60')}>
        {children}
    </div>
  )
}

