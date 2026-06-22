import { motion } from 'framer-motion'

const placeholderImages = [
  { title: 'Cosmic Mandala', aspect: '1/1', bg: 'linear-gradient(135deg, #1a0a3e, #c9a227)' },
  { title: 'Sacred Nebula', aspect: '4/3', bg: 'linear-gradient(135deg, #050510, #00e5ff20, #1a0a3e)' },
  { title: 'Golden Lotus', aspect: '3/4', bg: 'linear-gradient(135deg, #0d0720, #f0d060)' },
  { title: 'Astral Field', aspect: '16/9', bg: 'linear-gradient(135deg, #050510, #2d1b69)' },
  { title: 'Crystalline Void', aspect: '1/1', bg: 'linear-gradient(135deg, #1a0a3e, #00e5ff)' },
  { title: 'Primal Light', aspect: '4/3', bg: 'linear-gradient(135deg, #0d0720, #c9a227)' },
]

function GalleryItem({ item, index, heroImageUrl, mandalaImageUrl }) {
  const isHeroSlot = index === 0
  const isMandalaSlot = index === 4

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(201,162,39,0.15)',
        position: 'relative',
        aspectRatio: item.aspect,
        cursor: 'pointer',
        background: item.bg,
      }}
    >
      {/* AI image if available */}
      {isHeroSlot && heroImageUrl && (
        <img
          src={heroImageUrl}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      {isMandalaSlot && mandalaImageUrl && (
        <img
          src={mandalaImageUrl}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}

      {/* Overlay label */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(5,5,16,0.8) 0%, transparent 50%)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 20,
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 18,
          color: '#e8e0ff',
          fontStyle: 'italic',
        }}>
          {item.title}
        </span>
      </div>

      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        width: 24, height: 24,
        border: '1px solid rgba(201,162,39,0.5)',
        borderRadius: 4,
        transform: 'rotate(45deg)',
      }} />
    </motion.div>
  )
}

export default function Gallery({ heroImageUrl, mandalaImageUrl }) {
  return (
    <section
      id="journey"
      style={{
        padding: '120px 40px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: 72 }}
      >
        <p style={{ letterSpacing: '0.4em', fontSize: 11, color: '#c9a227', marginBottom: 16, textTransform: 'uppercase' }}>
          ✦ Sacred Visions ✦
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 5vw, 64px)',
          fontWeight: 300,
          color: '#e8e0ff',
          lineHeight: 1.1,
        }}>
          The Journey in<br />
          <span className="gold-text" style={{ fontStyle: 'italic' }}>Images</span>
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
      }}
      className="gallery-grid"
      >
        {placeholderImages.map((item, i) => (
          <GalleryItem
            key={i}
            item={item}
            index={i}
            heroImageUrl={heroImageUrl}
            mandalaImageUrl={mandalaImageUrl}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
