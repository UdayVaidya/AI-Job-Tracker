import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashBoard from './pages/DashBoard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-800">
          <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
