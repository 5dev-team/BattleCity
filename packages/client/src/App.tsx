import React from 'react'
import { Router } from './router'
import { Routes } from 'react-router'
import { setupStore } from '@/store'
import { Provider } from 'react-redux'
// import { useAppDispatch, useAppSelector } from '@/hooks/redux'
// import { fetchUser } from '@/store/slices/auth'

const store = setupStore()

const App: React.FC = () => {
  // const dispatch = useAppDispatch()
  //
  // const user = useAppSelector(state => state.auth.user)
  // useEffect(() => {
  //   if (!user) {
  //     dispatch(fetchUser())
  //   }
  // }, [])

  return <Router />
}

export default App
