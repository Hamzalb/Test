import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  { icon: '◈', title: 'Ancient Wisdom', text: 'Rooted in 5,000 years of Vedic tradition, our teachings bridge the timeless with the present moment.', color: '#c9a227' },
  { icon: '◉', title: 'Inner Alchemy', text: 'Transform raw elements of self into gold. Each practice is a crucible for profound spiritual evolution.', color: '#00e5ff' },
  { icon: '✦', title: 'Sacred Community', text: 'Walk the path alongside awakened souls. Our sangha is a field of resonance and mutual illumination.', color: '#f0d060' },
  { icon: '◌', title: 'Living Presence', text: 'Beyond philosophy lies direct experience. We guide you into the living heart of consciousness itself.', color: '#c9a227' },
  { icon: '⊕', title: 'Holistic Healing', text: 'Body, mind, and spirit woven into one. Our integrative approach honors the full spectrum of being.', color: '#00e5ff' },
  { icon: '◎', title: 'Cosmic Alignment', text: 'Attune to the rhythms of nature and cosmos. Discover your place in the grand mandala of existence.', color: '#f0d060' },
]

function Card({ card, index }) {
  const ref = useRef()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowing, setGlowing] = useState(false)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setTilt({
      x: (e.clientY - cy) / 20,
      y: -(e.clientX - cx) / 20,
    })
    setGlowing(true)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setGlowing(false) }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.35s ease',
        padding: '36px 32px',
        borderRadius: 20,
        background: glowing
          ? `radial-gradient(circle at 50% 0%, ${card.color}08 0%, rgba(255,255,255,0.03) 60%)`
          : 'rgba(255,255,255,0.025)',
        border: `1px solid ${glowing ? card.color + '30' : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(16px)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        transitionProperty: 'transform, background, border-color',
      }}
    >
      {/* Corner decoration */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 60, height: 60,
        background: `linear-gradient(135deg, transparent 50%, ${card.color}10 100%)`,
        borderBottomLeftRadius: 20,
      }} />

      <div style={{ fontSize: 24, color: card.color, marginBottom: 20 }}>{card.icon}</div>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 24,
        fontWeight: 400,
        color: '#e8e0ff',
        marginBottom: 14,
        lineHeight: 1.2,
      }}>
        {card.title}
      </h3>
      <p style={{
        color: 'rgba(232,224,255,0.5)',
        fontSize: 14,
        lineHeight: 1.8,
        fontWeight: 300,
      }}>
        {card.text}
      </p>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 2,
        width: glowing ? '100%' : '0%',
        background: `linear-gradient(to right, ${card.color}, transparent)`,
        transition: 'width 0.4s ease',
      }} />
    </motion.div>
  )
}

export default function About() {
  const headingRef = useRef()

  useEffect(() => {
    if (!headingRef.current) return
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          once: true,
        }
      }
    )
  }, [])

  return (
    <section id="our-path" style={{ padding: '140px 40px', maxWidth: 1240, margin: '0 auto' }}>
      <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 80, opacity: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, #c9a227)' }} />
          <span style={{ letterSpacing: '0.4em', fontSize: 10, color: '#c9a227', textTransform: 'uppercase' }}>Our Path</span>
          <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, #c9a227)' }} />
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(42px, 5.5vw, 72px)',
          fontWeight: 300,
          color: '#e8e0ff',
          lineHeight: 1.05,
          marginBottom: 24,
        }}>
          The Six Pillars of<br />
          <span style={{
            background: 'linear-gradient(135deg, #c9a227, #f0d060, #c9a227)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: 'italic',
          }}>
            Sacred Living
          </span>
        </h2>
        <p style={{
          color: 'rgba(232,224,255,0.45)',
          maxWidth: 480,
          margin: '0 auto',
          fontSize: 16,
          lineHeight: 1.75,
          fontWeight: 300,
        }}>
          Each pillar is a gateway. Together they form the complete architecture of awakened existence.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 20,
      }}>
        {cards.map((card, i) => <Card key={card.title} card={card} index={i} />)}
      </div>
    </section>
  )
}
