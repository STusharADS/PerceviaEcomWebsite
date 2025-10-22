import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import KeyFeatures from './components/KeyFeatures'
import ProductSpecs from './components/ProductSpecs'
import RealLifeDemo from './components/RealLifeDemo'
import Download from './components/Download'
import FAQ from './components/FAQ'
import PreOrder from './components/PreOrder'

function App() {
  const bgAudioRef = useRef(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [launchDate] = useState(new Date('2025-11-05')) // 14 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Try autoplaying background audio (may be blocked until user interacts)
    const tryPlay = async () => {
      if (!bgAudioRef.current) return
      try {
        bgAudioRef.current.volume = 0.3
        await bgAudioRef.current.play()
        setAudioEnabled(true)
        setAudioError(false)
      } catch (e) {
        setAudioEnabled(false)
        setAudioError(true)
      }
    }
    tryPlay()

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
        {/* Global background audio using hero.mp4 (audio track) */}
  <audio ref={bgAudioRef} src="/hero.mp4" loop preload="auto" muted={false} />
        {!audioEnabled && audioError && (
          <button
            onClick={async () => {
              try {
                if (bgAudioRef.current) {
                  bgAudioRef.current.volume = 0.3
                  await bgAudioRef.current.play()
                  setAudioEnabled(true)
                  setAudioError(false)
                }
              } catch {}
            }}
            className="fixed bottom-4 right-4 z-50 bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-200"
            aria-label="Enable background sound"
          >
            Enable sound
          </button>
        )}
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero timeLeft={timeLeft} />
              <About />
              <KeyFeatures />
              <ProductSpecs />
              <RealLifeDemo />
              <Download />
              <FAQ />
              <PreOrder />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
