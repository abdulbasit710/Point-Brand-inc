import { motion } from 'framer-motion'
import { pageVariants } from '../../lib/motion'

/** Wraps each route so AnimatePresence can animate enter/exit between pages. */
export default function PageTransition({ children }) {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.main>
  )
}
