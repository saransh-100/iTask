import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-violet-900 flex justify-between items-center text-white h-[8vh]">
      <div className="logo p-4">
        <h1 className="text-4xl font-bold mx-8">iTask</h1>
      </div>
      <div className="nav-links p-4">
        <ul className="flex gap-8 mx-8">
          <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
          <li className='cursor-pointer hover:font-bold transition-all duration-100'>Your Tasks</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar