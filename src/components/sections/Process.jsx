import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { stagger } from '../../lib/motion'
import { PROCESS } from '../../data/content'

export default function Process() {
  return (
    <section className="container-pb py-24 sm:py-32">
      <SectionHeading
        align="center"
        title={<>A process built for <span className="text-gradient">momentum.</span></>}
        intro="No black boxes, no surprises. Four clear phases that keep us moving and keep you in the loop."
        className="mb-16"
      />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PROCESS.map((p) => (
          <motion.div
            key={p.no}
            variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className="group relative rounded-3xl border border-line bg-panel p-7 backdrop-blur-md transition-colors hover:border-coral/40"
          >
            <span className="font-display text-5xl font-bold text-transparent [-webkit-text-stroke:1px_var(--line)] transition-all group-hover:[-webkit-text-stroke:1px_transparent] group-hover:text-gradient">
              {p.no}
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
