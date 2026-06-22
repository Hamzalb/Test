import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Philosophy from './components/Philosophy'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

const HERO_IMAGE = 'https://d8j0ntlcm91z4.cloudfront.net/user_3ExrkM2KHczaVNC4ovAKbarDwLO/hf_20260622_110657_d79a9e56-b07c-4803-bd3b-6a9f5a6bf114.png'
const MANDALA_IMAGE = 'https://d8j0ntlcm91z4.cloudfront.net/user_3ExrkM2KHczaVNC4ovAKbarDwLO/hf_20260622_110702_1e33b161-2c73-4561-b923-16e331c7a791.png'

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div style={{ background: '#050510', minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <Hero heroImageUrl={HERO_IMAGE} />
      <About />
      <Services />
      <Philosophy />
      <Gallery heroImageUrl={HERO_IMAGE} mandalaImageUrl={MANDALA_IMAGE} />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
