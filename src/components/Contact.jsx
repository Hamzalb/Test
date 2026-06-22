import { useState, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'

function PulseSphere() {
  const ref = useRef()
  const ringRef = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.05)
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.3
      ringRef.current.rotation.x = t * 0.2
    }
  })
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial
          color="#1a0a3e"
          emissive="#c9a227"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.01, 8, 64]} />
          <meshBasicMaterial color="#c9a227" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[1.5, 0.008, 8, 64]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 6, Math.PI / 3, Math.PI / 4]}>
          <torusGeometry args={[1.8, 0.006, 8, 64]} />
          <meshBasicMaterial color="#f0d060" transparent opacity={0.25} />
        </mesh>
      </group>
      <pointLight color="#c9a227" intensity={6} distance={5} />
      <pointLight color="#00e5ff" intensity={3} distance={6} position={[2, 1, 1]} />
      <ambientLight intensity={0.2} />
    </group>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(201,162,39,0.2)',
    borderRadius: 10,
    color: '#e8e0ff',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <section
      id="connect"
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
          ✦ Connect ✦
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 5vw, 64px)',
          fontWeight: 300,
          color: '#e8e0ff',
          lineHeight: 1.1,
        }}>
          Begin Your Sacred<br />
          <span className="gold-text" style={{ fontStyle: 'italic' }}>Journey</span>
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        alignItems: 'center',
      }}
      className="contact-grid"
      >
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(201,162,39,0.8)', marginBottom: 8 }}>
                YOUR NAME
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                required
                style={inputStyle}
                placeholder="Enter your name"
                onFocus={(e) => e.target.style.borderColor = '#c9a227'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(201,162,39,0.2)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(201,162,39,0.8)', marginBottom: 8 }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                required
                style={inputStyle}
                placeholder="your@email.com"
                onFocus={(e) => e.target.style.borderColor = '#c9a227'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(201,162,39,0.2)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(201,162,39,0.8)', marginBottom: 8 }}>
                YOUR MESSAGE
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                required
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                placeholder="Share what calls you to this path..."
                onFocus={(e) => e.target.style.borderColor = '#c9a227'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(201,162,39,0.2)'}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '16px 40px',
                background: sent ? 'linear-gradient(135deg, #2d8b55, #4caf50)' : 'linear-gradient(135deg, #c9a227, #f0d060)',
                border: 'none',
                borderRadius: 50,
                color: '#050510',
                fontSize: 13,
                letterSpacing: '0.15em',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: sent ? '0 0 30px rgba(76,175,80,0.5)' : '0 0 40px rgba(201,162,39,0.5)',
                transition: 'background 0.5s, box-shadow 0.5s',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {sent ? '✓ MESSAGE RECEIVED' : 'SEND MESSAGE →'}
            </motion.button>
          </form>
        </motion.div>

        {/* 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ height: 400, position: 'relative' }}
        >
          <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <PulseSphere />
            </Suspense>
          </Canvas>
          <div style={{
            position: 'absolute', bottom: 40, left: 0, right: 0,
            textAlign: 'center',
          }}>
            <p style={{ color: 'rgba(232,224,255,0.5)', fontSize: 13, letterSpacing: '0.1em' }}>
              ✦ We respond within 24 hours ✦
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
