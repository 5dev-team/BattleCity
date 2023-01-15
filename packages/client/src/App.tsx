import React, { useEffect } from 'react'
import { Router } from './router'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchUser } from '@/store/slices/auth'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.auth.user)
  useEffect(() => {
    if (!user) {
      dispatch(fetchUser())
    }
  }, [])

  return <Router />
}

export default App
