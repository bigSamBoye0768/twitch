"use client"

import { Switch } from '@/components/ui/switch'
import React, { useTransition } from 'react'
import { updateStream } from '../../../../../../../../actions/stream'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

type FieldType = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

export const ToggleCard = ({ label, field, value }: { label: string, field: FieldType, value: boolean }) => {

const [isPending, startTransition] = useTransition()
    const onChange = () => {
        startTransition(() => {
            updateStream({[field]: !value})
            .then(() => toast.success(`Chat settings updated`))
            .catch(() => toast.error("Something went wrong"))
        })
    }


    return (
        <div className='rounded-lg bg-white dark:bg-[#18181B] boxshadow p-4'>
            <div className='flex items-center justify-between gap-2'>
                <p className='flex-1 text-sm font-semibold'>{label}</p>
                <Switch
                    checked={value}
                    onCheckedChange={onChange}
                    disabled={isPending}
                />
            </div>
        </div>
    )
}



export const ToggleCardSkeleton = () => {
    return(
        <Skeleton  className='p-10 rounded-lg w-full'/>
    )
}