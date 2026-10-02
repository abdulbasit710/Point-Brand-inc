import Reveal from '../ui/Reveal'
import StatCounter from '../ui/StatCounter'
import { STATS } from '../../data/content'

export default function Stats() {
  return (
    <section className="container-pb py-20">
      <div className="border-gradient grid grid-cols-2 gap-y-10 rounded-3xl bg-panel px-6 py-12 backdrop-blur-md sm:px-10 md:grid-cols-4">
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
  )
}
