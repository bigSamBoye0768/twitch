import React, { useRef, useState, useTransition } from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { updateStream } from '../../../actions/stream';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import { updateUser } from '../../../actions/user';


export const BioModal = ({initialValue}:{initialValue: string}) => {
    const [value, setvalue] = useState(initialValue)
    const closeRef = useRef<HTMLButtonElement>(null)


    const [isPending, startTransition] = useTransition()


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(() => {
            updateUser({ bio: value })
                .then(() => {
                    toast.success(`Bio updated`)
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="icon" className='ml-auto'>Edit</Button>
            </DialogTrigger>
            <DialogContent className='bg-white dark:bg-[#18181B]'>
                <DialogHeader>
                    <DialogTitle>Edit your bio</DialogTitle>
                </DialogHeader>

                <form className='space-y-14' onSubmit={onSubmit}>
                    <div className='space-y-2'>
                        <Label>Name</Label>
                        <Textarea placeholder='Bio' className='resize-none' disabled={isPending} value={value} onChange={(e) => { setvalue(e.target.value) }}/>
                    </div>
                    <div className='flex justify-between'>
                        <DialogClose asChild ref={closeRef}>
                            <Button variant="ghost" type='button'>Cancel</Button>
                        </DialogClose>
                        <Button type='submit' disabled={isPending}>Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
