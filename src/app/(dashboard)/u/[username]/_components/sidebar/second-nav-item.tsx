"use client"

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { ChevronRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
    item: {
        title: string;
        icon: LucideIcon;
        isActive: boolean;
        items: {
            name: string;
            url: string;
            icon: LucideIcon
        }[]
    }
}

export const SecondNavItem: React.FC<Props> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);


    const { collapsed, onCollapse, onExpand } = useCreatorSidebar((state) => state)
    const pathname = usePathname()

    const isSettingsPath = pathname?.includes('/u/codewithsam/settings');


    return (
        <div>
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className='px-1'>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className={cn('w-full', !collapsed ? 'justify-start' : 'justify-center gap-0', (!isOpen && isSettingsPath) && 'bg-primary text-primary-foreground shadow hover:bg-primary/90')}>
                        {item.icon && <item.icon />}
                        {
                            !collapsed && (
                                <span>{item.title}</span>
                            )
                        }

                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className='flex flex-col'>
                    {item.items?.map((subItem, index) => (
                        <div key={index}>
                            {collapsed ? (
                                <Hint label={subItem.name} key={index} side="right">
                                    <Link href={subItem.url} className='w-full'>
                                        <Button variant="ghost" className={cn('w-full', !collapsed ? 'justify-start' : 'justify-center', (pathname === subItem.url) && 'bg-primary text-primary-foreground shadow hover:bg-primary/90')}>
                                            {<subItem.icon />}

                                            {
                                                !collapsed && (
                                                    <span>{subItem.name}</span>
                                                )
                                            }
                                        </Button>
                                    </Link>
                                </Hint>
                            ) : (
                                <Link href={subItem.url} key={index} className='w-full'>
                                    <Button variant="ghost" className={cn('w-full pl-8', !collapsed ? 'justify-start' : 'justify-center', (pathname === subItem.url) && 'bg-primary text-primary-foreground shadow hover:bg-primary/90')}>
                                        {<subItem.icon />}

                                        {
                                            !collapsed && (
                                                <span>{subItem.name}</span>
                                            )
                                        }
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ))}
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}




export const SecondNavItemSkeleton = () => {

    return (
        <li className='flex items-center gap-2'>
            <Skeleton className='h-9 w-9 px-4 py-2' />
            <div className='hidden md:block flex-1'>
                <Skeleton className='h-6' />
            </div>
        </li>
    )
}