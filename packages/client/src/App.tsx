import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeaderBoard from '@/pages/leaderboard';
import SignIn from '@/pages/sign-in';
import Game from '@/pages/game';
import Error404 from '@/pages/error404';
import Error500 from '@/pages/error500';
import Forum from '@/pages/forum';

export enum RoutePaths {
  SIGNIN = '/sign-in',
  LEADERBOARD = '/leaderboard',
  GAME = '/game',
  ERROR404 = '/error404',
  ERROR500 = '/error500',
  FORUM = '/forum',
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutePaths.SIGNIN} element={<SignIn />} />
        <Route path={RoutePaths.LEADERBOARD} element={<LeaderBoard />} />
        <Route path={RoutePaths.GAME} element={<Game />} />
        <Route path={RoutePaths.ERROR404} element={<Error404 />} />
        <Route path={RoutePaths.ERROR500} element={<Error500 />} />
        <Route path={RoutePaths.FORUM} element={<Forum />} />
      </Routes>
    </Router>
  )
}

export default App;
