import { Fragment, lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from '@phosphor-icons/react'
import MagneticButton from '../ui/MagneticButton'
import GradientBlobs from '../ui/GradientBlobs'
import { stagger, wordUp, EASE } from '../../lib/motion'
import { SERVICES } from '../../data/content'

// Interactive WebGL grid — lazy so Three.js stays out of the initial bundle
const CyberGrid = lazy(() => import('../ui/CyberGrid'))

const LINE_1 = ['Brands', 'that', 'refuse']
const LINE_2 = ['to', 'blend', 'in.']

export default function Hero() {
  const reduce = useReducedMotion()
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20">
      {/* Interactive cybernetic grid (falls back to ambient blobs) */}
      <Suspense fallback={<GradientBlobs />}>
        <CyberGrid />
      </Suspense>
      {/* Legibility + edge-fade overlays — theme-aware via --bg */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: 'linear-gradient(90deg, var(--bg) 0%, transparent 62%)' }} />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-2/5" style={{ background: 'linear-gradient(270deg, var(--bg), transparent)' }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28" style={{ background: 'linear-gradient(to bottom, var(--bg), transparent)' }} />

      <div className="container-pb relative">
        <div className="max-w-4xl">
          <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tightest sm:text-7xl lg:text-8xl">
            <motion.span variants={stagger(0.08, 0.2)} initial="hidden" animate="show" className="block">
              <span className="block overflow-hidden">
                {LINE_1.map((w, i) => (
                  <Fragment key={i}>
                    <motion.span variants={wordUp} className="inline-block">
                      {w}
                    </motion.span>{' '}
                  </Fragment>
                ))}
              </span>
              <span className="block overflow-hidden">
                {LINE_2.map((w, i) => (
                  <Fragment key={i}>
                    <motion.span variants={wordUp} className="inline-block text-gradient">
                      {w}
                    </motion.span>{' '}
                  </Fragment>
                ))}
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted"
          >
            We’re a full-service studio shaping logos, websites, graphics, 2D/3D animation and
            social campaigns for companies with something to prove.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.74 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton to="/contact">
              Start a project <ArrowUpRight size={18} weight="bold" />
            </MagneticButton>
            <MagneticButton to="/work" variant="outline">
              See our work
            </MagneticButton>
          </motion.div>

          {/* service tags */}
          <motion.ul
            variants={stagger(0.06, 0.9)}
            initial="hidden"
            animate="show"
            className="mt-12 flex flex-wrap gap-2"
          >
            {SERVICES.map((s) => (
              <motion.li
                key={s.id}
                variants={wordUp}
                className="rounded-full border border-line bg-panel px-4 py-2 text-xs font-medium text-fg-muted backdrop-blur-md"
              >
                {s.title}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-muted sm:flex"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span animate={reduce ? {} : { y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  )
}
