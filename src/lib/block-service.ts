import { getUserFromDb } from "./auth-service"
import prisma from "./prisma"

export const isBlockedByUser = async (id: string) => {
    try {
        const currUser = await getUserFromDb()
        const otherUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!otherUser) {
            throw new Error("User not found")
        }

        if (otherUser.id === currUser.id) {
            return false
        }

        const blocked = await prisma.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: currUser.id
                }
            }
        })

        return !!blocked

    } catch (error) {
        return false
    }

}






export const blockUser = async (id: string) => {
    const currUser = await getUserFromDb()

    const otherUser = await prisma.user.findUnique({
        where: { id }
    })


    if (!otherUser) {
        throw new Error("User not found")
    }


    if (otherUser.id === currUser.id) {
        throw new Error("Can't block yourself")
    }

    const blocked = await prisma.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: otherUser.id,
                blockedId: currUser.id
            }
        }
    })

    if(blocked) throw new Error("Already blocked")



    const block = await prisma.block.create({
        data:{
            blockerId:currUser.id,
            blockedId: otherUser.id
        },
        include:{
            blocked: true,
        }
    })

    return block

    
}



export const unBlockUser = async (id: string) => {
    const currUser = await getUserFromDb()

    const otherUser = await prisma.user.findUnique({
        where: { id }
    })


    if (!otherUser) {
        throw new Error("User not found")
    }


    if (otherUser.id === currUser.id) {
        throw new Error("Can't block yourself")
    }

    const blocked = await prisma.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: otherUser.id,
                blockedId: currUser.id
            }
        }
    })

    if(!blocked) throw new Error("Not blocked")

    


    const unblock = await prisma.block.delete({
        where:{
            id: blocked.id
        },
        include:{
            blocked: true
        }
    })

    return unblock

    
}