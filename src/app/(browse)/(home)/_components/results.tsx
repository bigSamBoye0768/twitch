import { getStreams } from '@/lib/feed-service'
import React from 'react'
import { ResultCard, ResultCardSkeleton } from './result-card';
import { Skeleton } from '@/components/ui/skeleton';

export const Results = async () => {
    const data = await getStreams();
    return (
        <div>
            <h2 className='text-lg font-semibold mb-2'><span className='text-primary'>Streams</span> we think you'll like</h2>
            {
                data.length === 0 && (
                    <div className='text-sm'>
                        No streams or live channels found.
                    </div>
                )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
            <Skeleton className='h-7 w-[290px] mb-4'/>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                {[...Array(6)].map((_, i) => (
                    <ResultCardSkeleton key={i}/>
                ))}
            </div>
        </div>
    )
}