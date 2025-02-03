"use client"

import { useUser } from '@clerk/nextjs'
import { Fullscreen, Home, KeyRound, MessageSquare, Settings, Users } from 'lucide-react'
import React from 'react'
import { FirstNavItem, FirstNavItemSkeleton } from './first-nav-item'
import { usePathname } from 'next/navigation'
import { SecondNavItem } from './second-nav-item'

export const Navigation = () => {
    const { user } = useUser();

    const pathname = usePathname();

    const routes = {
        first: [
            {
                name: "Home",
                url: `/u/${user?.username}`,
                icon: Home,
            },
            {
                name: "Stream",
                url: `/u/${user?.username}/stream`,
                icon: Fullscreen,
            },
            {
                name: "Community",
                url: `/u/${user?.username}/community`,
                icon: Users,
            },
        ],
        second: [
            {
                title: "Settings",
                icon: Settings,
                isActive: true,
                items: [
                    {
                        name: "Chat",
                        url: `/u/${user?.username}/settings/chat`,
                        icon: MessageSquare,
                    },
                    {
                        name: "keys",
                        url: `/u/${user?.username}/settings/keys`,
                        icon: KeyRound
                    }
                ],
            },
        ]
    }

    if (!user) {
        return (
            <ul className='flex flex-col mt-2 md:mt-0'>
                {[...Array(4)].map((_, index) => (
                    <FirstNavItemSkeleton key={index} />
                ))}
            </ul>
        )
    }

    return (
        <div>
            <ul className='flex flex-col mt-2 md:mt-0'>
                {routes.first.map((route, index) => (
                    <FirstNavItem key={index} name={route.name} icon={route.icon} url={route.url} isActive={pathname === route.url} />
                ))}
            </ul>
            <ul className='flex flex-col mt-2 md:mt-0'>
                {routes.second.map((item, index) => (
                    <SecondNavItem key={index} item={item} />
                ))}
            </ul>
        </div>
    )
}
