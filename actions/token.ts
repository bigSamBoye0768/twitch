"use server"

import { getUserFromDb } from "@/lib/auth-service";
import { isBlockedByUser } from "@/lib/block-service";
import { getUserById } from "@/lib/user-service";
import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid"

export const createViewerToken = async(hostIdentity:string) => {

    let curr; 

    try {
        curr = await getUserFromDb();
    } catch (error) {
        console.log(error);
        
        const id = v4()
        const username = `guest#${Math.floor(Math.random() * 1000000)}`
        curr = {id, username}
    }

    
    

    const host = await getUserById(hostIdentity)


    if(!host){
        throw new Error("User not found")
    }

    const isBlocked= await isBlockedByUser(host.id)

    if(isBlocked){
        throw new Error("User is blocked")
    }

    const isHost = curr.id === host.id;
    

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_SECRET_KEY!,
        {
            identity: isHost ? `host-${curr.id}`:curr.id,
            name: curr.username as string
        }


    )


    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish:false,
        canPublishData:true
    })

    

    return await token.toJwt() 
}