import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export const Actions = async () => {
    const user = await currentUser()

    return (
        <div className='flex items-center gap-2'>
            {!user && (
                <SignInButton>
                    <Button size="sm">Login</Button>
                </SignInButton>
            )}
            {!!user && (
                <div className='flex items-center gap-2'>
                    <Link href={`/u/${user.username}`}>
                        <Button className='flex items-center' variant="ghost">
                            <span className='flex items-center justify-center'>
                                <svg width="28" height="28" className="text-black dark:text-white">
                                    <path d="M7 10h2v4H7zm6-4h-2v8h2z" className="fill-current" />
                                    <path fillRule="evenodd" d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm12 2H4v12h12z" clipRule="evenodd" className="fill-current" />
                                </svg>
                            </span>
                            <span className='hidden md:block'>Creator Dashboard</span>
                        </Button>
                    </Link>
                    <UserButton />
                </div>
            )}

            <ModeToggle />
        </div>
    )
}

