import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import SectionHeading from '../ui/SectionHeading'
import WorkCard from '../ui/WorkCard'
import MagneticButton from '../ui/MagneticButton'
import { stagger } from '../../lib/motion'
import { WORK } from '../../data/content'

export default function WorkPreview() {
  const featured = WORK.slice(0, 4)
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-coral/10 blur-[100px]" />
      <div className="container-pb">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title={<>Recent things we’re <span className="text-gradient">proud of.</span></>}
            intro="A glimpse at how strategy turns into identities, sites and campaigns that move the numbers."
          />
          <MagneticButton to="/work" variant="outline" className="shrink-0">
            View all work <ArrowRight size={16} weight="bold" />
          </MagneticButton>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {featured.map((w, i) => (
            <motion.div key={w.id} variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>
              <WorkCard work={w} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
