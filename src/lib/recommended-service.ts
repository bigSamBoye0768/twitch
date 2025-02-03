import { getUserFromDb } from "./auth-service"
import prisma from "./prisma"

export const getRecommended = async () => {
    // await new Promise(resolve => setTimeout(resolve, 5000))
    let currUser;
    try {
        currUser = await getUserFromDb()
    } catch (error) {
        console.log(error);

        currUser = null
    }

    try {
        if (currUser) {
            return prisma.user.findMany({
                where: {
                    AND: [
                        {
                            NOT: {
                                id: currUser.id
                            } 
                        },
                        {
                            NOT: {
                                followedBy: {
                                    some: {
                                        followerId: currUser.id
                                    }
                                }
                            }
                        },
                        {
                            NOT: {
                                blocking: {
                                    some: {
                                        blockedId: currUser.id
                                    }
                                }
                            }
                        }
                    ]
                },
                include:{
                    stream: {
                        select:{
                            isLive:true
                        }
                    }
                },
                orderBy: {
                    craetedAt: "desc"
                }
            })
        } else {
            return prisma.user.findMany({
                include:{
                    stream: {
                        select:{
                            isLive: true
                        }
                    }
                },
                orderBy: {
                    craetedAt: "desc"
                }
            })
        }



    } catch (error) {
        console.log(error);

        throw new Error('Something went wrong fetching all recommended users!')
    }
}