import { stringToColor } from '@/lib/utils'
import { ReceivedChatMessage } from '@livekit/components-react'
import { format } from 'date-fns'
import React from 'react'

export const ChatMessage = ({data}:{data:ReceivedChatMessage}) => {

  const color = stringToColor(data.from?.name || "")

  return (
    <div className='flex gap-2 p-2 rounded-md'>
      <p className='text-xs'>{format(data.timestamp, "HH:MM")}</p>
      <div className="flex flex-1 items-baseline gap-1 grow">
        <p className='text-xs font-semibold whitespace-nowrap'>
          <span className="truncate" style={{color:color}}>{data.from?.name}</span>: 
        </p>
        <p className='text-xs break-words'>
          {data.message}
        </p>
      </div>
    </div>
  )
}
