
import { Wrapper } from './wrapper'
import ToggleSidebar from './toggle-sidebar'
import { Navigation } from './navigation'


const Sidebar = async () => {
  return (
    <Wrapper>
      <ToggleSidebar />
      <div className='space-y-6'>
        <Navigation />
      </div>
    </Wrapper>
  )
}

export default Sidebar



export const SidebarSkeleton = () => {
  return (
    <aside className='fixed left-0 w-[70px] md:w-60 h-full z-50 bg-slate-100 dark:bg-slate-900'>

    </aside>
  )
}