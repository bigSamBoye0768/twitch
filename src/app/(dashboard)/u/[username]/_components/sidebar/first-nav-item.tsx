"use client"

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface Props {
    name: string;
    url: string;
    icon: LucideIcon
    isActive: boolean;
}

export const FirstNavItem: React.FC<Props> = ({ name, url, icon: Icon, isActive }) => {

    const { collapsed, onCollapse, onExpand } = useCreatorSidebar((state) => state)


    return (
        <>
        {collapsed ? (
            <Hint side="right" label={name}>
                <Link href={url} className='w-full px-1'>
            <Button variant="ghost" className={cn('w-full', !collapsed ? 'justify-start' : 'justify-center', isActive && 'bg-primary text-primary-foreground shadow hover:bg-primary/90')}>
                <Icon className={cn('h-4 w-4')} />
                {
                    !collapsed && (
                        <span>{name}</span>
                    )
                }
            </Button>
        </Link>
            </Hint>
        ) : (
            <Link href={url} className='w-full px-1'>
            <Button variant="ghost" className={cn('w-full', !collapsed ? 'justify-start' : 'justify-center', isActive && 'bg-primary text-primary-foreground shadow hover:bg-primary/90')}>
                <Icon className={cn('h-4 w-4')} />
                {
                    !collapsed && (
                        <span>{name}</span>
                    )
                }
            </Button>
        </Link>
        )}
        </>
    )
}




export const FirstNavItemSkeleton = () => {

    return (
        <li className='flex items-center gap-2'>
            <Skeleton className='h-9 w-9 px-4 py-2' />
            <div className='hidden md:block flex-1'>
                <Skeleton className='h-6' />
            </div>
        </li>
    )
}