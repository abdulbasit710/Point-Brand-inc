import { motion } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import PageHero from '../components/layout/PageHero'
import ServiceCard from '../components/ui/ServiceCard'
import Process from '../components/sections/Process'
import MagneticButton from '../components/ui/MagneticButton'
import Reveal from '../components/ui/Reveal'
import { stagger } from '../lib/motion'
import { SERVICES } from '../data/content'

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={['Everything', 'your', 'brand', 'needs', 'to', 'stand', 'out.']}
        intro="Five connected disciplines under one roof. Engage us for one, or hand us the whole brand — the more we own, the sharper it gets."
      />

      <section className="container-pb pb-8">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {SERVICES.map((s) => (
            <motion.div key={s.id} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
              <ServiceCard service={s} expanded />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Process />

      {/* Pricing hint band */}
      <section className="container-pb py-16">
        <Reveal className="border-gradient overflow-hidden rounded-3xl bg-panel p-10 text-center backdrop-blur-md sm:p-16">
          <p className="eyebrow mx-auto"><span className="h-1.5 w-1.5 rounded-full bg-coral" />Engagements from £8k</p>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Not sure which services you need? <span className="text-gradient">Let’s scope it together.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            A 30-minute call is usually enough to map the work and put a fixed price on it. No obligation, no jargon.
          </p>
          <MagneticButton to="/contact" className="mt-8">
            Book a discovery call <ArrowUpRight size={18} weight="bold" />
          </MagneticButton>
        </Reveal>
      </section>
    </>
  )
}
