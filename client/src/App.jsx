import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PreOrder from './components/PreOrder'
import Specifications from './components/Specifications'
import FAQ from './components/FAQ'
import Download from './components/Download'
import About from './components/About'

function App() {
  const [launchDate] = useState(new Date('2025-11-05')) // 14 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = launchDate - now

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [launchDate])

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero timeLeft={timeLeft} />
              <About />
              <PreOrder />
              <Specifications />
              <FAQ />
              <Download />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
