import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from '@phosphor-icons/react'
import ServiceIcon from './ServiceIcon'

export default function ServiceCard({ service, expanded = false }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border-gradient group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl bg-panel p-7 backdrop-blur-md"
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-coral/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
          <ServiceIcon name={service.icon} size={24} />
        </span>
        <span className="font-display text-sm font-medium text-fg-muted">{service.no}</span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-semibold">{service.title}</h3>
        <p className="text-sm leading-relaxed text-fg-muted">{service.excerpt}</p>
      </div>

      {expanded && (
        <ul className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-center gap-2 text-sm text-fg">
              <Check size={15} weight="bold" className="text-coral" /> {d}
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/contact"
        className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-fg transition-colors group-hover:text-coral"
      >
        Enquire
        <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.article>
  )
}
