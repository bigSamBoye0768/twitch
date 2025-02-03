"use server"

import { followUser, unFollowUser } from "@/lib/follow";
import { revalidatePath } from "next/cache";

export const onFollow = async(id:string) => {
    try {
        const followedUser = await followUser(id)
        
        revalidatePath("/")

        if(followedUser) revalidatePath(`/${followedUser.following.username}`)
        return followedUser
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong")
    }
}


export const onUnfollow = async(id:string) => {
    try {
        const unfollowedUser = await unFollowUser(id)
        
        revalidatePath("/")

        if(unfollowedUser) revalidatePath(`/${unfollowedUser.following.id}`)
        return unfollowedUser
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong")
    }
}