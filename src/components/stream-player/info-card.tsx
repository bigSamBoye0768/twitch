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
    <div className='px-2 md:px-6'>
        <div>
            <div className='flex items-center gap-2 p-3'>
                <div className='rounded-lg bg-white dark:bg-[#18181B] w-auto h-auto p-2 bg-primary'>
                    <Pencil className='w-4 h-4'/>
                </div>
                <div className='text-sm capitalize'>
                    <h2>Edit your stream info</h2>
                    <p className='text-xs'>Maximize your visibility</p>
                </div>
                <InfoModal initialName={name} initialThumbnailUrl={thumbnail}/>
            </div>
            <Separator />
            <div>
                <div>
                    <h3 className='text-sm mb-2'>Name</h3>
                    <p className='text-sm font-semibold '>{name}</p>
                </div>
                <div>
                    <h3 className='text-sm mb-2'>Thumbnail</h3>
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
