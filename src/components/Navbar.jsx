import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-violet-900 flex justify-between items-center text-white h-[8vh] sm:h-[10vh]">
      <div className="logo px-4 flex items-center gap-2 sm:gap-4">
        <img className="w-10 h-10 sm:w-16 sm:h-16 " src="https://img.icons8.com/nolan/64/task-completed.png" alt="iTask Logo" />
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