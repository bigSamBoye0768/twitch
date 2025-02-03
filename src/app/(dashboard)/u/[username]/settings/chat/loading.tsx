import React from 'react'
import { ToggleCardSkeleton } from './_components/toggle-card'

const Loading = () => {
  return (
    <div className='p-6'>
    <div className='mb-3'>
        <h1 className='font-semibold text-xl'>Chat Settings</h1>
    </div>

    <div className='space-y-2'>
      <ToggleCardSkeleton />
      <ToggleCardSkeleton />
      <ToggleCardSkeleton />
    </div>
</div>
  )
}

export default Loading