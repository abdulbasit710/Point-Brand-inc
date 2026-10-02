import Marquee from '../ui/Marquee'
import { CLIENTS } from '../../data/content'

export default function ClientMarquee() {
  return (
    <section className="border-y border-line py-10">
      <p className="container-pb mb-6 text-center text-xs uppercase tracking-[0.25em] text-fg-muted">
        Trusted by ambitious teams
      </p>
      <Marquee items={CLIENTS} />
    </section>
  )
}
