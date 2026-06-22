import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function PrecessionRing({ radius, tube, segments, speedY, speedX, color, opacity, tilt }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * speedY
    ref.current.rotation.x = tilt + Math.sin(t * 0.15) * 0.03
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 3, segments]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  )
}

function DotOrbit({ radius, count, color, speedY, size, tilt }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      pos.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return pos
  }, [radius, count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * speedY
    ref.current.rotation.x = tilt
  })

  return (
    <group ref={ref}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[size, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function MandalaRing() {
  return (
    <group>
      <PrecessionRing radius={1.8} tube={0.006} segments={128} speedY={0.14}  speedX={0.02} color="#c9a227" opacity={0.6} tilt={0} />
      <PrecessionRing radius={2.2} tube={0.005} segments={128} speedY={-0.10} speedX={0.015} color="#00e5ff" opacity={0.45} tilt={0.1} />
      <PrecessionRing radius={2.6} tube={0.004} segments={128} speedY={0.08}  speedX={0.01} color="#c9a227" opacity={0.3} tilt={0.2} />
      <PrecessionRing radius={3.1} tube={0.003} segments={128} speedY={-0.07} speedX={0.02} color="#f0d060" opacity={0.2} tilt={-0.1} />
      <PrecessionRing radius={3.8} tube={0.002} segments={128} speedY={0.05}  speedX={0.01} color="#e8e0ff" opacity={0.15} tilt={0.05} />
      <DotOrbit radius={2.0} count={36} color="#c9a227" speedY={0.16} size={0.016} tilt={0} />
      <DotOrbit radius={2.4} count={48} color="#00e5ff" speedY={-0.12} size={0.012} tilt={0.15} />
      <DotOrbit radius={3.4} count={64} color="#f0d060" speedY={0.07} size={0.009} tilt={-0.1} />
    </group>
  )
}
