import { currentUser } from "@clerk/nextjs/server"
import prisma from "./prisma"

export const getUserFromDb = async() => {
    const currUser = await currentUser()

    if(!currUser || !currUser.username){
        throw new Error('Unauthorized')
    }

    try {
        const user = await prisma.user.findUnique({
            where: { externalUserId: currUser.id }
        })

        if(!user) throw new Error('User not found')
        return user
    } catch (error) {
        throw new Error('Something went wrong!')
    }

}


export const getCurrUserByUsernameFromDb = async(username:string) => {
    const currUser = await currentUser()

    if(!currUser || !currUser.username){
        throw new Error('Unauthorized')
    }

    try {
        const user = await prisma.user.findUnique({
            where: { username }
        })

        if(!user) throw new Error('User not found')

        if(currUser.username != user.username) throw new Error('Unauthorized')
        return user
    } catch (error) {
        throw new Error('Something went wrong!')
    }

}