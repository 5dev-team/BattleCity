import useAuth from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

interface IProps {
  redirectTo?: string
}

 const ProtectRoute = ({redirectTo = '/sing-in'}: IProps) => {
  const isAuth: boolean | null  = useAuth()
  if (isAuth !== null && !isAuth) {
    return <Navigate to={redirectTo} replace />
  }
  return <Outlet/>
}
export default ProtectRoute
