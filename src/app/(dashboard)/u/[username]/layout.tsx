import { getCurrUserByUsernameFromDb } from "@/lib/auth-service"
import { redirect } from "next/navigation"
import Navbar from "./_components/navbar"
import Sidebar from "./_components/sidebar"
import { Container } from "./_components/container"


const CreatorLayout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ username: string }> }) => {
    const { username } = await params

    const currUser = await getCurrUserByUsernameFromDb(username)
    if (!currUser) redirect('/')

    return (
        <>
            <Navbar />
            <div className="flex pt-[4.1rem] h-full">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default CreatorLayout