"use client"

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { CopyButton } from './copy-button'
import { Button } from '@/components/ui/button'

export const KeyCard = ({ value }: { value: string | null }) => {
    const [show, setShow] = useState(false)
    return (
        <div className='rounded-xl p-5 md:p-6 bg-white dark:bg-[#18181B] boxshadow'>
            <div className='flex md:items-center gap-1 md:gap-7 flex-col md:flex-row'>
                <p className='shrink-0 text-sm'>Stream Key</p>
                <div className='w-full flex items-center space-x-2'>
                    <Input placeholder='stream key' type={`${show ? "text":"password"}`} value={value || ''} disabled />
                    <CopyButton value={value || ''} />
                </div>
            </div>
            <Button variant="link" onClick={() => setShow((val) => !val)} className='w-fit mt-2 px-0 text-black dark:text-white'>
                {show ? "Hide" : "Show"}
            </Button>

        </div>
    )
}
