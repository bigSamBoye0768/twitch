import prisma from '@/lib/prisma';
import { WebhookReceiver } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

const receiver = new WebhookReceiver(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_SECRET_KEY!);


export async function POST(req: Request){
    const body = await req.text(); // Get the raw body as a string
    const headerPayload = req.headers
    const authorization = headerPayload.get('Authorization')

    if(!authorization){
        return new NextResponse("No Authorization header", {status:400})
    }

    const event = await receiver.receive(body, authorization);
    
    if(event.event === 'ingress_started'){
        await prisma.stream.update({
            where:{
                ingressId: event.ingressInfo?.ingressId
            },
            data: {
                isLive:true
            }
        })
    }


    if(event.event === 'ingress_ended'){
        await prisma.stream.update({
            where:{
                ingressId: event.ingressInfo?.ingressId
            },
            data: {
                isLive:false
            }
        })
    }
};