import { Routes, Route, Navigate } from 'react-router-dom'
import Offline from '@/pages/offline'
import SignIn from '@/pages/sign-in'
import SignUp from '@/pages/sign-up'
import FullScreen from '@/components/full-screen/full-screen'
import Game from '@/pages/game'
import Leaderboard from '@/pages/leaderboard'
import Error404 from '@/pages/error404'
import Error500 from '@/pages/error500'
import Forum from '@/pages/forum'
import Profile from '@/pages/profile'

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

export const Router = () => {
  return (
    <Routes>
      <Route path='/offline' element={<Offline />} />
      <Route path={RoutePaths.SIGNIN} element={<SignIn />} />
      <Route path={RoutePaths.SIGNUP} element={<SignUp />} />
      <Route element={<FullScreen/>}>
        <Route path={RoutePaths.GAME} element={<Game />} />
      </Route>
      <Route path={RoutePaths.LEADERBOARD} element={<Leaderboard />} />
      <Route path={RoutePaths.ERROR404} element={<Error404 />} />
      <Route path={RoutePaths.ERROR500} element={<Error500 />} />
      <Route path={RoutePaths.FORUM} element={<Forum />} />
      <Route path={RoutePaths.PROFILE} element={<Profile />} />
      <Route path='*' element={<Navigate to={RoutePaths.ERROR404} replace />} />
    </Routes>
  )
}
