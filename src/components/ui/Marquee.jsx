/** Infinite horizontal marquee. Duplicates children for a seamless loop. */
export default function Marquee({ items, className = '', sep = true, pauseOnHover = true }) {
  const row = (key) => (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={key === 'b'} key={key}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-12">
          <span className="font-display text-2xl font-medium text-fg-muted transition-colors hover:text-coral sm:text-3xl">
            {item}
          </span>
          {sep && <span className="h-1.5 w-1.5 rounded-full bg-coral/50" />}
        </span>
      ))}
    </div>
  )
  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div className={`flex animate-marquee ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}>
        {row('a')}
        {row('b')}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  )
}
