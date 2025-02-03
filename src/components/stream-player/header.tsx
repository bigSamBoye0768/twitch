import React from 'react'
import { UserAvatar, UserAvatarSkeleton } from '../user-avatar';
import { useParticipants, useRemoteParticipant } from '@livekit/components-react';
import { UserIcon } from 'lucide-react';
import { Actions } from './actions';
import { Skeleton } from '../ui/skeleton';

interface HeaderProps {
    imgUrl: string;
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    isFollowing:boolean;
    name:string;
}

export const Header = ({imgUrl, hostIdentity, hostName, viewerIdentity, isFollowing, name}:HeaderProps) => {
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);


    const isLive = !!participant
    const participantsCount = participants.length - 1
    const hostAsViewer = `host-${hostIdentity}`

    const isHost = viewerIdentity === hostAsViewer

  return (
    <div className='flex px-2 md:px-6 flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between'>
        <div className='flex items-center gap-x-3'>
            <UserAvatar size="lg" imgUrl={imgUrl} username={hostName} showBadge isLive={isLive}/>
        

        <div className='space-y-1'>
            <div className='flex items-center gap-x-1'>
                <h2 className='text-left font-semibold'>{hostName}</h2>
            </div>
            <p className='text-sm font-semibold'>{name}</p>
            {isLive ? (
                <div className='text-red-700 flex gap-x-1 items-center text-xs font-semibold'>
                    <UserIcon className='w-4 h-4 text-red-700'/>
                    <p>{participantsCount} {participantsCount === 1 ? "viewer":"viewers"}</p>
                </div>
            ): (
                <p className='text-xs font-semibold'>Offline</p>
            )}
        </div>



        </div>

        <Actions isFollowing={isFollowing} hostIdentity={hostIdentity} isHost={isHost}/>
    </div>
  )
}



export const HeaderSkeleton = () => {
    return(
        <div className='flex px-2 md:px-6 flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between'>
            <div className='flex items-center gap-x-3'>
            <UserAvatarSkeleton size="lg"/>
                <div className='space-y-1'>
                <Skeleton className='w-full h-6 md:w-32'/>
                <Skeleton className='w-full h-6 md:w-32'/>
                </div>
            </div>
        </div>
    )
}