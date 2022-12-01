import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LeaderBoard from '@/pages/leaderboard'
import SignIn from '@/pages/sign-in'
import SignUp from '@/pages/sign-up/sign-up'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/leaderboard' element={<LeaderBoard />} />
      </Routes>
    </Router>
  )
}

export default App
