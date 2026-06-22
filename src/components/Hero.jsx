import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'

const HeroScene = lazy(() => import('../three/HeroScene'))

export default function Hero({ heroImageUrl }) {
  const cursorRef = useRef()

  useEffect(() => {
    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 700,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow" />

      {/* AI-Generated background image */}
      {heroImageUrl && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url(${heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35)',
        }} />
      )}

      {/* Deep gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(42,20,100,0.6) 0%, rgba(5,5,16,0.92) 65%)',
      }} />

      {/* 3D Canvas */}
      <Suspense fallback={null}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <HeroScene />
        </div>
      </Suspense>

      {/* Text content */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', maxWidth: 800,
        padding: '0 24px',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            letterSpacing: '0.4em',
            fontSize: 11,
            color: '#c9a227',
            textTransform: 'uppercase',
            marginBottom: 24,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          ✦ Sacred Sanctuary ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif glow-gold"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(52px, 8vw, 96px)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: '#e8e0ff',
            marginBottom: 12,
          }}
        >
          Awakening
          <br />
          <span className="gold-text" style={{ fontStyle: 'italic' }}>the Inner Light</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            color: 'rgba(232,224,255,0.65)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '24px auto 40px',
            fontWeight: 300,
          }}
        >
          A sacred convergence of ancient wisdom and modern consciousness.
          Discover the eternal path within.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #c9a227, #f0d060)',
              border: 'none',
              borderRadius: 50,
              color: '#050510',
              fontSize: 13,
              letterSpacing: '0.15em',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 40px rgba(201,162,39,0.5)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)'
              e.target.style.boxShadow = '0 0 60px rgba(201,162,39,0.7)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = '0 0 40px rgba(201,162,39,0.5)'
            }}
          >
            BEGIN YOUR JOURNEY
          </button>
          <button
            onClick={() => document.getElementById('our-path')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 40px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(201,162,39,0.4)',
              borderRadius: 50,
              color: '#e8e0ff',
              fontSize: 13,
              letterSpacing: '0.15em',
              fontWeight: 400,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'border-color 0.3s, background 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#c9a227'
              e.target.style.background = 'rgba(201,162,39,0.1)'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(201,162,39,0.4)'
              e.target.style.background = 'rgba(255,255,255,0.05)'
            }}
          >
            EXPLORE MORE
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute',
            bottom: -140,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(201,162,39,0.6)' }}>SCROLL</span>
          <div style={{
            width: 1,
            height: 60,
            background: 'linear-gradient(to bottom, rgba(201,162,39,0.6), transparent)',
            animation: 'scroll-bounce 2s infinite',
          }} />
        </motion.div>
      </div>
    </section>
  )
}
