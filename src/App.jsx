import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Home, WelcomePage, RegisterPage, LogInPage } from './routes'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<WelcomePage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/login" element={<LogInPage />}/>
      <Route path="/:dashID" element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
