import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quotes, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import SectionHeading from '../ui/SectionHeading'
import { TESTIMONIALS } from '../../data/content'
import { EASE } from '../../lib/motion'

export default function Testimonials() {
  const [[i, dir], setState] = useState([0, 0])
  const t = TESTIMONIALS[i]
  const paginate = (d) => {
    const next = (i + d + TESTIMONIALS.length) % TESTIMONIALS.length
    setState([next, d])
  }

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-violet/15 blur-[90px]" />
      <div className="container-pb">
        <SectionHeading
          align="center"
          title={<>What clients <span className="text-gradient">actually say.</span></>}
          className="mb-14"
        />

        <div className="relative mx-auto max-w-3xl">
          <Quotes size={56} weight="fill" className="mx-auto mb-6 text-coral/40" />
          <div className="relative min-h-[12rem]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="text-center"
              >
                <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">“{t.quote}”</p>
                <footer className="mt-7">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-fg-muted">{t.role}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button onClick={() => paginate(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-panel cursor-pointer">
              <ArrowLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setState([idx, idx > i ? 1 : -1])}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${idx === i ? 'w-7 bg-brand-gradient' : 'w-2 bg-line'}`}
                />
              ))}
            </div>
            <button onClick={() => paginate(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-panel cursor-pointer">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
