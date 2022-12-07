import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from '@/pages/sign-in'
import Profile from '@/pages/profile'
import LeaderBoard from '@/pages/leaderboard'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/leaderboard' element={<LeaderBoard />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
