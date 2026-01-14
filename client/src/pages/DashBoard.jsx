import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const DashBoard = () => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto p-4">
      <Navbar />
      <h2 className="font-semibold mt-4 text-white text-center text-4xl">
        Welcome back, <span className="text-emerald-500">{user.name}</span>
      </h2>
    </div>
  )
}

export default DashBoard
