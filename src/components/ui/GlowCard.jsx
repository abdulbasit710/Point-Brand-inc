import { useEffect } from 'react'

/**
 * GlowCard — a pointer-tracking spotlight border. A radial glow follows the
 * cursor across the screen (background-attachment: fixed trick) and the hue
 * shifts with the cursor's horizontal position. Structural CSS for the
 * [data-glow] pseudo-elements lives in index.css.
 */

const glowColorMap = {
  brand: { base: 16, spread: 264 }, // coral → violet across the viewport
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
}

// One shared pointer listener + hue animation loop for every GlowCard —
// vars are set on <html> and inherited, instead of per-card listeners.
let activeCards = 0
let rafId = null
let hue = 0
let hueSpeed = 45 // deg per second — idle cycle (~8s per full spectrum)
const IDLE_SPEED = 45
const BOOST_SPEED = 220 // when the cursor is moving over a card
let lastTime = 0

function syncPointer(e) {
  const root = document.documentElement
  root.style.setProperty('--x', e.clientX.toFixed(2))
  root.style.setProperty('--xp', (e.clientX / (window.innerWidth || 1)).toFixed(2))
  root.style.setProperty('--y', e.clientY.toFixed(2))
  root.style.setProperty('--yp', (e.clientY / (window.innerHeight || 1)).toFixed(2))
  // moving over a card kicks the colour cycle into high gear
  if (e.target instanceof Element && e.target.closest('[data-glow]')) hueSpeed = BOOST_SPEED
}

function hueLoop(time) {
  const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0
  lastTime = time
  hue = (hue + hueSpeed * dt) % 360
  // ease back down to the idle speed when the cursor stops / leaves
  hueSpeed += (IDLE_SPEED - hueSpeed) * Math.min(1, dt * 2.5)
  document.documentElement.style.setProperty('--hue-anim', hue.toFixed(2))
  rafId = requestAnimationFrame(hueLoop)
}

export default function GlowCard({ children, className = '', glowColor = 'brand', radius = 24, style }) {
  useEffect(() => {
    if (activeCards === 0) {
      document.addEventListener('pointermove', syncPointer, { passive: true })
      lastTime = 0
      rafId = requestAnimationFrame(hueLoop)
    }
    activeCards += 1
    return () => {
      activeCards -= 1
      if (activeCards === 0) {
        document.removeEventListener('pointermove', syncPointer)
        if (rafId) cancelAnimationFrame(rafId)
        rafId = null
      }
    }
  }, [])

  const { base, spread } = glowColorMap[glowColor] || glowColorMap.brand

  return (
    <div
      data-glow
      className={`relative ${className}`}
      style={{
        '--base': base,
        '--spread': spread,
        '--radius': radius,
        '--border': 2,
        '--backdrop': 'var(--panel)',
        '--backup-border': 'var(--line)',
        '--size': 200,
        '--outer': 1,
        '--border-size': 'calc(var(--border, 2) * 1px)',
        '--spotlight-size': 'calc(var(--size, 150) * 1px)',
        '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)) + var(--hue-anim, 0))',
        backgroundImage: `radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.08)), transparent
        )`,
        backgroundColor: 'var(--backdrop, transparent)',
        backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
        backgroundPosition: '50% 50%',
        backgroundAttachment: 'fixed',
        border: 'var(--border-size) solid var(--backup-border)',
        borderRadius: `${radius}px`,
        ...style,
      }}
    >
      {/* outer blurred halo */}
      <div data-glow aria-hidden />
      {children}
    </div>
  )
}
