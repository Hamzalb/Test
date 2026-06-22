import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Ring({ innerR, outerR, segments, speed, color, opacity, y = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <ringGeometry args={[innerR, outerR, segments]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  )
}

function DotRing({ radius, count, color, speed, y = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * speed
  })

  const positions = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    positions.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius])
  }

  return (
    <group ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

export default function MandalaRing() {
  return (
    <group>
      <Ring innerR={1.6} outerR={1.62} segments={64} speed={0.08} color="#c9a227" opacity={0.6} />
      <Ring innerR={2.0} outerR={2.02} segments={64} speed={-0.06} color="#00e5ff" opacity={0.4} />
      <Ring innerR={2.4} outerR={2.42} segments={64} speed={0.05} color="#c9a227" opacity={0.3} />
      <Ring innerR={3.0} outerR={3.02} segments={64} speed={-0.04} color="#f0d060" opacity={0.25} />
      <Ring innerR={3.6} outerR={3.62} segments={64} speed={0.03} color="#e8e0ff" opacity={0.2} />
      <DotRing radius={1.8} count={24} color="#c9a227" speed={0.1} />
      <DotRing radius={2.2} count={32} color="#00e5ff" speed={-0.07} />
      <DotRing radius={3.3} count={48} color="#f0d060" speed={0.04} />
    </group>
  )
}
