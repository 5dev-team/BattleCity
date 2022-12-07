import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, redirect } from 'react-router-dom'
import LeaderBoard from '@/pages/leaderboard'
import SignIn from '@/pages/sign-in'
import Game from '@/pages/game'
import Error404 from '@/pages/error404'
import Error500 from '@/pages/error500'
import Forum from '@/pages/forum'
import SignUp from '@/pages/sign-up/sign-up'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchUser } from '@/store/slices/auth'

export enum RoutePaths {
  SIGNIN = '/sign-in',
  SIGNUP = '/sign-up',
  LEADERBOARD = '/leaderboard',
  GAME = '/game',
  ERROR404 = '/404',
  ERROR500 = '/500',
  FORUM = '/forum',
}

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.auth.user)
  useEffect(() => {
    if (!user) {
      dispatch(fetchUser())
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path={RoutePaths.SIGNIN} element={<SignIn />} />
        <Route path={RoutePaths.SIGNUP} element={<SignUp />} />
        <Route path={RoutePaths.LEADERBOARD} element={<LeaderBoard />} />
        <Route path={RoutePaths.GAME} element={<Game />} />
        <Route path={RoutePaths.ERROR404} element={<Error404 />} />
        <Route path={RoutePaths.ERROR500} element={<Error500 />} />
        <Route path={RoutePaths.FORUM} element={<Forum />} />
        <Route path='/' element={<Navigate to={RoutePaths.GAME} replace />} />
        <Route path='*' element={<Navigate to={RoutePaths.ERROR404} replace />} />
      </Routes>
    </Router>
  )
}

export default App
