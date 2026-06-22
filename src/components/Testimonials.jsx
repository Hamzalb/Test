import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Arjun Sharma',
    role: 'Meditation Teacher',
    text: 'Ashramdhi cracked open something I had been circling for years. The depth of teaching here is unparalleled — ancient, precise, and utterly alive.',
    initials: 'AS',
    color: '#c9a227',
  },
  {
    name: 'Maya Chen',
    role: 'Yoga Practitioner',
    text: 'I arrived exhausted, fractured, searching. Within three days of the silent retreat, the noise simply fell away. I am still living in that silence.',
    initials: 'MC',
    color: '#00e5ff',
  },
  {
    name: 'Rumi El-Farouk',
    role: 'Sound Healer',
    text: 'The sound healing sessions touched frequencies I didn\'t know existed in me. Tears, then stillness, then an extraordinary joy. Transformative.',
    initials: 'RF',
    color: '#f0d060',
  },
  {
    name: 'Sophia Lindberg',
    role: 'Spiritual Seeker',
    text: 'The philosophy teachings here are not concepts — they are transmission. Each satsang, I feel the words enter my cells, not just my mind.',
    initials: 'SL',
    color: '#c9a227',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section
      style={{
        padding: '120px 40px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(26,10,62,0.2) 50%, transparent 100%)',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <p style={{ letterSpacing: '0.4em', fontSize: 11, color: '#c9a227', marginBottom: 16, textTransform: 'uppercase' }}>
            ✦ Voices ✦
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 300,
            color: '#e8e0ff',
          }}>
            Souls Who Have<br />
            <span className="gold-text" style={{ fontStyle: 'italic' }}>Walked This Path</span>
          </h2>
        </motion.div>

        {/* Active testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center',
              padding: '48px',
              borderRadius: 24,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(201,162,39,0.15)',
              marginBottom: 48,
              position: 'relative',
            }}
          >
            <div style={{
              fontSize: 80,
              fontFamily: 'serif',
              color: 'rgba(201,162,39,0.2)',
              lineHeight: 0.8,
              marginBottom: 24,
              position: 'absolute',
              top: 32, left: 40,
            }}>
              "
            </div>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(232,224,255,0.85)',
              lineHeight: 1.7,
              maxWidth: 700,
              margin: '0 auto 32px',
            }}>
              {testimonials[active].text}
            </p>

            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${testimonials[active].color}, ${testimonials[active].color}40)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600, fontSize: 16,
                color: '#050510',
                border: `1px solid ${testimonials[active].color}`,
                boxShadow: `0 0 20px ${testimonials[active].color}40`,
              }}>
                {testimonials[active].initials}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#e8e0ff', fontSize: 15, fontWeight: 400 }}>
                  {testimonials[active].name}
                </div>
                <div style={{ color: 'rgba(201,162,39,0.7)', fontSize: 12, letterSpacing: '0.1em' }}>
                  {testimonials[active].role}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? '#c9a227' : 'rgba(201,162,39,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
