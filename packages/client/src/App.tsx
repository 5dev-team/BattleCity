import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, unstable_HistoryRouter as Router } from 'react-router-dom'
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
import Offline from '@/pages/offline'

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
  const [online, setOnline] = useState(true)
  
  const user = useAppSelector((state) => state.auth.user)
  window.addEventListener('offline', () => {
    console.log('offline')
    setOnline(false)
  })

  window.addEventListener('online', () => {
    console.log('online')
    setOnline(true)
  })
  
  // if (navigator.onLine) {
  //   console.log('event online')
  //   if (!online) {
  //     setOnline(true)
  //   }
  // } else {
  //   console.log('event offline')
  //   if (online) {
  //     setOnline(false)
  //   }
  // }
  
  useEffect(() => {
    
    if (!user) {
      dispatch(fetchUser())
    }
  }, [])
  
  // if (!online) {
  //
  //   return (
  //     <>
  //     asdasdasd</>
  //   )
  // }
  
  console.log(online)
  return (
    <Router history={history}>
      <Routes>
        {!online && (
          <>
            <Route path='/sign-in' element={!online && <Navigate to='/offline' />} />
            <Route path='/offline' element={<Offline />} />
            <Route path={RoutePaths.GAME} element={<Game />} />
            <Route path='*' element={<Navigate to={RoutePaths.ERROR404} replace />} />
            <Route path={RoutePaths.ERROR404} element={<Error404 />} />
          </>

        )}
        {online && (
          <>
            <Route path={RoutePaths.SIGNIN} element={<SignIn />} />
            <Route path={RoutePaths.SIGNUP} element={<SignUp />} />
            <Route path={RoutePaths.LEADERBOARD} element={<LeaderBoard />} />
            <Route path={RoutePaths.GAME} element={<Game />} />
            <Route path={RoutePaths.ERROR404} element={<Error404 />} />
            <Route path={RoutePaths.ERROR500} element={<Error500 />} />
            <Route path={RoutePaths.FORUM} element={<Forum />} />
            <Route path={RoutePaths.PROFILE} element={<Profile />} />
            <Route path='*' element={<Navigate to={RoutePaths.ERROR404} replace />} />
          </>

        )}

      </Routes>
    </Router>
  )
}

export default App
