import { StreamPlayer } from '@/components/stream-player';
import { getUserByUsername } from '@/lib/user-service';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

const StreamPage = async({ params }: { params: Promise<{ username: string }> }) => {
    const currUser = await currentUser();
    const { username } = await params;
    const user = await getUserByUsername(username);

    if(!user || user.externalUserId !== currUser?.id || !user.stream){
        throw new Error("Unauthorized")
    }

  return (
    <div>
        <StreamPlayer user={user} stream={user.stream} isFollowing/>
    </div>
  )
}

export default StreamPage