"use server"

import { getUserFromDb } from "@/lib/auth-service";
import prisma from "@/lib/prisma";
import { getStreamByUserId } from "@/lib/stream.services";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const currUser = await getUserFromDb();
        const mystream = await getStreamByUserId(currUser.id);

        if (!mystream) throw new Error("Stream not found")


        const stream = await prisma.stream.update({
            where: {userId: currUser.id},
            data: {
                name: values.name,
                isChatEnabled: values.isChatEnabled,
                isChatDelayed: values.isChatDelayed,
                isChatFollowersOnly: values.isChatFollowersOnly
            }
        })

        revalidatePath("/")
        revalidatePath(`/u/${currUser?.username}/settings/chat`)
        revalidatePath(`/u/${currUser?.username}`)

        
        return stream

    } catch (error) {
        throw new Error("Something went wrong")
    }
}