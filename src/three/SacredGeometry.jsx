import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AnimatedRing({ radius, tube, radialSegs, speed, tiltX, tiltZ, color, opacity }) {
  const ref = useRef()
  const baseRotation = useMemo(() => ({
    x: tiltX,
    z: tiltZ,
  }), [tiltX, tiltZ])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * speed
    ref.current.rotation.x = baseRotation.x + Math.sin(state.clock.elapsedTime * 0.2) * 0.05
  })
  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, tube, 4, radialSegs]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} wireframe={false} />
    </mesh>
  )
}

function CoreGeometry() {
  const outerRef = useRef()
  const innerRef = useRef()
  const wireRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.12
      outerRef.current.rotation.y = t * 0.18
      outerRef.current.rotation.z = t * 0.07
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.2
      innerRef.current.rotation.y = t * 0.25
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.12
      wireRef.current.rotation.y = t * 0.18
      wireRef.current.rotation.z = t * 0.07
    }
  })

  return (
    <>
      {/* Solid torus knot */}
      <mesh ref={outerRef}>
        <torusKnotGeometry args={[1.2, 0.35, 200, 24, 2, 3]} />
        <meshStandardMaterial
          color="#c9a227"
          emissive="#c9a227"
          emissiveIntensity={1.2}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Wireframe overlay slightly larger */}
      <mesh ref={wireRef} scale={1.02}>
        <torusKnotGeometry args={[1.2, 0.35, 200, 24, 2, 3]} />
        <meshBasicMaterial color="#f0d060" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Inner counter-rotating gem */}
      <mesh ref={innerRef} scale={0.45}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2}
          metalness={1}
          roughness={0}
          wireframe
        />
      </mesh>
    </>
  )
}

export default function SacredGeometry() {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.05
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.15
  })

  return (
    <group ref={groupRef}>
      <CoreGeometry />

      {/* Orbital rings at various tilts */}
      <AnimatedRing radius={2.4} tube={0.008} radialSegs={128} speed={0.3}  tiltX={0}          tiltZ={0}          color="#c9a227" opacity={0.7} />
      <AnimatedRing radius={2.8} tube={0.006} radialSegs={128} speed={-0.22} tiltX={Math.PI/4} tiltZ={0}          color="#00e5ff" opacity={0.5} />
      <AnimatedRing radius={3.2} tube={0.005} radialSegs={128} speed={0.16}  tiltX={Math.PI/6} tiltZ={Math.PI/5} color="#c9a227" opacity={0.35} />
      <AnimatedRing radius={3.7} tube={0.004} radialSegs={128} speed={-0.12} tiltX={Math.PI/3} tiltZ={Math.PI/4} color="#f0d060" opacity={0.25} />
      <AnimatedRing radius={4.2} tube={0.003} radialSegs={128} speed={0.09}  tiltX={Math.PI/2} tiltZ={Math.PI/8} color="#e8e0ff" opacity={0.15} />

      {/* Lights */}
      <pointLight color="#c9a227" intensity={15} distance={8} position={[0, 0, 0]} />
      <pointLight color="#00e5ff" intensity={6} distance={10} position={[3, 2, 2]} />
      <pointLight color="#c9a227" intensity={5} distance={8} position={[-3, -2, -2]} />
    </group>
  )
}
