import { useEffect, useRef, useState } from 'react'

export default function Download(){
  const [apkExists, setApkExists] = useState(false)
  const videoRef = useRef(null)

  // Increase phone demo audio using Web Audio API (GainNode)
  useEffect(() => {
    let audioCtx
    let source
    let gainNode
    const v = videoRef.current
    if (!v) return
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      source = audioCtx.createMediaElementSource(v)
      gainNode = audioCtx.createGain()
      gainNode.gain.value = 2.0 // amplify ~2x
      source.connect(gainNode).connect(audioCtx.destination)
      // Ensure user gesture to resume audio context if needed
      const resume = () => audioCtx.state === 'suspended' && audioCtx.resume().catch(() => {})
      document.addEventListener('click', resume, { once: true })
    } catch (e) {
      // ignore if WebAudio not supported or cross-origin restrictions block it
    }

    return () => {
      try {
        if (source) source.disconnect()
        if (gainNode) gainNode.disconnect()
        if (audioCtx && audioCtx.close) audioCtx.close().catch(() => {})
      } catch {}
    }
  }, [videoRef])

  useEffect(() => {
    // Check if APK is present in public folder
    const check = async () => {
      try {
        const res = await fetch('/percevia-app.apk', { method: 'HEAD' })
        setApkExists(res.ok)
      } catch (e) {
        setApkExists(false)
      }
    }
    check()
  }, [])

  return (
    <section id="download" className="py-20 px-6 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-13 heading-accent neon text-left">Download App</h2>

          <p className="mb-8">The Android app is built specifically for completely blind people. The app works as a standalone experience, and it can also be paired with the glasses to enhance the glasses’ capabilities.</p>

          <div className="mt-4 flex justify-center">
            {apkExists ? (
              <a href="/percevia-app.apk" download className="relative group overflow-hidden inline-flex items-center justify-center bg-white/10 text-white px-8 py-3 rounded-full font-semibold backdrop-blur-md border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_40px_rgba(0,211,242,0.08)] transform-gpu transition-transform duration-200 hover:scale-105">
                <span className="relative z-10 text-white">Download APK</span>
                <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.12),rgba(255,255,255,0.04))] opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none rounded-full"></span>
              </a>
            ) : (
              <div className="bg-white/6 text-white px-6 py-3 rounded-lg">
                <div className="text-center">APK not found in <code>/public</code>. Please upload <strong>percevia-app.apk</strong> to enable download.</div>
              </div>
            )}
          </div>
          
          {/* QR code for mobile download */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <img src="/qrapp.png" alt="Download Percevia App QR" className="w-40 h-40 " />
            <div className="text-center text-sm text-white/90">Or scan this QR code with your phone to download the Percevia app directly.</div>
          </div>
        </div>

        <div className="flex justify-center">
          <div>
            <video controls playsInline className="rounded-lg shadow-lg block mx-auto" style={{ maxHeight: '500px', width: '240px' }}>
              <source src="/phonedemo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
