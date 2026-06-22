import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import SacredGeometry from './SacredGeometry'
import ParticleField from './ParticleField'
import FloatingOrbs from './FloatingOrbs'
import MandalaRing from './MandalaRing'
import NebulaShader from './NebulaShader'

function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.8}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.6}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0008, 0.0008)}
      />
      <Vignette eskil={false} offset={0.35} darkness={0.75} />
    </EffectComposer>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <NebulaShader />
      <Stars radius={100} depth={60} count={2000} factor={4} saturation={0} fade speed={0.3} />
      <ParticleField count={7000} />
      <SacredGeometry />
      <MandalaRing />
      <FloatingOrbs />
      <Effects />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
