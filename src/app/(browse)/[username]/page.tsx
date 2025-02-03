import { isFollowingUser } from '@/lib/follow';
import { getUserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import React from 'react'
import { Actions } from './_components/actions';
import { isBlockedByUser } from '@/lib/block-service';
import { StreamPlayer } from '@/components/stream-player';

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {

  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user || !user.stream) return notFound()

  const isFollowing = await isFollowingUser(user.id)
  // is blocked by user with this username
  const isBlocked = await isBlockedByUser(user.id)

  if (isBlocked) return notFound()


  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing}/>
  )
}

export default UserPage