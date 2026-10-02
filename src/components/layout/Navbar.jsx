import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { List, X, ArrowUpRight } from '@phosphor-icons/react'
import Logo from '../ui/Logo'
import ThemeToggle from '../ui/ThemeToggle'
import MagneticButton from '../ui/MagneticButton'
import { NAV } from '../../data/content'
import { EASE } from '../../lib/motion'

// entrance timing: the brand loader covers the page for ~1.7s + 0.6s fade,
// so the header drops in just as it clears and the links follow one by one
const HEADER_DELAY = 1.75
const LINKS_DELAY = 2.05

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const activeIndex = NAV.findIndex((n) => n.to === pathname)

  // ── mitosis hover pill: buds off the active pill, stretches to the
  // hovered link, retracts + merges home on leave. The two edges run on
  // separate springs (leading edge faster) which creates the gooey
  // cell-division stretch while it travels. ──
  const itemRefs = useRef([])
  const pillLeft = useMotionValue(0)
  const pillRight = useMotionValue(0)
  const pillWidth = useTransform([pillLeft, pillRight], ([a, b]) => Math.max(b - a, 0))
  const pillOpacity = useMotionValue(0)
  const pillAlive = useRef(false)

  const edgesOf = (i) => {
    const el = itemRefs.current[i]
    return el ? [el.offsetLeft, el.offsetLeft + el.offsetWidth] : null
  }

  const LEAD = { type: 'spring', stiffness: 520, damping: 30 } // leading edge
  const TRAIL = { type: 'spring', stiffness: 200, damping: 24 } // trailing edge

  const sendPillTo = (i) => {
    const target = edgesOf(i)
    if (!target) return
    // bud off: if hidden, materialise on the active pill (or in place)
    if (!pillAlive.current) {
      const src = edgesOf(activeIndex >= 0 ? activeIndex : i) || target
      pillLeft.set(src[0])
      pillRight.set(src[1])
      pillAlive.current = true
    }
    animate(pillOpacity, 1, { duration: 0.16 })
    const movingRight = target[0] >= pillLeft.get()
    animate(pillLeft, target[0], movingRight ? TRAIL : LEAD)
    animate(pillRight, target[1], movingRight ? LEAD : TRAIL)
  }

  const retractPill = () => {
    const home = edgesOf(activeIndex)
    if (home) {
      const movingRight = home[0] >= pillLeft.get()
      animate(pillLeft, home[0], movingRight ? TRAIL : LEAD)
      animate(pillRight, home[1], movingRight ? LEAD : TRAIL)
      // dissolve into the active pill as it arrives
      animate(pillOpacity, 0, {
        delay: 0.28,
        duration: 0.2,
        onComplete: () => { pillAlive.current = false },
      })
    } else {
      animate(pillOpacity, 0, {
        duration: 0.18,
        onComplete: () => { pillAlive.current = false },
      })
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: HEADER_DELAY }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-pb">
          <motion.div
            initial={false}
            animate={{ maxWidth: scrolled ? '46rem' : '120rem' }}
            transition={{ duration: 0.55, ease: EASE }}
            className={`mx-auto mt-3 flex w-full items-center justify-between rounded-full px-4 py-2.5 transition-colors duration-300 sm:px-5 ${
              scrolled ? 'glass shadow-card' : 'bg-transparent'
            }`}
          >
            <div data-header-logo className="w-fit">
              <Logo variant="mark" imgClassName="h-10" />
            </div>

            <nav className="relative hidden items-center gap-1 lg:flex" onMouseLeave={retractPill}>
              {/* mitosis hover pill — glass */}
              <motion.span
                aria-hidden
                className="glass pointer-events-none absolute inset-y-0 rounded-full"
                style={{ left: pillLeft, width: pillWidth, opacity: pillOpacity }}
              />
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  ref={(el) => { itemRefs.current[i] = el }}
                  onMouseEnter={() => sendPillTo(i)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: LINKS_DELAY + i * 0.08 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-panel border border-line"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: LINKS_DELAY + NAV.length * 0.08 }}
              className="flex items-center gap-2"
            >
              <ThemeToggle />
              <MagneticButton to="/contact" className="hidden sm:inline-flex !px-5 !py-2.5">
                Start a project <ArrowUpRight size={16} weight="bold" />
              </MagneticButton>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg lg:hidden cursor-pointer"
              >
                {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[var(--scrim)] backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="container-pb relative pt-28"
            >
              <ul className="flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center justify-between border-b border-line py-5 font-display text-3xl font-medium ${
                          isActive ? 'text-coral' : 'text-fg'
                        }`
                      }
                    >
                      {item.label}
                      <ArrowUpRight size={24} className="text-fg-muted" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <MagneticButton to="/contact" className="mt-8 w-full">
                Start a project <ArrowUpRight size={16} weight="bold" />
              </MagneticButton>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
