import { useRef, Suspense, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function EnergyOrb() {
  const groupRef = useRef()
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()
  const core = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) groupRef.current.rotation.y = t * 0.1
    if (ring1.current) ring1.current.rotation.z = t * 0.4
    if (ring2.current) { ring2.current.rotation.x = t * 0.3; ring2.current.rotation.z = -t * 0.2 }
    if (ring3.current) { ring3.current.rotation.x = -t * 0.25; ring3.current.rotation.y = t * 0.35 }
    if (core.current) {
      const scale = 1 + Math.sin(t * 1.8) * 0.06
      core.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Glowing core */}
      <mesh ref={core}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshStandardMaterial
          color="#1a0a3e"
          emissive="#c9a227"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Inner icosahedron wireframe */}
      <mesh rotation={[0.5, 0.3, 0.2]}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial color="#c9a227" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.8, 0.008, 8, 128]} />
        <meshStandardMaterial color="#c9a227" emissive="#c9a227" emissiveIntensity={2} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.006, 8, 128]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.6, 0.004, 8, 128]} />
        <meshStandardMaterial color="#f0d060" emissive="#f0d060" emissiveIntensity={1.5} />
      </mesh>

      {/* Point lights */}
      <pointLight color="#c9a227" intensity={12} distance={7} />
      <pointLight color="#00e5ff" intensity={5} distance={8} position={[3, 2, 0]} />
      <ambientLight intensity={0.2} />

      <EffectComposer>
        <Bloom intensity={2} luminanceThreshold={0.1} radius={0.7} mipmapBlur />
      </EffectComposer>
    </group>
  )
}

const quotes = [
  { text: '"The seeker is the sought. The finder is the found. There is only the one light, appearing as many."', attr: '— Ashramdhi Teachings' },
  { text: '"Silence is not the absence of sound. It is the presence of the Self — vast and still as the midnight sky."', attr: '— The Inner Path' },
  { text: '"Each breath is a universe breathing itself. Each thought, a star. You are the cosmos, knowing itself."', attr: '— Vedantic Sutras' },
]

export default function Philosophy() {
  const sectionRef = useRef()
  const quotesRef = useRef([])
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['60px', '-60px'])

  useEffect(() => {
    quotesRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          delay: i * 0.15,
        }
      )
    })
  }, [])

  return (
    <section
      id="wisdom"
      ref={sectionRef}
      style={{ padding: '160px 40px', position: 'relative', overflow: 'hidden' }}
    >
      {/* BG */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 25% 50%, rgba(42,20,100,0.18) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center',
      }}
      className="philosophy-grid"
      >
        {/* Left: quotes */}
        <motion.div style={{ y }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, #c9a227)' }} />
            <span style={{ letterSpacing: '0.4em', fontSize: 10, color: '#c9a227', textTransform: 'uppercase' }}>Wisdom</span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 4.5vw, 60px)',
            fontWeight: 300,
            color: '#e8e0ff',
            lineHeight: 1.1,
            marginBottom: 56,
          }}>
            Living Words of the<br />
            <span style={{
              background: 'linear-gradient(135deg, #c9a227, #f0d060)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'italic',
            }}>
              Ancient Sages
            </span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
            {quotes.map((q, i) => (
              <div
                key={i}
                ref={(el) => quotesRef.current[i] = el}
                style={{ opacity: 0 }}
              >
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 19,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(232,224,255,0.82)',
                  lineHeight: 1.75,
                  marginBottom: 10,
                  paddingLeft: 24,
                  borderLeft: '2px solid rgba(201,162,39,0.35)',
                }}>
                  {q.text}
                </p>
                <p style={{
                  fontSize: 11, letterSpacing: '0.12em',
                  color: 'rgba(201,162,39,0.55)',
                  paddingLeft: 24,
                }}>
                  {q.attr}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: 3D orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: 540, position: 'relative' }}
        >
          <Canvas camera={{ position: [0, 0, 6], fov: 48 }} style={{ width: '100%', height: '100%' }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
            <Suspense fallback={null}><EnergyOrb /></Suspense>
          </Canvas>
          {/* Ambient glow behind canvas */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .philosophy-grid { grid-template-columns: 1fr !important; gap: 60px !important; } }
      `}</style>
    </section>
  )
}
