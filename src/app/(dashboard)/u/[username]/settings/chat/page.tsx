import { getUserFromDb } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream.services';
import React from 'react'
import { ToggleCard } from './_components/toggle-card';

const ChatPage = async() => {
  const currUser = await getUserFromDb();
  const stream = await getStreamByUserId(currUser.id);

  if(!stream) throw new Error("Stream not found")

  return (
    <div className='p-6'>
        <div className='mb-3'>
            <h1 className='font-semibold text-xl'>Chat Settings</h1>
        </div>

        <div className='space-y-2'>
          <ToggleCard label='Enable Chat' field="isChatEnabled" value={stream.isChatEnabled}/>
          <ToggleCard label='Delay Chat' field="isChatDelayed" value={stream.isChatDelayed}/>
          <ToggleCard label='Only Followers' field="isChatFollowersOnly" value={stream.isChatFollowersOnly}/>
        </div>
    </div>
  )
}

export default ChatPage