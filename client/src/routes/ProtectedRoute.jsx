import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'

const ProtectedRoute = () => {
  const { isAuth } = useAuthStore()
  return isAuth ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute
