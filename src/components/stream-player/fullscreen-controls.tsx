import { Maximize, Minimize } from 'lucide-react';
import React from 'react'
import { Hint } from '../hint';
import { Button } from '../ui/button';


interface FullscreenControls {
    isFullscreen: boolean;
    onToggle: () => void;
}

export const FullscreenControls = ({isFullscreen, onToggle}:FullscreenControls) => {
    const Icon = isFullscreen ? Minimize : Maximize
    const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen"


  return (
    <div className='flex items-center justify-center gap-4'>
        <Hint label={label}>
            <Button size="icon" variant="ghost" className='rounded-xl' onClick={onToggle}>
                {<Icon className='h-5 w-5'/>}
            </Button>
        </Hint>
    </div>
  )
}
