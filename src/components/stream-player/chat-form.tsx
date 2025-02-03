import React, { useState } from 'react'
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { AlertCircle } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { ChatInfo } from './chat-info';

interface ChatFormProps {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowerOnly: boolean;
    isFollowing: boolean;
    isDelay: boolean;
}

export const ChatForm = ({ onChange, onSubmit, isDelay, isFollowerOnly, isFollowing, isHidden, value }: ChatFormProps) => {

    const [isDelayedBlocked, setIsDelayedBlocked] = useState(false)
    const isFollowersOnlyAndNotFollowing = isFollowerOnly && !isFollowing
    const isDisabled = isHidden || isDelayedBlocked || isFollowersOnlyAndNotFollowing

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (!value || isDisabled) return

        if (isDelay && !isDelayedBlocked) {
            setIsDelayedBlocked(true)
            setTimeout(() => {
                setIsDelayedBlocked(false)
                onSubmit()
            }, 3000)
        } else {
            onSubmit()
        }
    }

    if (isHidden) return null


    return (
        <form className='flex flex-col items-center gap-y-3 p-2' onSubmit={handleSubmit}>
            <div className='w-full'>
                <ChatInfo isFollowerOnly={isFollowerOnly} isDelayed={isDelay}/>
                <Input onChange={(e) => onChange(e.target.value)} value={value} disabled={isDisabled} placeholder='Send a message' className={cn("", isFollowerOnly && "border-t-0 rounded-t-none")} />
            </div>

            <div className='ml-auto'>
                <Button size="sm" type='submit' disabled={isDisabled}>Chat</Button>
            </div>
        </form>
    )
}


export const ChatFormSkeleton = () => {
    return (
        <div className='flex flex-col items-center gap-y-3 p-2'>
            <Skeleton className='w-full h-10' />
            <div className='flex items-center gap-x-2 ml-auto'>
                <Skeleton className='w-full h-8' />
                <Skeleton className='w-full h-12' />
            </div>
        </div>
    )
}
