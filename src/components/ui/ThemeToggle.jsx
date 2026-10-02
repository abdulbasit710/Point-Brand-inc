import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from '@phosphor-icons/react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-panel cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/70 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -12, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 12, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {isDark ? <Moon size={18} weight="fill" /> : <Sun size={18} weight="fill" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
