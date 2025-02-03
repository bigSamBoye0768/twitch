"use client"

import { useChatSidebar } from '@/store/use-chat-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'
import { Hint } from '../hint'
import { Button } from '../ui/button'

export const ChatToggle = () => {
    const {collapsed, onExpand, onCollapse} = useChatSidebar((state) => state)

    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine

    const onToggle = () => {
        if(collapsed){
            onExpand()
        }else {
            onCollapse()
        }
    }

    const label = collapsed ? "Expand" : "Collapse"

  return (
    <Hint label={label}>
        <Button variant="ghost" size="icon" onClick={onToggle}>
            <Icon className='w-4 h-4'/>
        </Button>
    </Hint>
  )
}
