import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ServicesTicker from './components/sections/ServicesTicker'
import ScrollProgress from './components/ui/ScrollProgress'
import PageTransition from './components/layout/PageTransition'
import Loader from './components/ui/Loader'
// Lazy — pulls Three.js, keep it out of the initial bundle
const GhostLogo = lazy(() => import('./components/ui/GhostLogo'))
import { LogoMark } from './components/ui/Logo'

import Home from './pages/Home'
// Route-level code splitting — these load on demand to keep first paint light.
const Services = lazy(() => import('./pages/Services'))
const Work = lazy(() => import('./pages/Work'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="grid min-h-[60svh] place-items-center">
      <LogoMark className="h-12 w-12 animate-pulse" />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const lenisRef = useRef(null)
  const [loading, setLoading] = useState(true)

  // First-load brand loader — hides after a brief beat + window load
  useEffect(() => {
    let cancelled = false
    const minTime = new Promise((r) => setTimeout(r, 1700))
    const onLoad = new Promise((r) => {
      if (document.readyState === 'complete') r()
      else window.addEventListener('load', r, { once: true })
    })
    Promise.all([minTime, onLoad]).then(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [])

  // Lock scroll while the loader is up
  useEffect(() => {
    document.documentElement.style.overflow = loading ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [loading])

  // Smooth scroll (skipped when the user prefers reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis
    if (import.meta.env.DEV) window.__lenis = lenis
    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <AnimatePresence>{loading && <Loader word="Rendering" />}</AnimatePresence>
      <Suspense fallback={null}>
        <GhostLogo />
      </Suspense>
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <ServicesTicker />
      <Footer />
    </>
  )
}
