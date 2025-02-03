"use client"

import { Pencil } from 'lucide-react';
import React from 'react'
import { Separator } from '../ui/separator';
import Image from 'next/image';
import { InfoModal } from './info-modal';

interface InfoCardProps {
    name:string;
    thumbnail: string | null;
    hostIdentity: string;
    viewerIdentity: string;
}

export const InfoCard = ({name, hostIdentity, viewerIdentity, thumbnail}:InfoCardProps) => {
    const hostAsViewer = `host-${hostIdentity}`

    const isHost = viewerIdentity === hostAsViewer

    if(!isHost) return null

  return (
    <div className='px-4'>
        <div className='rounded-lg boxshadow-2 px-6 py-4 bg-white dark:bg-[#18181B]'>
            <div className='flex items-center gap-3 py-3'>
                <div className='rounded-lg bg-[#F7F7F8] dark:bg-[#0E0E10]  w-auto h-auto p-3'>
                    <Pencil className='w-4 h-4'/>
                </div>
                <div className='text-sm capitalize'>
                    <h2>Edit your stream info</h2>
                    <p className='text-xs'>Maximize your visibility</p>
                </div>
                <InfoModal initialName={name} initialThumbnailUrl={thumbnail}/>
            </div>
            <Separator />
            <div className='pt-3'>
                <div className='mb-1'>
                    <h3 className='text-sm mb-1 text-foreground/50'>Name</h3>
                    <p className='text-sm font-semibold '>{name}</p>
                </div>
                <div>
                    <h3 className='text-sm mb-2 text-foreground/50'>Thumbnail</h3>
                    {
                        thumbnail && (
                            <div className='relative rounded-md aspect-video overflow-hidden w-[200px]'>
                                <Image fill src={thumbnail} alt={name} className='object-cover'/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>

  )
}
