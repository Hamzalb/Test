import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Orb({ index, orbit, speed, size, color, phaseOffset }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + phaseOffset
    ref.current.position.x = Math.cos(t) * orbit.rx
    ref.current.position.z = Math.sin(t) * orbit.rz
    ref.current.position.y = Math.sin(t * orbit.yFreq + phaseOffset) * orbit.ry
    ref.current.rotation.y += 0.02
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        roughness={0}
        metalness={0.8}
        transparent
        opacity={0.9}
      />
      <pointLight color={color} intensity={3} distance={3} decay={2} />
    </mesh>
  )
}

export default function FloatingOrbs() {
  const orbs = [
    { orbit: { rx: 5.2, rz: 4.8, ry: 1.2, yFreq: 1.3 }, speed: 0.12, size: 0.09, color: '#c9a227', phaseOffset: 0 },
    { orbit: { rx: 4.5, rz: 5.0, ry: 1.5, yFreq: 0.8 }, speed: -0.10, size: 0.07, color: '#00e5ff', phaseOffset: 1.2 },
    { orbit: { rx: 5.8, rz: 4.2, ry: 0.9, yFreq: 1.6 }, speed: 0.08, size: 0.08, color: '#f0d060', phaseOffset: 2.4 },
    { orbit: { rx: 4.0, rz: 5.5, ry: 1.8, yFreq: 1.1 }, speed: -0.14, size: 0.06, color: '#e8e0ff', phaseOffset: 3.6 },
    { orbit: { rx: 6.0, rz: 4.5, ry: 1.3, yFreq: 0.9 }, speed: 0.09, size: 0.085, color: '#c9a227', phaseOffset: 0.7 },
    { orbit: { rx: 4.8, rz: 5.2, ry: 1.0, yFreq: 1.4 }, speed: -0.11, size: 0.065, color: '#00e5ff', phaseOffset: 1.9 },
    { orbit: { rx: 5.5, rz: 4.0, ry: 1.6, yFreq: 1.2 }, speed: 0.13, size: 0.075, color: '#f0d060', phaseOffset: 3.1 },
    { orbit: { rx: 4.2, rz: 5.8, ry: 2.0, yFreq: 0.7 }, speed: -0.09, size: 0.055, color: '#e8e0ff', phaseOffset: 4.5 },
  ]

  return (
    <group>
      {orbs.map((o, i) => <Orb key={i} index={i} {...o} />)}
    </group>
  )
}
