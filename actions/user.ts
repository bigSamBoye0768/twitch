"use server"

import { getUserFromDb } from "@/lib/auth-service"
import prisma from "@/lib/prisma"
import { User } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const updateUser = async(values: Partial<User>) => {
    try {
        const currUser = await getUserFromDb();

        const user = await prisma.user.update({
            where: {
                id: currUser.id
            },
            data: {
                bio: values.bio
            }
        })
        
        revalidatePath("/")
        revalidatePath(`/u/${currUser.username}/stream`)

        return user

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong")
    }
}