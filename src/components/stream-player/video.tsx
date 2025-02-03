"use client"
import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react'
import { ConnectionState, Track } from 'livekit-client'
import React from 'react'
import { OfflineVideo } from './offline-video'
import { LoadingVideo } from './loading-video'
import { LiveVideo } from './live-video'
import { Skeleton } from '../ui/skeleton'

export const Video = ({ hostName, hostIdentity }: { hostName: string, hostIdentity: string }) => {
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity)


    let content;

    if(!participant && connectionState === ConnectionState.Disconnected){
        content = <OfflineVideo username={hostName}/>
    }else if(!participant || tracks.length === 0){
        content = <LoadingVideo label={connectionState}/>
    }else{
        content = <LiveVideo participant={participant}/>
    }

    return (
        <div className='border-b group relative aspect-video'>
            {content}
        </div>
    )
}



export const VideoSkeleton = () => {
    return (
            <Skeleton className='border-b group relative rounded-none aspect-video w-full'/>
    )
}