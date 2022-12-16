import React, { ReactNode } from 'react'
import useAuth from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'


interface IProps {
  protect?: boolean
  redirectTo: string
}

export default function ProtectRoute({ redirectTo, protect = false }: IProps) {
  const canRender: boolean = useAuth()
  if (protect) {
    return canRender ? <Outlet /> : <Navigate to={redirectTo} />
  } else {
    return canRender ? <Navigate to={redirectTo} /> : <Outlet />
  }
}
