import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const HERO_IMG    = 'https://d8j0ntlcm91z4.cloudfront.net/user_3ExrkM2KHczaVNC4ovAKbarDwLO/hf_20260622_110657_d79a9e56-b07c-4803-bd3b-6a9f5a6bf114.png'
const MANDALA_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3ExrkM2KHczaVNC4ovAKbarDwLO/hf_20260622_110702_1e33b161-2c73-4561-b923-16e331c7a791.png'
const LUXURY_IMG  = 'https://d8j0ntlcm91z4.cloudfront.net/user_3ExrkM2KHczaVNC4ovAKbarDwLO/hf_20260622_114245_c7c05e49-92c4-4ec2-8c3a-c3060ca3655a.png'
const FIGURE_IMG  = 'https://d8j0ntlcm91z4.cloudfront.net/user_3ExrkM2KHczaVNC4ovAKbarDwLO/hf_20260622_114259_ca5b5a61-85e5-435c-97f1-83b701b10e7c.png'

const items = [
  { url: LUXURY_IMG, title: 'Sacred Architecture', span: '2', aspect: '16/9', row: '1 / 3' },
  { url: FIGURE_IMG, title: 'Astral Transcendence', span: '1', aspect: '9/16', row: 'auto' },
  { url: HERO_IMG, title: 'Cosmic Sanctuary', span: '1', aspect: '4/3', row: 'auto' },
  { url: MANDALA_IMG, title: 'Golden Mandala', span: '1', aspect: '1/1', row: 'auto' },
]

function GalleryItem({ item, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'none',
        border: '1px solid rgba(201,162,39,0.1)',
        aspectRatio: item.aspect,
        gridColumn: item.span === '2' ? 'span 2' : 'span 1',
      }}
    >
      {/* Image */}
      <img
        src={item.url}
        alt={item.title}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(to top, rgba(5,5,16,${hovered ? 0.75 : 0.5}) 0%, transparent 50%)`,
        transition: 'background 0.4s',
      }} />

      {/* Label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '24px 24px 24px',
        transform: hovered ? 'translateY(0)' : 'translateY(8px)',
        opacity: hovered ? 1 : 0.7,
        transition: 'transform 0.4s ease, opacity 0.4s ease',
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 18,
          fontStyle: 'italic',
          color: '#e8e0ff',
          marginBottom: 6,
        }}>
          {item.title}
        </p>
        {hovered && (
          <div style={{ height: 1, width: 40, background: 'rgba(201,162,39,0.6)' }} />
        )}
      </div>

      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 16, right: 16,
        width: 22, height: 22,
        border: '1px solid rgba(201,162,39,0.4)',
        transform: 'rotate(45deg)',
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.3s',
      }} />
    </motion.div>
  )
}

export default function Gallery() {
  return (
    <section id="journey" style={{ padding: '140px 40px', maxWidth: 1240, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        style={{ textAlign: 'center', marginBottom: 80 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, #c9a227)' }} />
          <span style={{ letterSpacing: '0.4em', fontSize: 10, color: '#c9a227', textTransform: 'uppercase' }}>Sacred Visions</span>
          <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, #c9a227)' }} />
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(42px, 5.5vw, 72px)',
          fontWeight: 300,
          color: '#e8e0ff',
          lineHeight: 1.05,
        }}>
          The Journey in<br />
          <span style={{
            background: 'linear-gradient(135deg, #c9a227, #f0d060)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: 'italic',
          }}>
            Images
          </span>
        </h2>
      </motion.div>

      {/* Masonry-like grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'auto',
        gap: 16,
      }}
      className="gallery-grid"
      >
        {items.map((item, i) => (
          <GalleryItem key={i} item={item} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .gallery-grid > div[style*="span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-grid > div[style*="span 2"] { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  )
}
