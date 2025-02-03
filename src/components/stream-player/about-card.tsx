"use client"

import React from 'react'

interface AboutCardProps {
  bio: string | null;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  followersCount: number
}

export const AboutCard = ({bio, hostIdentity, hostName, viewerIdentity, followersCount}:AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`

  const isHost = viewerIdentity === hostAsViewer

  const folloowedByLabel = followersCount === 1  ? "follower" : "followers"
  return (
    <div className='px-4'>
      <div className='group rounded-lg flex flex-col gap-y-1 px-6 py-5 boxshadow-2 bg-white dark:bg-[#18181B]'>
        <div className='flex items-center justify-between'>
          <div className='font-semibold'>About {hostName}</div>
          {isHost && (
            <p className='text-sm'>Edit</p>
          )}
        </div>

        <div className='text-sm text-foreground/50'>
          <span className='font-semibold text-foreground'>{followersCount}</span> {folloowedByLabel}
        </div>
        <p className='text-sm'>{bio || "No description"}</p>
      </div>
    </div>
  )
}
