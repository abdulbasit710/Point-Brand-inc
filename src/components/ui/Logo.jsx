import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Brand mark — a paintbrush forming a "B", in the coral→violet gradient.
 * Used as a decorative mark (hero orb, about) and as the logo fallback.
 */
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 52 60" className={className} role="img" aria-label="Point Brand Inc mark">
      <defs>
        <linearGradient id="pbMark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EE8C6E" />
          <stop offset="0.5" stopColor="#C766A0" />
          <stop offset="1" stopColor="#7B3FA0" />
        </linearGradient>
      </defs>
      {/* brush tip */}
      <path d="M18 3 c5 4.5 6 8 0 12 c-6 -4 -5 -7.5 0 -12 Z" fill="url(#pbMark)" />
      {/* handle / B spine */}
      <rect x="15" y="13" width="6" height="36" rx="3" fill="url(#pbMark)" />
      {/* ferrule */}
      <rect x="13.5" y="19" width="9" height="3.2" rx="1.6" fill="#ffffff" opacity="0.35" />
      {/* upper bowl (coral) */}
      <path d="M21 16 h9 a10 10 0 0 1 0 20 h-9" fill="none" stroke="#EE8C6E" strokeWidth="5.6" strokeLinecap="round" />
      {/* lower bowl (violet) */}
      <path d="M21 34 h12 a11.5 11.5 0 0 1 0 23 h-12" fill="none" stroke="#7B3FA0" strokeWidth="5.6" strokeLinecap="round" />
    </svg>
  )
}

/** Text wordmark fallback (shown if /logo.png is missing). */
function Wordmark() {
  return (
    <span className="font-display text-lg font-semibold leading-none tracking-tight">
      <span className="text-coral">Point</span> <span className="text-violet-light">Brand</span>{' '}
      <span className="text-fg-muted">Inc</span>
    </span>
  )
}

/**
 * Site logo. Renders the real artwork from /public.
 *   variant="full" → /logo.png   (brush mark + "POINT BRAND" wordmark)
 *   variant="mark" → /logo-mark.png (brush-B mark only — great for tight headers)
 * If the image is missing it falls back to the vector mark (+ wordmark for "full"),
 * so the header never looks broken.
 */
export default function Logo({ variant = 'full', withText = false, className = '', imgClassName = 'h-10' }) {
  const [imgFailed, setImgFailed] = useState(false)
  const isMark = variant === 'mark'
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Point Brand Inc — home"
    >
      {imgFailed ? (
        <>
          <LogoMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[-6deg]" />
          {(withText || !isMark) && <Wordmark />}
        </>
      ) : (
        <>
          <img
            src={isMark ? '/logo-mark.png' : '/logo.png'}
            alt="Point Brand Inc"
            onError={() => setImgFailed(true)}
            className={`w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] ${imgClassName}`}
          />
          {withText && <Wordmark />}
        </>
      )}
    </Link>
  )
}
