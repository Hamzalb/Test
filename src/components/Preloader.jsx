import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame
    const start = performance.now()
    const duration = 2800

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      setProgress(Math.floor(eased * 100))
      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 700)
        }, 400)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onComplete])

  const circumference = 2 * Math.PI * 54
  const offset = circumference - (progress / 100) * circumference

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#050510',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 40,
          }}
        >
          {/* Animated ring */}
          <div style={{ position: 'relative', width: 120, height: 120 }}>
            <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(201,162,39,0.1)" strokeWidth="1" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke="url(#goldGrad)" strokeWidth="1.5"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.05s linear' }}
              />
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c9a227" />
                  <stop offset="100%" stopColor="#00e5ff" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                fontWeight: 300,
                color: '#e8e0ff',
              }}>
                {progress}
              </span>
            </div>
          </div>

          {/* Logo */}
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 14,
              letterSpacing: '0.5em',
              color: 'rgba(201,162,39,0.7)',
            }}
          >
            ASHRAMDHI
          </motion.div>

          {/* Bottom line */}
          <div style={{
            position: 'absolute', bottom: 48, left: 0, right: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
          }}>
            <div style={{ height: 1, width: 60, background: 'rgba(201,162,39,0.2)' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(201,162,39,0.4)' }}>
              AWAKENING
            </span>
            <div style={{ height: 1, width: 60, background: 'rgba(201,162,39,0.2)' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
