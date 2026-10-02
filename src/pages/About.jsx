import { motion, useReducedMotion } from 'framer-motion'
import { Lightning, Heart, Eye, Handshake } from '@phosphor-icons/react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import StatCounter from '../components/ui/StatCounter'
import { LogoMark } from '../components/ui/Logo'
import { stagger } from '../lib/motion'
import { COMPANY, STATS } from '../data/content'

const VALUES = [
  { icon: Lightning, title: 'Bold by default', text: 'Safe work gets ignored. We push for the idea that makes people stop, not the one that ticks a box.' },
  { icon: Eye, title: 'Craft obsessed', text: 'Kerning, easing, the last 5% — the details no one can name but everyone can feel.' },
  { icon: Handshake, title: 'True partners', text: 'We act like it’s our brand on the line. Honest advice, even when it’s not what you hoped to hear.' },
  { icon: Heart, title: 'In it for the long run', text: '98% of clients stay. We build relationships, not just deliverables.' },
]

export default function About() {
  const reduce = useReducedMotion()
  return (
    <>
      <PageHero
        eyebrow="About Point Brand"
        title={['A', 'studio', 'with', 'a', 'point', 'of', 'view.']}
        intro={`Founded in ${COMPANY.founded} in ${COMPANY.location}, we’re a tight team of strategists, designers, animators and marketers who believe a brand is only as good as the decisions behind it.`}
      />

      {/* Story */}
      <section className="container-pb py-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="border-gradient relative grid aspect-square place-items-center overflow-hidden rounded-3xl bg-panel backdrop-blur-md">
              <div className="absolute inset-0 bg-brand-radial opacity-60" />
              <motion.div animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
                <LogoMark className="h-40 w-40" />
              </motion.div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Our story"
              title={<>We named ourselves after the <span className="text-gradient">whole job.</span></>}
            />
            <Reveal as="p" delay={0.1} className="leading-relaxed text-fg-muted">
              A point is direction, precision and the moment something clicks. That’s what we do for brands —
              find the sharp idea, then express it flawlessly across every surface, from a logo to a launch film.
            </Reveal>
            <Reveal as="p" delay={0.15} className="leading-relaxed text-fg-muted">
              We keep the team deliberately small and senior. You work with the people doing the work — no layers,
              no account-manager telephone game, no junior bait-and-switch.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="container-pb py-8">
        <div className="grid grid-cols-2 gap-y-10 rounded-3xl border border-line bg-panel px-6 py-10 backdrop-blur-md md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col items-center text-center">
              <span className="font-display text-4xl font-semibold text-gradient sm:text-5xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </span>
              <span className="mt-2 text-sm text-fg-muted">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-pb py-20">
        <SectionHeading
          align="center"
          eyebrow="What we believe"
          title={<>Principles that <span className="text-gradient">shape the work.</span></>}
          className="mb-14"
        />
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VALUES.map((v) => (
            <motion.div
              key={v.title}
              variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="rounded-3xl border border-line bg-panel p-7 backdrop-blur-md"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <v.icon size={24} weight="duotone" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{v.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  )
}
