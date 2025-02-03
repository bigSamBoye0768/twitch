import { Suspense } from "react"
import { Container } from "./_components/container"
import Navbar from "./_components/navbar"
import Sidebar, { SidebarSkeleton } from "./_components/sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="flex pt-16 h-full">
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default DashboardLayout