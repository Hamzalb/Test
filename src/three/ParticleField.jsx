import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 6000 }) {
  const ref = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const gold = new THREE.Color('#c9a227')
    const teal = new THREE.Color('#00e5ff')
    const white = new THREE.Color('#e8e0ff')
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 18 + 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const t = Math.random()
      const c = t < 0.5 ? gold.clone().lerp(white, t * 2) : white.clone().lerp(teal, (t - 0.5) * 2)
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.0006
    ref.current.rotation.x += 0.0002
    const t = state.clock.elapsedTime
    ref.current.rotation.z = Math.sin(t * 0.08) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors sizeAttenuation transparent opacity={0.75} />
    </points>
  )
}
