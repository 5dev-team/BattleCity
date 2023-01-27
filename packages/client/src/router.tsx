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
import ProtectRoute from '@/components/protect-route'
import ProtectRouteForSignIn from '@/components/protect-route-for-sign-in'
import Comments from '@/pages/comments'

export enum RoutePaths {
  SIGNIN = '/sign-in',
  SIGNUP = '/sign-up',
  LEADERBOARD = '/leaderboard',
  GAME = '/',
  ERROR404 = '/404',
  ERROR500 = '/500',
  FORUM = '/forum',
  PROFILE = '/profile',
  COMMENTS = '/forum/:title',
}

export const Router = () => {
  return (
    <Routes>
      <Route
        element={<ProtectRouteForSignIn redirectTo={RoutePaths.GAME} />}
        loader={async () => Promise.resolve(true)}>
        <Route path={RoutePaths.SIGNIN} element={<SignIn />} />
        <Route path={RoutePaths.SIGNUP} element={<SignUp />} />
      </Route>
      <Route element={<ProtectRoute redirectTo={RoutePaths.SIGNIN} />}>
        <Route element={<Leaderboard />} path={RoutePaths.LEADERBOARD} />
        <Route element={<FullScreen />}>
          <Route path={RoutePaths.GAME} element={<Game />} />
        </Route>
        <Route path={RoutePaths.FORUM} element={<Forum />} />
        <Route element={<Forum />} path={RoutePaths.FORUM} />
        <Route path={RoutePaths.COMMENTS} element={<Comments />} />
        <Route element={<Profile />} path={RoutePaths.PROFILE} />
        <Route path={RoutePaths.PROFILE} element={<Profile />} />
      </Route>
      <Route path='/offline' element={<Offline />} />
      <Route path={RoutePaths.ERROR404} element={<Error404 />} />
      <Route path={RoutePaths.ERROR500} element={<Error500 />} />
      <Route path='*' element={<Navigate to={RoutePaths.ERROR404} replace />} />
    </Routes>
  )
}
