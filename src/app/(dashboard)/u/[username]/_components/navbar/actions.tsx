import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

export const Actions = async() => {
    // const user = await currentUser()

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

