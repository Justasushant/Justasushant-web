import { useEffect } from 'react'
import { useLocation } from 'react-router'
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import LabShowcase from '../components/LabShowcase.jsx'
import Work from '../components/Work.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import LabBanner from '../components/LabBanner.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  const { hash } = useLocation()

  // Scroll to /#section links, including when arriving from another page
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
  }, [hash])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LabShowcase />
        <Work />
        <About />
        <LabBanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
