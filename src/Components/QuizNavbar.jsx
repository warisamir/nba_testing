import React from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';

const QuizNavbar = ({ className }) => {
  return (
    <nav className={`flex justify-center items-center px-3 py-3 relative ${className}`}>
      {/* <Link to="/" className='bg-gray-100 text-slate-600 p-1.5 rounded-lg absolute left-2'>
        <FaChevronLeft />
      </Link> */}

      <h1 className='text-lg font-bold'>Pixel Quiz</h1>

      {/* <div className='bg-gray-100 text-slate-600 p-1.5 flex gap-1 rounded-lg absolute right-2'>
        <MdLogout color='red' />
        <p className='text-xs font-medium'>Sign Out</p>
      </div> */}
    </nav>
  )
}

export default QuizNavbar