import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function Icon3D({ shape, color }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.9
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.35
    ref.current.position.y = Math.sin(t * 0.6) * 0.06
  })

  const geom = {
    octa: <octahedronGeometry args={[0.65, 0]} />,
    torus: <torusGeometry args={[0.5, 0.18, 16, 48]} />,
    ico: <icosahedronGeometry args={[0.65, 1]} />,
    box: <boxGeometry args={[0.75, 0.75, 0.75]} />,
    cone: <coneGeometry args={[0.5, 1.0, 6]} />,
    dodeca: <dodecahedronGeometry args={[0.6, 0]} />,
  }[shape] || <sphereGeometry args={[0.6, 32, 32]} />

  return (
    <mesh ref={ref}>
      {geom}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        metalness={1}
        roughness={0}
      />
    </mesh>
  )
}

function ServiceCanvas({ shape, color }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 42 }}
      style={{ width: 90, height: 90 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={6} color={color} />
      <pointLight position={[-2, -2, 2]} intensity={3} color="#e8e0ff" />
      <Suspense fallback={null}>
        <Icon3D shape={shape} color={color} />
        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.3} radius={0.5} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}

const services = [
  { title: 'Meditation', desc: 'Guided journeys into the stillness beneath thought. Daily practices for profound inner peace and clarity of being.', shape: 'octa', color: '#c9a227', tag: 'Mind' },
  { title: 'Yoga Sadhana', desc: 'Ancient asana sequences that unify breath, body, and the boundless spirit. Customized for every level of practitioner.', shape: 'torus', color: '#00e5ff', tag: 'Body' },
  { title: 'Sound Healing', desc: 'Sacred frequencies of Tibetan bowls and ancient mantras dissolve energetic blockages and restore harmony.', shape: 'ico', color: '#f0d060', tag: 'Energy' },
  { title: 'Silent Retreat', desc: '3 to 21 day immersions in noble silence. The deepest possible dive into pure awareness and inner stillness.', shape: 'box', color: '#c9a227', tag: 'Immersion' },
  { title: 'Breathwork', desc: 'Pranayama and holotropic techniques that radically expand the living capacity of body, mind, and spirit.', shape: 'cone', color: '#00e5ff', tag: 'Vitality' },
  { title: 'Philosophy', desc: 'Satsang with living texts — Vedanta, Tantra, Advaita. Ancient wisdom decoded for the modern, searching mind.', shape: 'dodeca', color: '#f0d060', tag: 'Wisdom' },
]

export default function Services() {
  return (
    <section
      id="offerings"
      style={{
        padding: '140px 40px',
        position: 'relative',
      }}
    >
      {/* Subtle background gradient strip */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(26,10,62,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, #c9a227)' }} />
            <span style={{ letterSpacing: '0.4em', fontSize: 10, color: '#c9a227', textTransform: 'uppercase' }}>Offerings</span>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, #c9a227)' }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(42px, 5.5vw, 72px)',
            fontWeight: 300,
            color: '#e8e0ff',
            lineHeight: 1.05,
          }}>
            Sacred Practices for<br />
            <span style={{
              background: 'linear-gradient(135deg, #c9a227, #f0d060, #c9a227)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'italic',
            }}>
              Every Seeker
            </span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.09, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -10, transition: { duration: 0.35, ease: 'easeOut' } }}
              style={{
                padding: '36px 32px',
                borderRadius: 22,
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(14px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                cursor: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top tag */}
              <div style={{ position: 'absolute', top: 20, right: 20 }}>
                <span style={{
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  color: s.color,
                  background: `${s.color}12`,
                  padding: '4px 12px',
                  borderRadius: 20,
                  border: `1px solid ${s.color}30`,
                }}>
                  {s.tag.toUpperCase()}
                </span>
              </div>

              {/* Top gradient */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(to right, transparent, ${s.color}40, transparent)`,
              }} />

              <ServiceCanvas shape={s.shape} color={s.color} />

              <div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 26,
                  fontWeight: 400,
                  color: '#e8e0ff',
                  marginBottom: 10,
                }}>
                  {s.title}
                </h3>
                <p style={{
                  color: 'rgba(232,224,255,0.48)',
                  fontSize: 14,
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}>
                  {s.desc}
                </p>
              </div>

              <button style={{
                alignSelf: 'flex-start',
                background: 'none', border: 'none',
                color: s.color,
                fontSize: 10, letterSpacing: '0.2em',
                cursor: 'none',
                display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: 'Inter, sans-serif', padding: 0,
              }}>
                EXPLORE
                <span style={{ fontSize: 14 }}>→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
