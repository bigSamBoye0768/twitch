"use client";


import { useViewerToken } from '@/hooks/use-viewer-token'
import { Stream, User } from '@prisma/client'
import { LiveKitRoom } from "@livekit/components-react";
import React from 'react'
import { Video, VideoSkeleton } from './video';
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { cn } from '@/lib/utils';
import { Chat, ChatSkeleton } from './chat';
import { ChatToggle } from './chat-toggle';
import { Header, HeaderSkeleton } from './header';
import { InfoCard } from './info-card';
import { AboutCard } from './about-card';

interface StreamPlayerProps {
    user: User & { stream: Stream | null, _count: {followedBy: number} },
    stream: Stream,
    isFollowing: boolean
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {

    const { token, name, identity } = useViewerToken(user.id)
    console.log({ token, name, identity });
    console.log("user-id", user.id);

    const { collapsed } = useChatSidebar((state) => state)



    if (!token || !name || !identity) {
        return (
            <div>
                <p className=''>Cannot Watch Stream</p>
            </div>
        )
    }

    return (
        <>
            {
                collapsed && (
                    <div className="fixed top-[80px] right-2 hidden lg:block z-40">
                        <ChatToggle />
                    </div>
                )
            }

            <LiveKitRoom token={token} serverUrl={process.env.LIVEKIT_WEBSOCKET_URL}
                className={cn('grid grid-cols-1 gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full', collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2")}>
                <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto pb-10 hidden-scrollbar'>
                    <Video hostName={user.username as string} hostIdentity={user.id} />
                    <Header imgUrl={user.imgUrl} name={stream.name} viewerIdentity={identity} hostName={user.username as string} isFollowing={isFollowing} hostIdentity={user.id} />
                    <InfoCard name={stream.name} viewerIdentity={identity} hostIdentity={user.id} thumbnail={stream.thumbnailUrl}/>
                <AboutCard bio={user.bio} hostIdentity={user.id} viewerIdentity={identity} hostName={user.username as string} followersCount={user._count.followedBy}/>
                </div>
                <div className={cn("col-span-1 bg-white dark:bg-[#18181B] mt-0.5", collapsed && "hidden")}>
                    <Chat hostName={user.username as string} hostIdentity={user.id} viewerName={name} isChatDelayed={stream.isChatDelayed} isChatEnabled={stream.isChatEnabled} isChatFollowersOnly={stream.isChatFollowersOnly} isFollowing={isFollowing} />
                </div>
            </LiveKitRoom>
        </>
    )
}



export const StreamPlayerSkeleton = () => {
    return (
        <div className='grid grid-cols-1 gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full'>
            <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto pb-10 hidden-scrollbar'>
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className='col-span-1 bg-white dark:bg-[#18181B] mt-0.5'>
                <ChatSkeleton />
            </div>
        </div>
    )
}
