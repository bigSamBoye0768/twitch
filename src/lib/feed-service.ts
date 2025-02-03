import { getUserFromDb } from "./auth-service";
import prisma from "./prisma";

export const getStreams = async () => {
    // await new Promise(resolve => setTimeout(resolve, 5000))
    let userId;
    try {
        const currUser = await getUserFromDb()
        userId = currUser.id
    } catch (error) {
        console.log(error);
        userId = null
    }

    let streams = []

    if (userId) {
        streams = await prisma.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            }
                        }
                    }
                }
            },
            include: {
                user: true
            },
            orderBy: [
                {
                    isLive: "desc",
                },
                {
                    updatedAt: "desc"
                },
            ]
        })
    } else {
        streams = await prisma.stream.findMany({
            include: {
                user: true
            },
            orderBy: [
                {
                    isLive: "desc",
                },
                {
                    updatedAt: "desc"
                },
            ]
        })
    }

    return streams
}