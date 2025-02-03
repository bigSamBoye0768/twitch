"use client"

import { useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import React, { useRef} from 'react'
// import { FullscreenControls } from './fullscreen-controls'
// import { useEventListener } from 'usehooks-ts'

export const LiveVideo = ({ participant }: { participant: Participant }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // const [isFullscreen, setIsFRullscreen] = useState(false);
    

    // const toggleFullscreen = () => {
    //     if(isFullscreen){
    //         document.exitFullscreen()
    //         // setIsFRullscreen(false)
    //     }else if(wrapperRef.current){
    //         wrapperRef.current.requestFullscreen()
    //         // setIsFRullscreen(true)
    //     }
    // }

    // const handleFullscreenChange = () => {
    //     const isCurrentlyFullScreen = document.fullscreenElement !== null
    //     setIsFRullscreen(isCurrentlyFullScreen)
    // }
    

    // useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef)

    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if(videoRef.current){
                track.publication.track?.attach(videoRef.current)
            }
        })

    return (
        <div className='relative full flex' ref={wrapperRef}>
            <video width="100%" ref={videoRef}></video>
            <div className='absolute top-0 w-full h-full opacity-0 hover:opacity-100 hover:transition-all'>
                <div className='absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4'>
                    {/* <FullscreenControls isFullscreen={isFullscreen} onToggle={toggleFullscreen}/> */}
                </div>
            </div>
        </div>
    )
}
