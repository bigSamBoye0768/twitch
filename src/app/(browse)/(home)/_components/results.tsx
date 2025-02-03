import { getStreams } from '@/lib/feed-service'
import React from 'react'
import { ResultCard, ResultCardSkeleton } from './result-card';
import { Skeleton } from '@/components/ui/skeleton';

export const Results = async () => {
    const data = await getStreams();
    return (
        <div>
            <h2 className='text-base font-semibold mb-5'><span className='text-primary'>Streams</span> we think you&lsquo;ll like</h2>
            {
                data.length === 0 && (
                    <div className='text-sm'>
                        No streams or live channels found.
                    </div>
                )
            }

            <div className="grid grid-cols-1 gap-x-4 gap-y-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {data.map((stream) => (
                    <ResultCard key={stream.id} data={stream}/>
                ))}
            </div>
        </div>
    )
}


export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className='h-7 w-[290px] mb-6'/>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'>
                {[...Array(6)].map((_, i) => (
                    <ResultCardSkeleton key={i}/>
                ))}
            </div>
        </div>
    )
}