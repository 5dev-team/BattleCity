import React, { useEffect } from 'react'
import { unstable_HistoryRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LeaderBoard from '@/pages/leaderboard'
import SignIn from '@/pages/sign-in'
import GameOver from '@/pages/game-over'
import Game from '@/pages/game'
import Error404 from '@/pages/error404'
import Error500 from '@/pages/error500'
import Forum from '@/pages/forum'
import SignUp from '@/pages/sign-up/sign-up'
import Profile from '@/pages/profile'
import ProtectRoute from '@/components/protect-route/ProtectRoute'
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
  GAMEOVER = '/game-over',
  PROFILE = '/profile'
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
    <Router history={history}>
      <Routes>
        <Route path={RoutePaths.GAMEOVER} element={<GameOver />} />
        <Route path={RoutePaths.SIGNIN} element={<SignIn />} />
        <Route path={RoutePaths.SIGNUP} element={<SignUp />} />
        <Route element={<ProtectRoute redirectTo={RoutePaths.SIGNIN} />}>
          <Route element={<LeaderBoard />} path={RoutePaths.LEADERBOARD} />
          <Route element={<Game />} path={RoutePaths.GAME} />
          <Route element={<Forum />} path={RoutePaths.FORUM} />
          <Route element={<Profile />} path={RoutePaths.PROFILE} />
        </Route>
        <Route path={RoutePaths.ERROR500} element={<Error500 />} />
        <Route path={RoutePaths.ERROR404} element={<Error404 />} />
        <Route path='*' element={<Navigate to={RoutePaths.ERROR404} replace />} />
      </Routes>
    </Router>
  )
}

export default App
