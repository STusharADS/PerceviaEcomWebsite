import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Hero({ timeLeft }) {
  const videoRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (!videoRef.current) return;
    try {
      if (inView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } catch (err) {
      // autoplay might be blocked by browser — that's okay
      console.warn('Video play/pause error', err);
    }
  }, [inView]);

  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
        >
          <source src="/hero.mp4" type="video/mp4" />
          {/* Put your MP4 file at client/public/hero.mp4. A poster image can be added for fallback. */}
        </video>
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Neon tube percevia like Apple hello */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="neon-tube"
          style={{ marginBottom: '24px' }}
        >
          percevia
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base mb-6 max-w-xl italic text-white/85 leading-relaxed"
          style={{ maxWidth: '600px' }}
        >
          "The best technology resonates with our biology, turning human nature into the ultimate feature."
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-4 gap-4 text-center mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{timeLeft.days}</div>
            <div className="text-sm">Days</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{timeLeft.hours}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{timeLeft.minutes}</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold">{timeLeft.seconds}</div>
            <div className="text-sm">Seconds</div>
          </div>
        </motion.div>

        {/* (CTA removed from flow) - replaced by absolute overlay button below */}
      </div>

      {/* Absolute glass CTA placed on top of the video (Apple-like liquid glass) */}
      <motion.a
        href="#pre-order"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        aria-label="Pre-order Now"
        className="absolute left-1/2 bottom-20 z-20 -translate-x-1/2 inline-flex items-center justify-center px-10 py-4 rounded-full text-lg font-semibold text-white bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_20px_60px_rgba(0,211,242,0.08)] transform-gpu transition-transform duration-200 hover:scale-105"
        style={{ minWidth: '220px' }}
      >
        <span className="relative z-10 text-white">Pre-order Now</span>
        <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.12),rgba(255,255,255,0.04))] opacity-10 group-hover:opacity-20 pointer-events-none" />
      </motion.a>
    </div>
  );
}