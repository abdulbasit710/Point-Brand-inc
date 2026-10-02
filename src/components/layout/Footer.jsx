import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import Logo from '../ui/Logo'
import MagneticButton from '../ui/MagneticButton'
import Reveal from '../ui/Reveal'
import { COMPANY, NAV, SOCIALS, SERVICES } from '../../data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-violet/20 blur-[100px]" />

      {/* CTA band */}
      <div className="container-pb relative py-20">
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
            Let’s build something <span className="text-gradient">unmistakable.</span>
          </h2>
          <MagneticButton to="/contact" className="shrink-0">
            Start a project <ArrowUpRight size={18} weight="bold" />
          </MagneticButton>
        </Reveal>
      </div>

      {/* Link columns */}
      <div className="container-pb relative grid grid-cols-2 gap-10 border-t border-line py-14 md:grid-cols-4">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <div data-footer-logo className="w-fit">
            <Logo variant="full" imgClassName="h-20" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">{COMPANY.tagline}</p>
        </div>

        <FooterCol title="Navigate" links={NAV.map((n) => ({ label: n.label, to: n.to }))} />
        <FooterCol
          title="Services"
          links={SERVICES.slice(0, 5).map((s) => ({ label: s.title, to: '/services' }))}
        />
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">Connect</p>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-sm text-fg transition-colors hover:text-coral"
            >
              {s.label}
              <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
          <a href={`mailto:${COMPANY.email}`} className="mt-2 text-sm text-fg-muted hover:text-fg">
            {COMPANY.email}
          </a>
        </div>
      </div>

      <div className="container-pb relative flex flex-col items-center justify-between gap-3 border-t border-line py-7 text-xs text-fg-muted sm:flex-row">
        <p>© {year} {COMPANY.legal}. All rights reserved.</p>
        <p>{COMPANY.location}</p>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">{title}</p>
      {links.map((l, i) => (
        <Link key={i} to={l.to} className="text-sm text-fg transition-colors hover:text-coral">
          {l.label}
        </Link>
      ))}
    </div>
  )
}
