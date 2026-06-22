import { useEffect, useState, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Philosophy from './components/Philosophy'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMAGE  = 'https://d8j0ntlcm91z4.cloudfront.net/user_3ExrkM2KHczaVNC4ovAKbarDwLO/hf_20260622_114245_c7c05e49-92c4-4ec2-8c3a-c3060ca3655a.png'
const HERO_IMAGE2 = 'https://d8j0ntlcm91z4.cloudfront.net/user_3ExrkM2KHczaVNC4ovAKbarDwLO/hf_20260622_110657_d79a9e56-b07c-4803-bd3b-6a9f5a6bf114.png'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  const handlePreloaderDone = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    if (!loaded) return

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Section reveal animations
    const sections = document.querySelectorAll('.reveal-section')
    sections.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          }
        }
      )
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [loaded])

  return (
    <>
      <Preloader onComplete={handlePreloaderDone} />

      {loaded && (
        <>
          <Cursor />
          <div style={{ background: '#050510', minHeight: '100vh', cursor: 'none' }}>
            <Navbar />
            <Hero heroImageUrl={HERO_IMAGE} heroImageUrl2={HERO_IMAGE2} />
            <div className="reveal-section"><About /></div>
            <div className="reveal-section"><Services /></div>
            <div className="reveal-section"><Philosophy /></div>
            <div className="reveal-section"><Gallery /></div>
            <div className="reveal-section"><Testimonials /></div>
            <div className="reveal-section"><Contact /></div>
            <Footer />
          </div>
        </>
      )}
    </>
  )
}
