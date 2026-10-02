import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Magnetic button — subtly pulls toward the cursor. Renders as a Link, <a>, or <button>.
 */
export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type,
  ...rest
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  function handleMove(e) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
  const variants = {
    primary: 'bg-brand-gradient text-white shadow-glow hover:shadow-glow-lg',
    outline: 'border border-line text-fg hover:bg-panel',
    ghost: 'text-fg hover:text-coral',
  }

  const Comp = to ? motion(Link) : href ? motion.a : motion.button
  const compProps = to ? { to } : href ? { href, target: '_blank', rel: 'noreferrer' } : { type: type || 'button' }

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={`${base} ${variants[variant]} ${className}`}
      {...compProps}
      {...rest}
    >
      {children}
    </Comp>
  )
}
