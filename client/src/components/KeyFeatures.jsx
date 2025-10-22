export default function KeyFeatures(){
  const items = [
    {title: 'Object Detection & 9-Grid Spatial Awareness', text: 'YOLOv11 + YOLO‑E identifies 235+ objects. 3x3 grid with audio cues for precise location.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
    )},
    {title: 'Scene Understanding', text: 'Press a button for full audio summary of surroundings. BLIP‑based descriptions in under 2 seconds.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
    )},
    {title: 'Depth Perception & Collision Avoidance', text: 'Time‑of‑Flight LiDAR (up to 8m, 60Hz) with adaptive haptic feedback.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="M5 12h14"/></svg>
    )},
    {title: 'Facial Recognition', text: 'Register loved ones — glasses announce them by name.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )},
    {title: 'Find Misplaced Items', text: 'Ask "Where is my bottle?" and receive verbal directions.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    )},
    {title: 'Interactive Voice Assistant', text: 'Ask follow‑up questions like "What is on the table?"', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22"/><rect x="8" y="4" width="8" height="12" rx="4"/></svg>
    )},
    {title: 'Custom Object Learning', text: 'Point, name, and the AI learns in seconds using YOLO‑E.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
    )},
    {title: 'Privacy‑First & Offline', text: 'All processing happens locally on your smartphone.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
    )},
    {title: 'Text & Currency Recognition', text: 'Read menus, signs, documents; identify currency.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h10M4 17h7"/></svg>
    )},
    {title: 'Video Calls & Music', text: 'Make/receive calls; listen to music via integrated audio.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M12 7V3l8 4"/></svg>
    )},
    {title: '12‑Hour Battery Life', text: '1500mAh smart frame design for all‑day use.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="18" height="10" rx="2" ry="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>
    )},
    {title: 'Affordable Pricing', text: 'Manufacturing ≈ ₹6000; retail target ₹10–15k.', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V7a2 2 0 0 0-2-2h-5"/><path d="M4 7v6a2 2 0 0 0 2 2h5"/><path d="M20 12a8 8 0 1 1-16 0"/></svg>
    )},
  ]

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 heading-accent neon">Key Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((s, i) => (
            <li key={i} className="glass-card p-6 shadow-sm flex gap-3">
              <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 flex-shrink-0">{s.icon}</span>
              <div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm" style={{color:'var(--muted)'}}>{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
