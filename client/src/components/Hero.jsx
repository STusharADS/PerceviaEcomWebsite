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
        {/* Liquid glass Percevia */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="liquid-glass text-6xl md:text-8xl"
          style={{ marginBottom: '24px' }}
        >
          PERCEVIA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl"
        >
          Experience Reality Enhanced
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

        {/* CTA Button */}
        <motion.a
          href="#pre-order"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors"
        >
          Pre-order Now
        </motion.a>
      </div>
    </div>
  );
}