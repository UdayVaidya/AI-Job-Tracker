import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  if(!user) {
    navigate('/')
  }

  return (
    <div className="text-red-400 mx-auto p-4">DashBoard</div>
  )
}

export default DashBoard