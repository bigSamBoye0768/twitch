
import { Wrapper } from './wrapper'
import ToggleSidebar from './toggle-sidebar'
import { Recommended, RecommendedSkeleton } from './recommended'
import { getRecommended } from '@/lib/recommended-service'
import { Following, FollowingSkeleton } from './following'
import { getCurrUserFollowings } from '@/lib/follow'


const Sidebar = async () => {
  const users = await getRecommended();
  const following = await getCurrUserFollowings()
  return (
    <Wrapper>
      <ToggleSidebar />
      <div className='space-y-6'>
        <Following data={following}/>
        <Recommended data={users} />
      </div>
    </Wrapper>
  )
}

export default Sidebar



export const SidebarSkeleton = () => {
  return (
    <aside className='fixed left-0 w-[70px] md:w-60 h-full z-50 bg-[#EFEFF1] dark:bg-[#1F1F23]'>
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}