import { useRef, useState } from 'react';

export default function RealLifeDemo(){
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(0); // start silent
  const [muted, setMuted] = useState(true);

  const changeVolume = (delta) => {
    if (!videoRef.current) return;
    let next = Math.min(1, Math.max(0, Math.round((volume + delta) * 10) / 10));
    setVolume(next);
    try {
      videoRef.current.muted = next === 0;
      setMuted(next === 0);
      videoRef.current.volume = next;
      if (videoRef.current.paused) videoRef.current.play().catch(() => {});
    } catch {}
  };

  return (
    <section id="demo" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
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
            <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
              <button
                type="button"
                aria-label={muted || volume === 0 ? 'Unmute' : 'Mute'}
                className="text-white hover:text-cyan-300"
                onClick={() => {
                  if (!videoRef.current) return;
                  if (muted || volume === 0) {
                    changeVolume(0.3);
                  } else {
                    changeVolume(-volume);
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H3v6h3l5 4V5z"/>
                  {!muted && volume > 0 && (<path d="M15.54 8.46a5 5 0 010 7.07M17.65 6.35a8 8 0 010 11.31"/>) }
                </svg>
              </button>
              <button type="button" aria-label="Volume down" className="text-white hover:text-cyan-300" onClick={() => changeVolume(-0.1)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <div className="text-xs tabular-nums w-8 text-center">{Math.round(volume*100)}</div>
              <button type="button" aria-label="Volume up" className="text-white hover:text-cyan-300" onClick={() => changeVolume(0.1)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
