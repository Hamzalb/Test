import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const frameRef = useRef()

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    const interactives = document.querySelectorAll('button, a, [data-cursor]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameRef.current)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: hovering ? 6 : 8,
          height: hovering ? 6 : 8,
          borderRadius: '50%',
          background: '#c9a227',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'screen',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderRadius: '50%',
          border: `1px solid ${hovering ? 'rgba(201,162,39,0.8)' : 'rgba(201,162,39,0.4)'}`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9997,
          mixBlendMode: 'screen',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
      />
    </>
  )
}
