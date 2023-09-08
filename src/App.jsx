import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import HomeTemplate from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomeTemplate />}/>
      <Route path="/:dashID" element={<HomeTemplate />}/>
      </Routes>
    </Router>
  )
}

export default App
