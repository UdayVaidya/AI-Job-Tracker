import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-gray-600 shadow p-4 flex justify-between rounded-2xl sticky top-0 z-50 m-2 mt-2">
        <Link to="/" className="text-2xl font-bold ">AI Job Tracker</Link>
        <div className="flex items-center gap-4">
            <Link to="/login" className="text-white hover:text-gray-800 font-bold">Login</Link>
            <Link to="/register" className="text-white hover:text-gray-800 font-bold">Register</Link>
        </div>
    </div>
  )
}

export default Navbar