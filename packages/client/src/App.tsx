import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './pages/sign-in'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
