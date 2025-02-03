"use client"

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users } from 'lucide-react'
import React from 'react'
import { Hint } from '../hint'
import { Button } from '../ui/button'

export const VariantToggle = () => {
    const {variant, onChangeVariant} = useChatSidebar((state) => state)

    const isChat = variant === ChatVariant.CHAT 

    const Icon = isChat ? Users : MessageSquare

    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
        onChangeVariant(newVariant) 
    }

    const label = isChat ? "Community" : "Go back to chat"

  return (
    <Hint label={label}>
        <Button variant="ghost" size="icon" onClick={onToggle}>
            <Icon className='w-4 h-4'/>
        </Button>
    </Hint>
  )
}
