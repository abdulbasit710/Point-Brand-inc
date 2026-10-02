import { useRef } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import SectionHeading from '../ui/SectionHeading'
import MagneticButton from '../ui/MagneticButton'
import CircularGallery from '../ui/CircularGallery'
import { SERVICES } from '../../data/content'

export default function ServicesPreview() {
  // Tall scroll track — the inner viewport pins (sticky) while the user
  // scrolls through it, and that scroll drives the gallery rotation.
  const trackRef = useRef(null)

  return (
    <section ref={trackRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20">
        <div className="container-pb flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
              title={<>Six disciplines, <span className="text-gradient">one studio.</span></>}
            intro="Keep scrolling — the ring spins through everything we do. Hover a card to explore."
          />
          <MagneticButton to="/services" variant="outline" className="shrink-0">
            All services <ArrowRight size={16} weight="bold" />
          </MagneticButton>
        </div>

        {/* 3D rotating services ring */}
        <div className="relative mt-6 h-[440px] sm:h-[480px]">
          <CircularGallery items={SERVICES} trackRef={trackRef} radius={460} />
          {/* soft edge fades so the ring melts into the page */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40" style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }} />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40" style={{ background: 'linear-gradient(270deg, var(--bg), transparent)' }} />
        </div>
      </div>
    </section>
  )
}
