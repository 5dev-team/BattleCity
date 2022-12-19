import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from '@/pages/sign-in'
import LeaderBoard from '@/pages/leaderboard'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/leaderboard' element={<LeaderBoard />} />
      </Routes>
    </Router>
  )
}

export default App
