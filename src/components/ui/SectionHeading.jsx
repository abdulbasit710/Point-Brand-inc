import Reveal from './Reveal'

/** Consistent section header: eyebrow + title + optional intro. */
export default function SectionHeading({ eyebrow, title, intro, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05} as="h2" className="font-display text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl">
        {title}
      </Reveal>
      {intro && (
        <Reveal delay={0.1} as="p" className="text-base leading-relaxed text-fg-muted sm:text-lg">
          {intro}
        </Reveal>
      )}
    </div>
  )
}
