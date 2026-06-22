import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function SpinningIcon({ shape, color }) {
  const ref = useRef()
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.8
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.5) * 0.3
    }
  })
  const geo = shape === 'octa' ? (
    <octahedronGeometry args={[0.6]} />
  ) : shape === 'torus' ? (
    <torusGeometry args={[0.45, 0.15, 16, 32]} />
  ) : shape === 'ico' ? (
    <icosahedronGeometry args={[0.6, 0]} />
  ) : shape === 'box' ? (
    <boxGeometry args={[0.7, 0.7, 0.7]} />
  ) : shape === 'cone' ? (
    <coneGeometry args={[0.5, 1, 8]} />
  ) : (
    <dodecahedronGeometry args={[0.6]} />
  )
  return (
    <mesh ref={ref}>
      {geo}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.8}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  )
}

function ServiceCanvas({ shape, color }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      style={{ width: 80, height: 80 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={4} color={color} />
      <SpinningIcon shape={shape} color={color} />
    </Canvas>
  )
}

const services = [
  { title: 'Meditation', desc: 'Guided journeys into the stillness beneath thought. Daily practices for profound inner peace.', shape: 'octa', color: '#c9a227', tag: 'Mind' },
  { title: 'Yoga Sadhana', desc: 'Ancient asana sequences that unify breath, body, and the boundless spirit within.', shape: 'torus', color: '#00e5ff', tag: 'Body' },
  { title: 'Sound Healing', desc: 'Sacred frequencies of Tibetan bowls and mantras dissolve energetic blockages.', shape: 'ico', color: '#f0d060', tag: 'Energy' },
  { title: 'Silent Retreat', desc: '3 to 21 day immersions in noble silence. The deepest dive into pure awareness.', shape: 'box', color: '#c9a227', tag: 'Immersion' },
  { title: 'Breathwork', desc: 'Pranayama and holotropic techniques that expand the capacity of the living self.', shape: 'cone', color: '#00e5ff', tag: 'Vitality' },
  { title: 'Philosophy', desc: 'Satsang with living texts — Vedanta, Tantra, and Advaita for the modern seeker.', shape: 'dodeca', color: '#f0d060', tag: 'Wisdom' },
]

export default function Services() {
  return (
    <section
      id="offerings"
      style={{
        padding: '120px 40px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(26,10,62,0.3) 50%, transparent 100%)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <p style={{ letterSpacing: '0.4em', fontSize: 11, color: '#c9a227', marginBottom: 16, textTransform: 'uppercase' }}>
            ✦ Offerings ✦
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 300,
            color: '#e8e0ff',
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Sacred Practices for<br />
            <span className="gold-text" style={{ fontStyle: 'italic' }}>Every Seeker</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{
                padding: '32px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,162,39,0.12)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <span style={{
                  fontSize: 10,
                  letterSpacing: '0.15em',
                  color: s.color,
                  background: `rgba(201,162,39,0.1)`,
                  padding: '4px 10px',
                  borderRadius: 20,
                  border: `1px solid ${s.color}40`,
                }}>
                  {s.tag}
                </span>
              </div>

              <ServiceCanvas shape={s.shape} color={s.color} />

              <div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24,
                  fontWeight: 400,
                  color: '#e8e0ff',
                  marginBottom: 8,
                }}>
                  {s.title}
                </h3>
                <p style={{
                  color: 'rgba(232,224,255,0.5)',
                  fontSize: 14,
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}>
                  {s.desc}
                </p>
              </div>

              <button style={{
                alignSelf: 'flex-start',
                background: 'none',
                border: 'none',
                color: s.color,
                fontSize: 12,
                letterSpacing: '0.15em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'Inter, sans-serif',
                padding: 0,
                marginTop: 8,
              }}>
                LEARN MORE →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
