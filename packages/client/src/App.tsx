import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './pages/sign-in'
import LeaderBoard from './pages/leaderboard'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        // TODO: change path before commit
        <Route path='/' element={<LeaderBoard />} />
      </Routes>
    </Router>
  )
}

export default App
