export default function About(){
  return (
  <section id="about" className="py-20 px-6 bg-[#0D0D0D] text-white">
    <div className="max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold mb-6 heading-accent neon text-left">About Percevia</h2>
        <p className="text-lg mb-8">Percevia is an AI-powered smart glasses built specifically for people who are <strong>completely blind</strong>. Simple to use, affordable, and designed for everyday independence.</p>

        <ul className="grid md:grid-cols-2 gap-4">
          <li className="flex items-start gap-3 bg-white/6 p-4 rounded-lg">
            <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">{/* eye icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
            <div>
              <div className="font-semibold">Understands your surroundings</div>
              <p className="text-sm text-gray-200">Objects, faces, text, currency, and more — spoken clearly.</p>
            </div>
          </li>
          <li className="flex items-start gap-3 bg-white/6 p-4 rounded-lg">
            <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">{/* grid icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </span>
            <div>
              <div className="font-semibold">9‑grid spatial guidance</div>
              <p className="text-sm text-gray-200">Precise left/right/top/bottom audio cues for easy navigation.</p>
            </div>
          </li>
          <li className="flex items-start gap-3 bg-white/6 p-4 rounded-lg">
            <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">{/* shield icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
            </span>
            <div>
              <div className="font-semibold">Private & offline</div>
              <p className="text-sm text-gray-200">Processing happens on your phone — no cloud required.</p>
            </div>
          </li>
          <li className="flex items-start gap-3 bg-white/6 p-4 rounded-lg">
            <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">{/* battery icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="18" height="10" rx="2" ry="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>
            </span>
            <div>
              <div className="font-semibold">All‑day battery</div>
              <p className="text-sm text-gray-200">Up to 12 hours on a single charge.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
