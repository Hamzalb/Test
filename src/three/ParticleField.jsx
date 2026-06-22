import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
uniform float uTime;
uniform float uSize;
attribute float aRandomness;
attribute float aScale;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Slight orbital drift
  float angle = atan(modelPosition.x, modelPosition.z);
  float distCenter = length(modelPosition.xz);
  float angleOffset = (1.0 / distCenter) * uTime * 0.04;
  angle += angleOffset;
  modelPosition.x = cos(angle) * distCenter;
  modelPosition.z = sin(angle) * distCenter;

  // Twinkle
  float twinkle = sin(uTime * 2.0 + aRandomness * 6.28318) * 0.5 + 0.5;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  gl_PointSize = uSize * aScale * (1.0 / -viewPosition.z) * (0.6 + twinkle * 0.4);

  vColor = color;
  vAlpha = 0.4 + twinkle * 0.6;
}
`

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float dist = length(gl_PointCoord - 0.5);
  if (dist > 0.5) discard;

  // Soft circular particle
  float alpha = (1.0 - (dist * 2.0)) * vAlpha;
  alpha = pow(alpha, 1.5);

  // Bright core
  float core = 1.0 - smoothstep(0.0, 0.15, dist);
  vec3 finalColor = mix(vColor, vec3(1.0), core * 0.6);

  gl_FragColor = vec4(finalColor, alpha);
}
`

export default function ParticleField({ count = 8000 }) {
  const ref = useRef()

  const [positions, colors, randomness, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const rnd = new Float32Array(count)
    const scl = new Float32Array(count)

    const palette = [
      new THREE.Color('#c9a227'),
      new THREE.Color('#f0d060'),
      new THREE.Color('#00e5ff'),
      new THREE.Color('#e8e0ff'),
      new THREE.Color('#ffffff'),
    ]

    for (let i = 0; i < count; i++) {
      // Distribute in layered shells
      const shell = Math.floor(Math.random() * 3)
      const r = shell === 0 ? Math.random() * 4 + 1
               : shell === 1 ? Math.random() * 6 + 5
               : Math.random() * 8 + 11

      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      pos[i * 3 + 2] = r * Math.cos(phi)

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b

      rnd[i] = Math.random()
      scl[i] = Math.random() * 2 + 0.5
    }
    return [pos, col, rnd, scl]
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.material.uniforms.uTime.value = state.clock.elapsedTime
    ref.current.rotation.y += 0.0003
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-aRandomness" array={randomness} count={count} itemSize={1} />
        <bufferAttribute attach="attributes-aScale" array={scales} count={count} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 }, uSize: { value: 160 } }}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
