import { motion } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import GlowCard from './GlowCard'

/** Visual portfolio tile with a pointer-tracking glow border. */
export default function WorkCard({ work, index = 0, className = '' }) {
  return (
    <GlowCard className={className}>
      <motion.a
        href="#"
        onClick={(e) => e.preventDefault()}
        whileHover="hover"
        className="group relative block overflow-hidden rounded-[22px]"
      >
        {/* media */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <motion.div
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 bg-gradient-to-br ${work.tint}`}
          />
          {/* grain + vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent,rgba(0,0,0,0.45))]" />
          <span className="absolute left-6 top-5 font-display text-7xl font-bold text-white/20">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="absolute bottom-5 right-5 grid h-12 w-12 translate-y-3 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={20} weight="bold" />
          </span>
        </div>

        {/* meta */}
        <div className="flex items-center justify-between gap-4 bg-panel px-6 py-5 backdrop-blur-md">
          <div>
            <h3 className="font-display text-lg font-semibold">{work.title}</h3>
            <p className="text-sm text-fg-muted">{work.category}</p>
          </div>
          <span className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-fg-muted">{work.year}</span>
        </div>
      </motion.a>
    </GlowCard>
  )
}
