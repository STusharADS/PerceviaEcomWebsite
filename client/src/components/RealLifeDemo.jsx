import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function RealLifeDemo(){
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(0); // start silent
  const [muted, setMuted] = useState(true);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: false });

  // Play audio when in view, pause when out of view
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      try {
        // try to unmute and play
        v.muted = false;
        v.volume = volume || 0.5;
        v.play().catch(() => {
          // autoplay may be blocked; keep muted state if blocked
          v.muted = true;
        });
        setMuted(false);
      } catch (e) {
        // ignore
      }
    } else {
      try {
        v.pause();
      } catch {}
    }
  }, [inView]);

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
    <section id="demo" className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center">
          <div className="relative">
            <video
              ref={videoRef}
              loop
              muted={muted}
              playsInline
              className="rounded-lg shadow-lg max-w-full h-auto"
              style={{ maxHeight: '500px' }}
            >
              <source src="/streetdemo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Controls intentionally removed; video auto-plays audio when in view */}
          </div>
        </div>
      </div>
    </section>
  )
}
