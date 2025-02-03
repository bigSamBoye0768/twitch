"use client"

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { CheckCheck, Copy } from 'lucide-react'
import React, { useState } from 'react'

export const CopyButton = ({ value }: { value?: string }) => {
    const [isCopied, setIsCopied] = useState(false)

    const onCopy = () => {
        if (!value) return

        navigator.clipboard.writeText(value)
        setIsCopied(true)

        setTimeout(() => {
            setIsCopied(false)
        }, 1000)

    }

    const Icon = isCopied ? CheckCheck : Copy
    return (
        <Hint label='Copy'>
            <Button className='' onClick={onCopy} variant="ghost" size="icon">
                <Icon />
            </Button>
        </Hint>
    )
}
