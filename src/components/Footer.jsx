import { motion } from 'framer-motion'

const links = {
  'Navigate': ['Our Path', 'Wisdom', 'Offerings', 'Journey', 'Connect'],
  'Practices': ['Meditation', 'Yoga Sadhana', 'Sound Healing', 'Breathwork', 'Philosophy'],
  'Retreats': ['Silent Retreat', 'Weekend Immersion', 'Online Teachings', 'Private Guidance', 'Community'],
}

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(201,162,39,0.12)',
      padding: '80px 40px 40px',
      background: 'rgba(5,5,16,0.8)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.4), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 64,
        }}
        className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ color: '#c9a227', fontSize: 20 }}>✦</span>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                fontWeight: 300,
                letterSpacing: '0.25em',
                color: '#e8e0ff',
              }}>
                ASHRAMDHI
              </span>
            </div>
            <p style={{
              color: 'rgba(232,224,255,0.45)',
              fontSize: 14,
              lineHeight: 1.75,
              maxWidth: 280,
              fontWeight: 300,
            }}>
              A sacred sanctuary where ancient wisdom and the seeking soul converge in the eternal now.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              {['◈', '◉', '✦', '◌'].map((icon, i) => (
                <button
                  key={i}
                  style={{
                    width: 40, height: 40,
                    borderRadius: '50%',
                    background: 'rgba(201,162,39,0.08)',
                    border: '1px solid rgba(201,162,39,0.2)',
                    color: 'rgba(201,162,39,0.7)',
                    fontSize: 14,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201,162,39,0.15)'
                    e.currentTarget.style.borderColor = '#c9a227'
                    e.currentTarget.style.color = '#c9a227'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(201,162,39,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(201,162,39,0.2)'
                    e.currentTarget.style.color = 'rgba(201,162,39,0.7)'
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <h4 style={{
                fontSize: 11,
                letterSpacing: '0.2em',
                color: '#c9a227',
                marginBottom: 24,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
              }}>
                {col.toUpperCase()}
              </h4>
              <ul style={{ listStyle: 'none' }}>
                {items.map((item) => (
                  <li key={item} style={{ marginBottom: 12 }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(232,224,255,0.45)',
                      fontSize: 13,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      padding: 0,
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#e8e0ff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(232,224,255,0.45)'}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(201,162,39,0.1)',
          paddingTop: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ color: 'rgba(232,224,255,0.3)', fontSize: 12 }}>
            © 2026 Ashramdhi. All rights reserved.
          </p>
          <p style={{ color: 'rgba(232,224,255,0.3)', fontSize: 12, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
            "Tat tvam asi" — That thou art.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
