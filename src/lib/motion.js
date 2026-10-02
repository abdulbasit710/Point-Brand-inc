// Shared Framer Motion variants & easings — keeps motion consistent everywhere.

export const EASE = [0.16, 1, 0.3, 1] // expo-out: smooth, premium

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

// Parent that staggers children
export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

// Per-letter / per-word reveal for headlines
export const wordUp = {
  hidden: { opacity: 0, y: '0.5em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

// Page-transition variants (used by PageTransition)
export const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35, ease: EASE } },
}

export const viewportOnce = { once: true, amount: 0.25 }
