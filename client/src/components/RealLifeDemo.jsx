import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function RealLifeDemo(){
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(0.6); // sensible default
  const [muted, setMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: false });

  // Play audio when in view, pause when out of view
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      try {
        // try to play with sound
        v.muted = false;
        v.volume = volume;
        v.play().then(() => {
          setMuted(false);
        }).catch(() => {
          // autoplay with sound blocked: fall back to muted autoplay
          try { v.muted = true; v.play().catch(()=>{}); setMuted(true); } catch{}
        });
      } catch (e) {
        // ignore
      }
    } else {
      try { v.pause(); } catch {}
    }
  }, [inView]);

  const changeVolume = (next) => {
    if (!videoRef.current) return;
    const clamped = Math.min(1, Math.max(0, Math.round(next * 10) / 10));
    setVolume(clamped);
    try {
      videoRef.current.muted = clamped === 0;
      setMuted(clamped === 0);
      videoRef.current.volume = clamped;
      if (videoRef.current.paused) videoRef.current.play().catch(() => {});
    } catch {}
  };

  // show controls on hover (desktop) or always on small screens
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouch) setShowControls(true);
  }, []);

  return (
    <section id="demo" className="py-20 px-6 bg-[#0D0D0D]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center">
          <div className="relative">
            <div onMouseEnter={() => setShowControls(true)} onMouseLeave={() => { if (!(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0))) setShowControls(false); }}>
            <video
              ref={videoRef}
              loop
              muted={muted}
              playsInline
              controls={showControls}
              className="rounded-lg shadow-lg max-w-full h-auto"
              style={{ maxHeight: '500px' }}
            >
              <source src="/streetdemo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            </div>
            {/* Controls are available via native video controls (shown on hover or on touch devices) */}
          </div>
        </div>
      </div>
    </section>
  )
}
