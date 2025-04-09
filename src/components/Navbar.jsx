import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-violet-900 flex justify-between items-center text-white h-[8vh]">
      <div className="logo p-4">
        <h1 className="text-2xl sm:text-4xl font-bold mx-4 sm:mx-8">iTask</h1>
      </div>
      <div className="nav-links p-3 sm:p-6">
        <ul className="flex gap-4 sm:gap-8 mx-4 sm:mx-8 items-center">
          <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
          <li className='cursor-pointer hover:font-bold transition-all duration-100'>Your Tasks</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar