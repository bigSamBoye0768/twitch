"use server"

import { getUserFromDb } from "@/lib/auth-service";
import { blockUser } from "@/lib/block-service";
import { followUser, unFollowUser } from "@/lib/follow";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_SECRET_KEY;
    const livekitUrl = process.env.LIVEKIT_API_URL;

    if (!apiKey || !apiSecret || !livekitUrl) {
        throw new Error('LiveKit environment variables are not set');
    }

    const roomService = new RoomServiceClient(livekitUrl, apiKey, apiSecret);

    const currUser = await getUserFromDb();
    let blockedUser;

    try {
        blockedUser = await blockUser(id)
    } catch (error) {

    }

    try {
        await roomService.removeParticipant(currUser.id, id)
    } catch (error) {
        
    }


    revalidatePath("/")
    revalidatePath(`/u/${currUser.username}/community`)

    if (blockedUser) revalidatePath(`/${blockedUser.blocked.username}`)
    return blockedUser

}


export const onUnBlock = async (id: string) => {
    try {
        const unblockedUser = await blockUser(id)

        revalidatePath("/")

        if (unblockedUser) revalidatePath(`/${unblockedUser.blocked.username}`)
        return unblockedUser
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong")
    }
}