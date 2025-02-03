import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Clapperboard, LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Actions = async() => {
    const user = await currentUser()

  return (
    <div className='flex items-center'>
        <Link href="/">
            <Button size="sm" variant="ghost" className='flex items-center'>
                <LogOut className='h-4 w-4'/>
                Exit
            </Button>
        </Link>
        <div className='mr-2'>
        <ModeToggle />
        </div>
        <UserButton />
    </div>
  )
}

