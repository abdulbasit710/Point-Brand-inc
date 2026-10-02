import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../lib/motion'

/** Scroll-reveal wrapper. Pass `as` to change the element, `delay` to offset. */
export default function Reveal({ children, delay = 0, as = 'div', className = '', y = 28, ...rest }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export { fadeUp }
