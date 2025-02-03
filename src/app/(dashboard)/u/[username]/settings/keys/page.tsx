import { UrlCard } from './_components/url-card';
import { getUserFromDb } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream.services';
import { KeyCard } from './_components/key-card';
import { ConnectModal } from './_components/connect-modal';

const KeysPage = async() => {

  const currUser = await getUserFromDb();
  const stream = await getStreamByUserId(currUser.id);

  if(!stream) throw new Error("Stream not found")

  return (
    <div className='p-6'>
      <div className='max-w-screen-md mx-auto'>
      <div className='mb-5 flex items-center justify-between gap-2'>
        <h1 className='font-semibold text-xl'>Keys and Urls</h1>
        <ConnectModal />
      </div>

      <div className='space-y-2'>
        <UrlCard value={stream.serverUrl}/>
        <KeyCard value={stream.streamKey}/>
      </div>
      </div>
    </div>
  )
}

export default KeysPage