import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { DeletedObjectJSON, UserJSON, WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local as CLERK_WEBHOOK_SECRET')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload)

    let evt: WebhookEvent


    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.log('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }



    const eventType = evt.type


    if (eventType === 'user.created') {
        const userData: UserJSON = evt.data
        try {
            await prisma.user.create({
                data: {
                    username: userData.username,
                    externalUserId: userData.id,
                    imgUrl: userData.image_url,
                    stream: {
                        create:{
                            name: userData.username || ""
                        }
                    }
                }
            })

            console.log("User created successfully");
            return NextResponse.json({ message: "OK" });
        } catch (error) {
            console.log("Error creating user:", error);
            return new Response("Error occurred while creating user", { status: 500 });
        }

    }

    if(eventType === 'user.updated'){
        const userData: UserJSON = evt.data

        try {
            const currentUser = await prisma.user.findUnique({
                where: {
                    externalUserId: userData.id,
                }
            })

            if(!currentUser) return new Response("User not found", { status: 404 });


            await prisma.user.update({
                where: {
                    externalUserId: userData.id
                },
                data: {
                    username: userData.username,
                    imgUrl: userData.image_url
                }
            })

            console.log("User updated successfully");
            return NextResponse.json({ message: "OK" });
        } catch (error) {
            console.error("Error updating user:", error);
            return new Response("Error occurred while updating user", { status: 500 });
        }

    }


    if(eventType === 'user.deleted'){
        const userData: DeletedObjectJSON = evt.data

        try {

            await prisma.user.delete({
                where: {
                    externalUserId: userData.id
                }
            })

            console.log("User deleted successfully");
            return NextResponse.json({ message: "OK" });
        } catch (error) {
            console.error("Error deleting user:", error);
            return new Response("Error occurred while deleting user", { status: 500 });
        }

    }

    return new Response('Webhook received', { status: 200 })
}