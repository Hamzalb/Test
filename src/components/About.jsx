import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const cards = [
  {
    icon: '◈',
    title: 'Ancient Wisdom',
    text: 'Rooted in 5,000 years of Vedic tradition, our teachings bridge the timeless with the present moment.',
  },
  {
    icon: '◉',
    title: 'Inner Alchemy',
    text: 'Transform the raw elements of the self into gold. Each practice is a crucible for spiritual evolution.',
  },
  {
    icon: '✦',
    title: 'Sacred Community',
    text: 'Walk the path alongside awakened souls. Our sangha is a field of resonance and mutual illumination.',
  },
  {
    icon: '◌',
    title: 'Living Presence',
    text: 'Beyond philosophy lies direct experience. We guide you into the living heart of consciousness itself.',
  },
  {
    icon: '⊕',
    title: 'Holistic Healing',
    text: 'Body, mind, and spirit woven into one. Our integrative approach honors the full spectrum of being.',
  },
  {
    icon: '◎',
    title: 'Cosmic Alignment',
    text: 'Attune to the rhythms of nature and cosmos. Discover your place in the grand mandala of existence.',
  },
]

function Card({ card, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef()

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = (e.clientY - cy) / 15
    const y = -(e.clientX - cx) / 15
    setTilt({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.3s ease',
        padding: '32px 28px',
        borderRadius: 16,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(201,162,39,0.15)',
        backdropFilter: 'blur(20px)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 0%, rgba(201,162,39,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        fontSize: 28,
        color: '#c9a227',
        marginBottom: 16,
        lineHeight: 1,
      }}>
        {card.icon}
      </div>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22,
        fontWeight: 400,
        color: '#e8e0ff',
        marginBottom: 12,
      }}>
        {card.title}
      </h3>
      <p style={{
        color: 'rgba(232,224,255,0.55)',
        fontSize: 14,
        lineHeight: 1.75,
        fontWeight: 300,
      }}>
        {card.text}
      </p>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="our-path" style={{ padding: '120px 40px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 72 }}
      >
        <p style={{ letterSpacing: '0.4em', fontSize: 11, color: '#c9a227', marginBottom: 16, textTransform: 'uppercase' }}>
          ✦ Our Path ✦
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 5vw, 64px)',
          fontWeight: 300,
          color: '#e8e0ff',
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          The Six Pillars of<br />
          <span className="gold-text" style={{ fontStyle: 'italic' }}>Sacred Living</span>
        </h2>
        <p style={{
          color: 'rgba(232,224,255,0.55)',
          maxWidth: 500,
          margin: '0 auto',
          fontSize: 16,
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          Each pillar is a gateway. Together they form the complete architecture of awakened existence.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24,
      }}>
        {cards.map((card, i) => (
          <Card key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  )
}
