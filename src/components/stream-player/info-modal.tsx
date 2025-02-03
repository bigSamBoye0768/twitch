"use client"

import React, { useRef, useState, useTransition } from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { updateStream } from '../../../actions/stream';
import { toast } from 'sonner';

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
}

export const InfoModal = ({ initialName }: InfoModalProps) => {
    const closeRef = useRef<HTMLButtonElement>(null)


    const [isPending, startTransition] = useTransition()
    const [name, setName] = useState(initialName)
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(() => {
            updateStream({ name })
                .then(() => {
                    toast.success(`Stream name updated`)
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
                    <DialogTitle>Edit stream info</DialogTitle>
                </DialogHeader>

                <form className='space-y-14' onSubmit={onSubmit}>
                    <div className='space-y-2'>
                        <Label>Name</Label>
                        <Input placeholder='Stream name' disabled={isPending} value={name} onChange={(e) => { setName(e.target.value) }} />
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
