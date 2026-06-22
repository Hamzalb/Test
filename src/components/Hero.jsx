import { useEffect, useRef, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const HeroScene = lazy(() => import('../three/HeroScene'))

function SplitHeading({ text, italic, delay = 0 }) {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return
    const chars = ref.current.querySelectorAll('.char')
    gsap.fromTo(chars,
      { y: 80, opacity: 0, rotateX: -40 },
      {
        y: 0, opacity: 1, rotateX: 0,
        duration: 1,
        stagger: 0.03,
        delay,
        ease: 'power3.out',
      }
    )
  }, [delay])

  return (
    <span
      ref={ref}
      style={{
        display: 'block',
        fontStyle: italic ? 'italic' : 'normal',
        overflow: 'hidden',
        perspective: '800px',
      }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          style={{
            display: 'inline-block',
            opacity: 0,
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}

export default function Hero({ heroImageUrl, heroImageUrl2 }) {
  const cursorGlowRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()

  useEffect(() => {
    const onMove = (e) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = e.clientX + 'px'
        cursorGlowRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)

    gsap.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 1.4, ease: 'power3.out' }
    )
    gsap.fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.8, ease: 'power3.out' }
    )

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
      {/* Cursor ambient glow */}
      <div
        ref={cursorGlowRef}
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 3,
          transition: 'left 0.1s, top 0.1s',
        }}
      />

      {/* AI hero image 1 */}
      {heroImageUrl && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url(${heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.2) saturate(1.4)',
        }} />
      )}

      {/* Gradient overlays — layered for depth */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 120% 80% at 50% 60%, rgba(26,10,62,0.7) 0%, rgba(5,5,16,0.92) 70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(5,5,16,0.3) 0%, transparent 40%, transparent 60%, rgba(5,5,16,0.8) 100%)',
      }} />

      {/* 3D Canvas */}
      <Suspense fallback={null}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <HeroScene />
        </div>
      </Suspense>

      {/* Hero text overlay */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        maxWidth: 900,
        padding: '0 24px',
        perspective: '1000px',
      }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 16, marginBottom: 32,
          }}
        >
          <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, #c9a227)' }} />
          <span style={{ letterSpacing: '0.45em', fontSize: 10, color: '#c9a227', textTransform: 'uppercase' }}>
            Sacred Sanctuary
          </span>
          <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, #c9a227)' }} />
        </motion.div>

        {/* Main heading — split text */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(56px, 9vw, 108px)',
          fontWeight: 300,
          lineHeight: 0.95,
          color: '#e8e0ff',
          marginBottom: 20,
          letterSpacing: '-0.02em',
        }}>
          <SplitHeading text="Awakening" delay={0.3} />
          <span style={{
            background: 'linear-gradient(135deg, #c9a227 0%, #f0d060 40%, #c9a227 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            <SplitHeading text="the Inner Light" italic delay={0.5} />
          </span>
        </h1>

        {/* Sub */}
        <p
          ref={subtitleRef}
          style={{
            color: 'rgba(232,224,255,0.55)',
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            lineHeight: 1.8,
            maxWidth: 520,
            margin: '0 auto 48px',
            fontWeight: 300,
            opacity: 0,
          }}
        >
          A sacred convergence of five-thousand-year wisdom and<br />
          modern consciousness. Discover the eternal path within.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', opacity: 0 }}
        >
          <button
            data-cursor
            onClick={() => document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '18px 48px',
              background: 'linear-gradient(135deg, #c9a227 0%, #f0d060 50%, #c9a227 100%)',
              backgroundSize: '200% 100%',
              border: 'none',
              borderRadius: 60,
              color: '#050510',
              fontSize: 11,
              letterSpacing: '0.18em',
              fontWeight: 700,
              cursor: 'none',
              fontFamily: 'Inter, sans-serif',
              boxShadow: '0 0 50px rgba(201,162,39,0.45), 0 20px 40px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.04)'
              e.target.style.boxShadow = '0 0 80px rgba(201,162,39,0.65), 0 30px 60px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)'
              e.target.style.boxShadow = '0 0 50px rgba(201,162,39,0.45), 0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            BEGIN YOUR JOURNEY
          </button>
          <button
            data-cursor
            onClick={() => document.getElementById('our-path')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '18px 48px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(201,162,39,0.3)',
              borderRadius: 60,
              color: '#e8e0ff',
              fontSize: 11,
              letterSpacing: '0.18em',
              fontWeight: 400,
              cursor: 'none',
              backdropFilter: 'blur(16px)',
              fontFamily: 'Inter, sans-serif',
              transition: 'border-color 0.3s, background 0.3s, transform 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'rgba(201,162,39,0.7)'
              e.target.style.background = 'rgba(201,162,39,0.08)'
              e.target.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(201,162,39,0.3)'
              e.target.style.background = 'rgba(255,255,255,0.04)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            EXPLORE MORE
          </button>
        </div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{
          position: 'absolute', bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(201,162,39,0.5)' }}>SCROLL</span>
        <div style={{ position: 'relative', width: 1, height: 56, overflow: 'hidden' }}>
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: 1, height: '60%',
              background: 'linear-gradient(to bottom, transparent, #c9a227, transparent)',
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
