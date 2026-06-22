import { useRef, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'

function OrbCluster() {
  const groupRef = useRef()
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  const orbs = [
    { pos: [0, 0, 0], r: 0.5, color: '#c9a227', intensity: 1.5 },
    { pos: [1.2, 0.8, -0.5], r: 0.25, color: '#00e5ff', intensity: 2 },
    { pos: [-1.2, -0.8, 0.5], r: 0.2, color: '#f0d060', intensity: 1.8 },
    { pos: [0.8, -1.2, 0.8], r: 0.18, color: '#e8e0ff', intensity: 1.5 },
    { pos: [-0.8, 1.2, -0.8], r: 0.22, color: '#c9a227', intensity: 2 },
    { pos: [1.5, -0.3, 0.2], r: 0.14, color: '#00e5ff', intensity: 1.8 },
  ]

  return (
    <group ref={groupRef}>
      {orbs.map((o, i) => (
        <mesh key={i} position={o.pos}>
          <sphereGeometry args={[o.r, 32, 32]} />
          <meshStandardMaterial
            color={o.color}
            emissive={o.color}
            emissiveIntensity={o.intensity}
            roughness={0}
            metalness={0.5}
          />
          <pointLight color={o.color} intensity={3} distance={3} />
        </mesh>
      ))}
      <ambientLight intensity={0.2} />
    </group>
  )
}

const quotes = [
  { text: '"The seeker is the sought. The finder is the found. There is only the one light, appearing as many."', attr: '— Ashramdhi Teachings' },
  { text: '"Silence is not the absence of sound. It is the presence of the Self, vast and still as the midnight sky."', attr: '— The Inner Path' },
  { text: '"Each breath is a universe breathing itself. Each thought, a star. You are the cosmos, knowing itself."', attr: '— Vedantic Sutras' },
]

export default function Philosophy() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['40px', '-40px'])

  return (
    <section
      id="wisdom"
      ref={ref}
      style={{
        padding: '140px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(42,20,100,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(0,229,255,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        alignItems: 'center',
      }}
      className="philosophy-grid"
      >
        {/* Quotes column */}
        <motion.div style={{ y }}>
          <p style={{ letterSpacing: '0.4em', fontSize: 11, color: '#c9a227', marginBottom: 24, textTransform: 'uppercase' }}>
            ✦ Wisdom ✦
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 300,
            color: '#e8e0ff',
            lineHeight: 1.15,
            marginBottom: 48,
          }}>
            Living Words of the<br />
            <span className="gold-text" style={{ fontStyle: 'italic' }}>Ancient Sages</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {quotes.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
              >
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(232,224,255,0.8)',
                  lineHeight: 1.7,
                  marginBottom: 8,
                  paddingLeft: 20,
                  borderLeft: '2px solid rgba(201,162,39,0.4)',
                }}>
                  {q.text}
                </p>
                <p style={{
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  color: 'rgba(201,162,39,0.6)',
                  paddingLeft: 20,
                }}>
                  {q.attr}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3D Orb cluster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          style={{ height: 500, position: 'relative' }}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <OrbCluster />
            </Suspense>
          </Canvas>
          {/* Glow effect */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300, height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .philosophy-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
