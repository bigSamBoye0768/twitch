"use server"

import { getUserFromDb } from '@/lib/auth-service';
import prisma from '@/lib/prisma';
import { CreateIngressOptions, IngressClient, IngressInput, IngressVideoEncodingPreset, Room, RoomServiceClient, TrackSource } from 'livekit-server-sdk';
import { revalidatePath } from 'next/cache';


const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_SECRET_KEY;
const livekitUrl = process.env.LIVEKIT_API_URL;

if (!apiKey || !apiSecret || !livekitUrl) {
    throw new Error('LiveKit environment variables are not set');
}


const roomService = new RoomServiceClient(livekitUrl, apiKey, apiSecret);
const ingressClient = new IngressClient(livekitUrl, apiKey, apiSecret)

export async function resetIngress(hostIdentity: string) {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity
    })

    const rooms = await roomService.listRooms([hostIdentity])

    for(const room of rooms){
        await roomService.deleteRoom(room.name)
    }

    for(const ingress of ingresses){
        if(ingress.ingressId){
            await ingressClient.deleteIngress(ingress.ingressId)
        }
    }


}




export const createIngress = async(ingressType: IngressInput) => {
    console.log("hit", ingressType);
    
    const currUser = await getUserFromDb();

    await resetIngress(currUser.id)

    const ingressInfo: CreateIngressOptions = {
        roomName: currUser.id,
        participantIdentity: currUser.id,
        participantName: currUser.username as string,
        name: currUser.username as string
    };


    if (ingressType !== IngressInput.WHIP_INPUT) {
        ingressInfo.enableTranscoding = true
        // ingressInfo.video = {
        //     source: TrackSource.CAMERA,
        //     encodingOptions: {
        //         value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        //         case: "preset",
        //       }

        // }
    }

    const ingress = await ingressClient.createIngress(
        ingressType,
        ingressInfo
    )

    if (!ingress || !ingress.url || !ingress.streamKey) {
        throw new Error("Failed to create ingress")
    }

    await prisma.stream.update({
        where: { userId: currUser.id },
        data: {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey
        }
    })

    revalidatePath(`/u/${currUser.username}/settings/keys`)
    return ingress
}
