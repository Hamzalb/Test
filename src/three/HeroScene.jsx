import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import SacredGeometry from './SacredGeometry'
import ParticleField from './ParticleField'
import FloatingOrbs from './FloatingOrbs'
import MandalaRing from './MandalaRing'

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#c9a227" />
      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
      <ParticleField count={5000} />
      <SacredGeometry />
      <MandalaRing />
      <FloatingOrbs />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
