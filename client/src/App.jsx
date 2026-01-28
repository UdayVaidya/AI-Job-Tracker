import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashBoard from './pages/DashBoard'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className={`${isDashboard ? 'h-screen' : 'min-h-screen'} breathing-dark-bg p-4  ${isDashboard ? 'dashboard-scrollable' : ''}`}>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/dashboard" element={<ProtectedRoute> <DashBoard /> </ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

function App() {

  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
