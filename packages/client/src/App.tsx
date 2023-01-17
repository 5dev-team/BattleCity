import React from 'react'
import {
  unstable_HistoryRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import FullScreen from '@/components/full-screen/full-screen'
import Leaderboard from '@/pages/leaderboard'
import SignIn from '@/pages/sign-in'
import Game from '@/pages/game'
import Error404 from '@/pages/error404'
import Error500 from '@/pages/error500'
import Forum from '@/pages/forum'
import SignUp from '@/pages/sign-up/sign-up'
import Profile from '@/pages/profile'
import ProtectRoute from '@/components/protect-route'
import { useAppDispatch } from '@/hooks/redux'
import { fetchUser } from '@/store/slices/auth'
import history from '@/utils/history'
import Offline from '@/pages/offline'
import ProtectRouteForSignIn from '@/components/protect-route-for-sign-in'
import { interceptor } from '@/api/request'
import useEffectOnce from './utils/useEffectOnce'

export enum RoutePaths {
  SIGNIN = '/sign-in',
  SIGNUP = '/sign-up',
  LEADERBOARD = '/leaderboard',
  GAME = '/',
  ERROR404 = '/404',
  ERROR500 = '/500',
  FORUM = '/forum',
  PROFILE = '/profile',
}

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffectOnce(() => {
    dispatch(interceptor)
    dispatch(fetchUser())
  })

  return (
    <Router history={history}>
      <Routes>
        <Route element={<ProtectRouteForSignIn redirectTo={RoutePaths.GAME}/>}>
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
          <Route element={<Profile />} path={RoutePaths.PROFILE} />
          <Route path={RoutePaths.PROFILE} element={<Profile />} />
        </Route>
        <Route path="/offline" element={<Offline />} />
        <Route path={RoutePaths.ERROR404} element={<Error404 />} />
        <Route path={RoutePaths.ERROR500} element={<Error500 />} />
        <Route
          path="*"
          element={<Navigate to={RoutePaths.ERROR404} replace />}
        />
      </Routes>
    </Router>
  )
}

export default App
