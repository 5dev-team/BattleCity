import useAuth from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'


interface IProps {
  redirectTo?: string
}

 const ProtectRoute = ({redirectTo = '/sing-in'}: IProps) => {
  const isAuth: boolean = useAuth()
  if (!isAuth) {
    return <Navigate to={redirectTo} replace />
  }
  
  return <Outlet/>
}
export default ProtectRoute
