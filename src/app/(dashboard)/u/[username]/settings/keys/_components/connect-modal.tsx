"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IngressInput } from 'livekit-server-sdk'
import { AlertTriangle } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { createIngress } from '../../../../../../../../actions/ingress'
import { toast } from 'sonner'


const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)


type IngressType = typeof RTMP | typeof WHIP;


export const ConnectModal = () => {
  const [ingressType, setIngressType] = useState<IngressType>(RTMP)
  const [isPending, startTransition] = useTransition()

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
      .then(() => toast.success(`Ingress created`))
      .catch((error) => console.log(error)
      )
    })
  }
  

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Generate</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle><AlertTriangle className='w-4 h-4' /> Warning!</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will reset all active streams using the current connection
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Select disabled={isPending} value={ingressType} onValueChange={(value) => {setIngressType(value)}}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={RTMP}>RTMP</SelectItem>
              <SelectItem value={WHIP}>WHIP</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
