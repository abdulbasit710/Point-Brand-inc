import { Fragment } from 'react'
import { motion } from 'framer-motion'
import GradientBlobs from '../ui/GradientBlobs'
import { stagger, wordUp, EASE } from '../../lib/motion'

/** Standard hero band for inner pages. `title` may be a string or array of words. */
export default function PageHero({ eyebrow, title, intro, children }) {
  const words = Array.isArray(title) ? title : String(title).split(' ')
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <GradientBlobs />
      <div className="container-pb relative">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          variants={stagger(0.06, 0.1)}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1] tracking-tightest sm:text-6xl lg:text-7xl"
        >
          {words.map((w, i) => (
            <Fragment key={i}>
              <motion.span variants={wordUp} className="inline-block">
                {w}
              </motion.span>{' '}
            </Fragment>
          ))}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted"
          >
            {intro}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
