import React, { useEffect, useState } from 'react'
import { unstable_HistoryRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LeaderBoard from '@/pages/leaderboard'
import SignIn from '@/pages/sign-in'
import Game from '@/pages/game'
import Error404 from '@/pages/error404'
import Error500 from '@/pages/error500'
import Forum from '@/pages/forum'
import SignUp from '@/pages/sign-up/sign-up'
import Profile from '@/pages/profile'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchUser } from '@/store/slices/auth'
import history from '@/utils/history'

export enum RoutePaths {
  SIGNIN = '/sign-in',
  SIGNUP = '/sign-up',
  LEADERBOARD = '/leaderboard',
  GAME = '/',
  ERROR404 = '/404',
  ERROR500 = '/500',
  FORUM = '/forum',
  PROFILE = '/profile'
}

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  console.log(navigator.onLine)
  const [online, setOnline] = useState(true)
  
  const user = useAppSelector((state) => state.auth.user)
  window.addEventListener('offline', () => {
    console.log('offline')
    setOnline(true)
  })
  
  window.addEventListener('online', () => {
    console.log('online')
    setOnline(false)
  })
  
  if (navigator.onLine) {
    console.log('event online')
    // setOnline(true)
  } else {
    console.log('event offline')
    // setOnline(false)
  }
  
  useEffect(() => {
    
    if (!user) {
      dispatch(fetchUser())
    }
  }, [])
  console.log(online)
  return (
    
    
    <Router history={history}>
      {!online && <>qweqweqew</>}
      <Routes>
        <Route path={RoutePaths.SIGNIN} element={<SignIn />} />
        <Route path={RoutePaths.SIGNUP} element={<SignUp />} />
        <Route path={RoutePaths.LEADERBOARD} element={<LeaderBoard />} />
        <Route path={RoutePaths.GAME} element={<Game />} />
        <Route path={RoutePaths.ERROR404} element={<Error404 />} />
        <Route path={RoutePaths.ERROR500} element={<Error500 />} />
        <Route path={RoutePaths.FORUM} element={<Forum />} />
        <Route path={RoutePaths.PROFILE} element={<Profile />} />
        <Route path='*' element={<Navigate to={RoutePaths.ERROR404} replace />} />
      </Routes>
    </Router>
  )
}

export default App
