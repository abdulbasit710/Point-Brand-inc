import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'

/**
 * CircularGallery — a 3D rotating ring of service cards.
 *
 * Designed to sit inside a pinned (sticky) section: pass `trackRef`
 * pointing at the tall wrapper section, and scrolling through that
 * wrapper rotates the ring one full turn (all cards) while the page
 * appears frozen. Scrolling back rewinds it.
 *
 * Hovering a card reveals a liquid-glass panel (heading, blurb,
 * Enquire CTA) over the lower half of the card.
 */
export default function CircularGallery({ items, trackRef, radius = 460, className = '' }) {
  const [rotation, setRotation] = useState(0)

  // Rotation driven by progress through the pinned track section
  useEffect(() => {
    const update = () => {
      const track = trackRef?.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return
      const progress = Math.min(1, Math.max(0, -rect.top / total))
      // rotate through one full turn — every card passes the front
      setRotation(-progress * 360)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [trackRef])

  const anglePerItem = 360 / items.length

  return (
    <div
      role="region"
      aria-label="Services gallery"
      className={`relative flex h-full w-full items-center justify-center ${className}`}
      style={{ perspective: '2000px' }}
    >
      <div
        className="relative h-full w-full"
        style={{ transform: `rotateY(${rotation}deg)`, transformStyle: 'preserve-3d' }}
      >
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem
          const relativeAngle = ((itemAngle + rotation) % 360 + 360) % 360
          const normalized = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle)
          const opacity = Math.max(0.3, 1 - normalized / 180)

          return (
            <div
              key={item.id}
              role="group"
              aria-label={item.title}
              className="group absolute left-1/2 top-1/2 -ml-[150px] -mt-[200px] h-[400px] w-[300px]"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                opacity,
                transition: 'opacity 0.3s linear',
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line bg-panel shadow-glass backdrop-blur-lg">
                <img
                  src={item.photo}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Always-visible label strip */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white transition-opacity duration-300 group-hover:opacity-0">
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] opacity-70">{item.no}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{item.title}</h3>
                </div>

                {/* Liquid-glass hover panel — half the card height */}
                <div
                  className="pb-liquid-glass absolute inset-x-0 bottom-0 flex h-1/2 translate-y-4 flex-col justify-end gap-2 rounded-t-2xl p-5 opacity-0 transition-all duration-[400ms] ease-out group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <h3 className="font-display text-lg font-semibold leading-snug text-white">{item.title}</h3>
                  <p className="line-clamp-3 text-xs leading-relaxed text-white/80">{item.excerpt}</p>
                  <Link
                    to={`/contact?service=${item.id}`}
                    className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-105"
                  >
                    Enquire <ArrowUpRight size={13} weight="bold" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
