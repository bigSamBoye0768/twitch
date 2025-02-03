"use client"
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import React, { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts';
import { ChatHeader, ChatHeaderSkeleton } from './chat-header';
import { ChatForm, ChatFormSkeleton } from './chat-form';
import { ChatList, ChatListSkeleton } from './chat-list';


interface ChatProps {
    hostName: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export const Chat = ({ hostName, hostIdentity, viewerName, isFollowing, isChatDelayed, isChatEnabled, isChatFollowersOnly }: ChatProps) => {

    const matches = useMediaQuery("(max-width:1024px)")
    const { collapsed, variant, onExpand } = useChatSidebar((state) => state)
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)
    const isOnline = participant && connectionState === ConnectionState.Connected

    const isHidden = !isChatEnabled || !isOnline

    const [value, setValue] = useState("")
    const {chatMessages:messages, send} = useChat()


    useEffect(() => {
        if(matches) {
            onExpand()
        }

    }, [matches, onExpand])

    const reversedMassages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp)
    }, [messages])


    const onSubmit = () => {
        if(!send) return
        send(value)
        setValue("")
    }

    const onChange = (value:string) => {
        setValue(value)
    }


    return (
        <div className='flex flex-col border-l border-b pt-0 h-[calc(100vh-4.3rem)]'>
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                <ChatList messages={reversedMassages} isHidden={isHidden}/>
                <ChatForm onSubmit={onSubmit} onChange={onChange} isDelay={isChatDelayed} isFollowerOnly={isChatFollowersOnly} isFollowing={isFollowing} isHidden={isHidden} value={value}/>
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <>
                </>
            )}
        </div>
    )
}


export const ChatSkeleton = () => {
    return(
        <div className='flex flex-col border-l border-b pt-0 h-[calc(100vh-4.3rem)]'>
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    )
}