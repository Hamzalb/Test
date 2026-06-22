import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Torus } from '@react-three/drei'
import * as THREE from 'three'

function WireRing({ radius, tube, color, speed, axis = 'y' }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation[axis] = t * speed
    ref.current.rotation.x = t * speed * 0.3
  })
  return (
    <Torus ref={ref} args={[radius, tube, 2, 64]}>
      <meshBasicMaterial color={color} wireframe opacity={0.5} transparent />
    </Torus>
  )
}

function GlowOrb({ position, scale, color }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * 0.7 + position[0]) * 0.3
    ref.current.rotation.y = t * 0.4
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

export default function SacredGeometry() {
  const groupRef = useRef()
  const knotRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.08
    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.15
      knotRef.current.rotation.z = t * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central torus knot */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.1, 0.3, 128, 20, 2, 3]} />
        <meshStandardMaterial
          color="#c9a227"
          emissive="#c9a227"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <torusKnotGeometry args={[1.12, 0.31, 128, 20, 2, 3]} />
        <meshBasicMaterial color="#f0d060" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Orbiting rings */}
      <WireRing radius={2.2} tube={0.01} color="#c9a227" speed={0.25} axis="y" />
      <WireRing radius={2.5} tube={0.008} color="#00e5ff" speed={-0.18} axis="x" />
      <WireRing radius={2.8} tube={0.006} color="#e8e0ff" speed={0.12} axis="z" />

      {/* Floating orbs */}
      <GlowOrb position={[2.8, 0.5, 0]} scale={0.5} color="#c9a227" />
      <GlowOrb position={[-2.8, -0.5, 0.5]} scale={0.4} color="#00e5ff" />
      <GlowOrb position={[0, 2.8, -0.5]} scale={0.35} color="#f0d060" />
      <GlowOrb position={[0, -2.8, 0.8]} scale={0.45} color="#e8e0ff" />

      {/* Point lights for atmosphere */}
      <pointLight color="#c9a227" intensity={8} distance={6} position={[0, 0, 0]} />
      <pointLight color="#00e5ff" intensity={4} distance={8} position={[3, 2, 1]} />
    </group>
  )
}
