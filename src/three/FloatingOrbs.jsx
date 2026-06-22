import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Orb({ index, radius, speed, color, size }) {
  const ref = useRef()
  const offset = useMemo(() => index * (Math.PI * 2 / 8), [index])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.sin(t * 1.3) * (radius * 0.4)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.8}
        roughness={0}
        metalness={0.5}
      />
      <pointLight color={color} intensity={2} distance={2} />
    </mesh>
  )
}

export default function FloatingOrbs() {
  const orbs = [
    { radius: 4.5, speed: 0.15, color: '#c9a227', size: 0.08 },
    { radius: 4.0, speed: -0.12, color: '#00e5ff', size: 0.06 },
    { radius: 5.0, speed: 0.09, color: '#f0d060', size: 0.07 },
    { radius: 3.5, speed: -0.18, color: '#e8e0ff', size: 0.05 },
    { radius: 5.5, speed: 0.11, color: '#c9a227', size: 0.09 },
    { radius: 4.2, speed: -0.14, color: '#00e5ff', size: 0.055 },
    { radius: 3.8, speed: 0.16, color: '#f0d060', size: 0.065 },
    { radius: 5.2, speed: -0.1, color: '#e8e0ff', size: 0.075 },
  ]

  return (
    <group>
      {orbs.map((orb, i) => (
        <Orb key={i} index={i} {...orb} />
      ))}
    </group>
  )
}
