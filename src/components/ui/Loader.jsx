import { motion } from 'framer-motion'

/**
 * Full-screen brand loader — a rotating coral→violet glow halo behind
 * letters that light up in sequence. Theme-aware (uses --bg / --fg).
 */
export default function Loader({ word = 'Crafting' }) {
  const letters = [...word, '.', '.', '.']
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] grid place-items-center bg-bg"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-12">
        <img src="/logo-mark.png" alt="" aria-hidden className="h-[84px] w-[84px] animate-pulse" />
        <div className="relative flex items-center justify-center">
          <span className="pb-loader-ring" aria-hidden />
          <span className="relative z-10 flex font-display text-4xl font-semibold tracking-[0.18em] sm:text-5xl">
            {letters.map((ch, i) => (
              <span key={i} className="pb-loader-letter" style={{ animationDelay: `${i * 0.09}s` }}>
                {ch}
              </span>
            ))}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
