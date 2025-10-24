import { useRef, useState } from 'react';

export default function Specifications(){
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(0); // start silent for autoplay compliance
  const [muted, setMuted] = useState(true);

  const changeVolume = (delta) => {
    if (!videoRef.current) return;
    let next = Math.min(1, Math.max(0, Math.round((volume + delta) * 10) / 10));
    setVolume(next);
    try {
      videoRef.current.muted = next === 0;
      setMuted(next === 0);
      videoRef.current.volume = next;
      // Ensure playing when user interacts
      if (videoRef.current.paused) videoRef.current.play().catch(() => {});
    } catch {}
  };

  return (
    <section id="specs" className="py-20 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">How Does It Work?</h2>

        {/* Two column layout: Text on left, PCB on right */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="flex-1">
            <p className="text-lg mb-4">
              It divides the <strong>FOV into a 9 grid</strong> (labeled 1 to 9 from top-left to bottom-right) and tells the user exactly what the object is and where it is, using <strong>audio cues</strong> and how far away it is, using <strong>haptic feedback</strong>.
            </p>
            <p className="text-cyan-400 text-xl font-semibold mb-2">{'{Object} {Grid Number}'}</p>
            <p className="text-lg">Distance - haptics (z)</p>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="bg-white/10 p-3 rounded-lg shadow-lg ring-2 ring-cyan-500">
              <img src="/inside.png" alt="Percevia internal layout" className="rounded-md w-80 h-auto block" />
              <div className="text-sm text-cyan-200 mt-2 text-center">Inside view</div>
            </div>

            <div className="bg-white/5 p-3 rounded-lg shadow-lg">
              <img src="/pcb.png" alt="Percevia PCB Design" className="rounded-md w-80 h-auto block" />
              <div className="text-sm text-cyan-200 mt-2 text-center">PCB layout</div>
            </div>
          </div>
        </div>

        {/* Street Demo Video with volume controls */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={muted}
                playsInline
                className="rounded-lg shadow-lg max-w-full h-auto"
                style={{ maxHeight: '500px' }}
              >
                <source src="/streetdemo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Controls rendered below the street demo to avoid overlaying the video */}
              <div className="mt-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  aria-label={muted || volume === 0 ? 'Unmute' : 'Mute'}
                  className="bg-black/60 text-white px-3 py-2 rounded-full"
                  onClick={() => {
                    if (!videoRef.current) return;
                    if (muted || volume === 0) {
                      changeVolume(0.3);
                    } else {
                      changeVolume(-volume);
                    }
                  }}
                >
                  {muted || volume === 0 ? 'Unmute' : 'Mute'}
                </button>

                <button type="button" aria-label="Volume down" className="bg-black/60 text-white px-3 py-2 rounded-full" onClick={() => changeVolume(-0.1)}>- Vol</button>
                <div className="text-xs tabular-nums w-8 text-center">{Math.round(volume*100)}</div>
                <button type="button" aria-label="Volume up" className="bg-black/60 text-white px-3 py-2 rounded-full" onClick={() => changeVolume(0.1)}>+ Vol</button>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-6 text-center">Key Features</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {title: 'Object Detection & 9-Grid Spatial Awareness', text: 'YOLOv11 + YOLO-E identifies 235+ objects. 3x3 grid with audio cues for precise location.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
            )},
            {title: 'Scene Understanding', text: 'Press a button for full audio summary of surroundings. BLIP-based descriptions in under 2 seconds.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
            )},
            {title: 'Depth Perception & Collision Avoidance', text: 'Time-of-Flight LiDAR (up to 8m, 60Hz) with adaptive haptic feedback.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="M5 12h14"/></svg>
            )},
            {title: 'Facial Recognition', text: 'Register loved ones — glasses announce them by name.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            )},
            {title: 'Find Misplaced Items', text: 'Ask "Where is my bottle?" and receive verbal directions.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            )},
            {title: 'Interactive Voice Assistant', text: 'Ask follow-up questions like "What is on the table?"', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22"/><rect x="8" y="4" width="8" height="12" rx="4"/></svg>
            )},
            {title: 'Custom Object Learning', text: 'Point, name, and the AI learns in seconds using YOLO‑E.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
            )},
            {title: 'Privacy-First & Offline', text: 'All processing happens locally on your smartphone.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
            )},
            {title: 'Text & Currency Recognition', text: 'Read menus, signs, documents; identify currency.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h10M4 17h7"/></svg>
            )},
            {title: 'Video Calls & Music', text: 'Make/receive calls; listen to music via integrated audio.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M12 7V3l8 4"/></svg>
            )},
            {title: '12-Hour Battery Life', text: '1500mAh smart frame design for all‑day use.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="18" height="10" rx="2" ry="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>
            )},
            {title: 'Affordable Pricing', text: 'Manufacturing ≈ ₹6000; retail target ₹10–15k.', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V7a2 2 0 0 0-2-2h-5"/><path d="M4 7v6a2 2 0 0 0 2 2h5"/><path d="M20 12a8 8 0 1 1-16 0"/></svg>
            )},
          ].map((s, i) => (
            <li key={i} className="bg-white/5 p-6 rounded-lg shadow-sm flex gap-3">
              <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 flex-shrink-0">{s.icon}</span>
              <div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-gray-200">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
