import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/layout/PageHero'
import WorkCard from '../components/ui/WorkCard'
import { WORK } from '../data/content'

const FILTERS = ['All', 'Brand Identity', 'Web', 'Animation', 'Social']

export default function Work() {
  const [filter, setFilter] = useState('All')
  const filtered =
    filter === 'All' ? WORK : WORK.filter((w) => w.category.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={['Work', 'that', 'earns', 'attention.']}
        intro="A selection of brands, sites, films and campaigns. Real case studies on request — these tiles are a taste of the range."
      />

      <section className="container-pb pb-24">
        {/* filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors cursor-pointer ${
                filter === f ? 'border-transparent bg-brand-gradient text-white' : 'border-line text-fg-muted hover:text-fg'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((w, i) => (
              <motion.div
                key={w.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <WorkCard work={w} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-fg-muted">No projects in this category yet — check back soon.</p>
        )}
      </section>
    </>
  )
}
