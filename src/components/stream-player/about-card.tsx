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
      <div className='group rounded-lg flex flex-col gap-y-2 px-2 md:px-6 bg-white dark:bg-[#18181B]'>
        <div className='flex items-center justify-between'>
          <div className='font-semibold text-lg'>About {hostName}</div>
          {isHost && (
            <p>Edit</p>
          )}
        </div>

        <div className='text-sm'>
          <span className='font-semibold'>{followersCount}</span> {folloowedByLabel}
        </div>
        <p className='text-sm'>{bio || "No description"}</p>
      </div>
    </div>
  )
}
