import { getUserFromDb } from "./auth-service"
import prisma from "./prisma"

export const isFollowingUser = async (id: string) => {
    try {
        const currUser = await getUserFromDb()
        const otherUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!otherUser) {
            throw new Error("User not found")
        }

        if (otherUser.id === currUser.id) {
            return true
        }

        const following = await prisma.follow.findFirst({
            where: {
                followingId: otherUser.id,
                followerId: currUser.id
            }
        })

        return !!following

    } catch (error) {
        console.log(error);

        return false
    }

}


export const followUser = async (id: string) => {
    const currUser = await getUserFromDb()

    const otherUser = await prisma.user.findUnique({
        where: { id }
    })


    if (!otherUser) {
        throw new Error("User not found")
    }


    if (otherUser.id === currUser.id) {
        throw new Error("Can't follow yourself")
    }

    
    const following = await prisma.follow.findFirst({
        where: {
            followingId: otherUser.id,
            followerId: currUser.id
        }
    })

    if(following) throw new Error("Already following")

    const follow = await prisma.follow.create({
        data:{
            followerId:currUser.id,
            followingId: otherUser.id
        },
        include:{
            following: true,
            follower: true
        }
    })

    return follow

    
}



export const unFollowUser = async (id: string) => {
    const currUser = await getUserFromDb()

    const otherUser = await prisma.user.findUnique({
        where: { id }
    })


    if (!otherUser) {
        throw new Error("User not found")
    }


    if (otherUser.id === currUser.id) {
        throw new Error("Can't unfollow yourself")
    }

    
    const following = await prisma.follow.findFirst({
        where: {
            followingId: otherUser.id,
            followerId: currUser.id
        }
    })

    if(!following) throw new Error("You're not even following this user")

    const unfollow = await prisma.follow.delete({
        where:{
            id: following.id
        },
        include:{
            following: true
        }
    })

    return unfollow

    
}




export const getCurrUserFollowings = async () => {
    try {
        const currUser = await getUserFromDb()

        const followers = prisma.follow.findMany({
            where: {
                followerId: currUser.id,
                following: {
                    blocking:{
                        none:{
                            blockerId:currUser.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true
                            }
                        }
                    }
                }
            }
        })

        return followers
    } catch (error) {
        console.log(error);

        return []
    }
    
}



