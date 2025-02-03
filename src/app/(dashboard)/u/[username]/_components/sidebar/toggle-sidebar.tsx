"use client"

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'

const ToggleSidebar = () => {
    const { collapsed, onCollapse, onExpand } = useCreatorSidebar((state) => state)

    const label = collapsed ? "Expand" : "Collapse"


    return (
        <>
            {
                collapsed && (
                    <div className='hidden md:flex items-center justify-center py-1'>
                        <Hint label={label} side="right" asChild>
                            <Button className='' onClick={onExpand} variant="ghost" size="icon"><ArrowRightFromLine style={{ strokeWidth: "3" }} className='h-4 w-4' /></Button>
                        </Hint>
                    </div>
                )
            }
            {
                !collapsed && (
                    <div className='hidden md:flex  items-center justify-between py-1 px-3'>
                        <p className='font-semibold text-sm'>CREATOR DASHBOARD</p>
                        <Hint label={label} side="right" asChild>
                            <Button className='' onClick={onCollapse} variant="ghost" size="icon"><ArrowLeftFromLine style={{ strokeWidth: "3" }} className='h-4 w-4' /></Button>
                        </Hint>
                    </div>
                )
            }
        </>
    )
}

export default ToggleSidebar