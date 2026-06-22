import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Our Path', 'Wisdom', 'Offerings', 'Journey', 'Connect']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,5,16,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,162,39,0.15)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <div
        className="font-serif"
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span style={{ color: '#c9a227', fontSize: 22 }}>✦</span>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          fontWeight: 300,
          letterSpacing: '0.25em',
          color: '#e8e0ff',
        }}>
          ASHRAMDHI
        </span>
      </div>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="hidden-mobile">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link.toLowerCase().replace(' ', '-'))}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(232, 224, 255, 0.7)',
              fontSize: 13,
              letterSpacing: '0.12em',
              cursor: 'pointer',
              transition: 'color 0.3s',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
            }}
            onMouseEnter={(e) => e.target.style.color = '#c9a227'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(232, 224, 255, 0.7)'}
          >
            {link.toUpperCase()}
          </button>
        ))}
        <button
          onClick={() => scrollTo('connect')}
          style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #c9a227, #f0d060)',
            border: 'none',
            borderRadius: 50,
            color: '#050510',
            fontSize: 12,
            letterSpacing: '0.12em',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 0 20px rgba(201,162,39,0.4)',
          }}
        >
          BEGIN NOW
        </button>
      </div>

      {/* Mobile menu toggle */}
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
        className="mobile-menu-btn"
      >
        <div style={{ width: 24, height: 2, background: '#c9a227', marginBottom: 5 }} />
        <div style={{ width: 24, height: 2, background: '#c9a227', marginBottom: 5 }} />
        <div style={{ width: 24, height: 2, background: '#c9a227' }} />
      </button>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  )
}
