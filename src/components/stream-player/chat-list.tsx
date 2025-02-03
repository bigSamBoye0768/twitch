import { ReceivedChatMessage } from '@livekit/components-react'
import React from 'react'
import { ChatMessage } from './chat-message'
import { Skeleton } from '../ui/skeleton'

export const ChatList = ({ messages, isHidden }: { messages: ReceivedChatMessage[], isHidden: boolean }) => {
    if (isHidden || !messages || messages.length <= 0){
        return(
            <div className='flex flex-1 items-center justify-center'>
                <p className='text-sm text-foreground/50'>{isHidden ? "Chat is disabled" : "Welcome to the chat room"}</p>
            </div>
        )
    }

        return (
            <div className='flex flex-1 flex-col-reverse h-full overflow-y-auto p-2'>
                {messages.map((message, index) => (
                    <ChatMessage key={index} data={message}/>
                ))}
            </div>
        )
}


export const ChatListSkeleton = () => {
    return (
        <div className='flex flex-1 gap-y-2 flex-col-reverse h-full p-2'>
           {[...Array(6)].map((_, index) => (
                <Skeleton className='w-full h-6 md:w-44' key={index}/>
                ))}
        </div>
    )
}
