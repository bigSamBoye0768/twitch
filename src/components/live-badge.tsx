import { cn } from '@/lib/utils'
import React from 'react'

export const LiveBadge = ({className}:{className?:string}) => {
  return (
    <div className={cn("bg-red-500 text-center p-0.5 px-1.5 rounded-md uppercase text-xs tracking-wide", className)}>Live</div>
  )
}
