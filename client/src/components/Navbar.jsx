import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-gray-600 shadow p-4 flex justify-between rounded-2xl sticky top-2 z-50 ">
      <Link 
        to="/" 
        className="text-2xl font-bold text-white hover:text-gray-800 transition-all duration-200"
      >
        AI Job Tracker
      </Link>
      <div className="flex gap-4 items-center">
        {!user && (
          <>
            <Link 
              to="/" 
              className="text-white hover:text-gray-800 font-bold transition-all duration-200"
            >
              Login
            </Link>

            <Link 
              to="/register" 
              className="text-white hover:text-gray-800 font-bold transition-all duration-200"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="text-white animate-pulse">Hello, {user.name.split(" ")[0]}</span>
            
            <button 
              onClick={logout}
              className="bg-red-500 hover:bg-white hover:text-red-500 transition-all duration-300 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
