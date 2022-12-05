import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LeaderBoard from '@/pages/leaderboard'
import SignIn from '@/pages/sign-in'
import Game from '@/pages/game';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/leaderboard' element={<LeaderBoard />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </Router>
  )
}

export default App
