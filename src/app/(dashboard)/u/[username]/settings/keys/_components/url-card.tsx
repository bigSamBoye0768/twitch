import { Input } from '@/components/ui/input'
import React from 'react'
import { CopyButton } from './copy-button'

export const UrlCard = ({ value }:{value: string | null}) => {
  return (
    <div className='rounded-xl p-5 md:p-6 bg-white dark:bg-[#18181B] boxshadow'>
        <div className='flex md:items-center gap-1 md:gap-7 flex-col md:flex-row'>
            <p className='shrink-0 text-sm'>Server URL</p>
            <div className='w-full flex items-center space-x-2'>
                <Input placeholder='server url' value={value || ''} disabled/>
                <CopyButton value={value || ''}/>
            </div>
        </div>
    </div>
  )
}
