import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LeaderBoard from '@/pages/leaderboard'
import SignIn from '@/pages/sign-in'
import ScreenGameOver from '@/pages/screen-game-over/screen-game-over'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/leaderboard' element={<LeaderBoard />} />
        <Route path='/game-over' element={<ScreenGameOver />} />
      </Routes>
    </Router>
  )
}

export default App
