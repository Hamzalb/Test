import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Arjun Sharma',
    role: 'Meditation Teacher, New Delhi',
    text: 'Ashramdhi cracked open something I had been circling for years. The depth of teaching here is unparalleled — ancient, precise, and utterly alive in every moment.',
    initials: 'AS',
    color: '#c9a227',
  },
  {
    name: 'Maya Chen',
    role: 'Yoga Practitioner, Singapore',
    text: 'I arrived exhausted, fractured, searching. Within three days of the silent retreat, the noise simply fell away. I am still living in that silence six months later.',
    initials: 'MC',
    color: '#00e5ff',
  },
  {
    name: 'Rumi El-Farouk',
    role: 'Sound Healer, Istanbul',
    text: 'The sound healing sessions touched frequencies I didn\'t know existed in me. Tears, then stillness, then an extraordinary and quiet joy. Truly transformative.',
    initials: 'RF',
    color: '#f0d060',
  },
  {
    name: 'Sophia Lindberg',
    role: 'Spiritual Seeker, Stockholm',
    text: 'The philosophy teachings are not concepts — they are transmission. Each satsang, I feel the words enter my cells, not just my mind. A rare and precious gift.',
    initials: 'SL',
    color: '#c9a227',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const go = (i) => {
    clearInterval(intervalRef.current)
    setActive(i)
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length)
    }, 5000)
  }

  const t = testimonials[active]

  return (
    <section style={{ padding: '140px 40px', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(26,10,62,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, #c9a227)' }} />
            <span style={{ letterSpacing: '0.4em', fontSize: 10, color: '#c9a227', textTransform: 'uppercase' }}>Voices</span>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, #c9a227)' }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(42px, 5.5vw, 72px)',
            fontWeight: 300, color: '#e8e0ff', lineHeight: 1.05,
          }}>
            Souls Who Have<br />
            <span style={{
              background: 'linear-gradient(135deg, #c9a227, #f0d060)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontStyle: 'italic',
            }}>
              Walked This Path
            </span>
          </h2>
        </motion.div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '56px 64px',
              borderRadius: 24,
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(16px)',
              textAlign: 'center',
              marginBottom: 48,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top gradient line */}
            <div style={{
              position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
              background: `linear-gradient(to right, transparent, ${t.color}50, transparent)`,
            }} />

            {/* Quote mark */}
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 120,
              color: `${t.color}15`,
              lineHeight: 0.5,
              marginBottom: 32,
              userSelect: 'none',
            }}>
              "
            </div>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(19px, 2.5vw, 26px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(232,224,255,0.88)',
              lineHeight: 1.75,
              maxWidth: 640,
              margin: '0 auto 40px',
            }}>
              {t.text}
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: `linear-gradient(135deg, ${t.color}, ${t.color}60)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17, fontWeight: 600, color: '#050510',
                border: `1px solid ${t.color}`,
                boxShadow: `0 0 24px ${t.color}40`,
              }}>
                {t.initials}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#e8e0ff', fontSize: 15, fontWeight: 400, marginBottom: 2 }}>{t.name}</div>
                <div style={{ color: `${t.color}80`, fontSize: 11, letterSpacing: '0.1em' }}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'center' }}>
          {testimonials.map((tt, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === active ? 36 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? t.color : 'rgba(201,162,39,0.25)',
                border: 'none',
                cursor: 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: 0,
                boxShadow: i === active ? `0 0 12px ${t.color}60` : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
