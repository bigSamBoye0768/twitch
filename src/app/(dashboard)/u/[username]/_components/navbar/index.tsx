import React from 'react'
import { Logo } from './logo'
import { Actions } from './actions'

const Navbar = () => {
  return (
    <nav className='w-full gap-2 fixed top-0 left-0 right-0 px-2 lg:px-4 h-[--navbar-height] z-50 flex items-center bg-white justify-between dark:bg-[#18181B] shadow-md'>
      <Logo />
      <Actions />
    </nav>
  )
}

export default Navbar