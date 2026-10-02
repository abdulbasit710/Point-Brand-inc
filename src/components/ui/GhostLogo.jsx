import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import contours from '../../data/logo-contours.json'

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (t) => t * t * (3 - 2 * t)

// glass tints per theme — pale crystal on dark, deep violet on light so the
// logo stays prominent against the white background
const GLASS = {
  dark: { color: 0xd8c8ff, envMapIntensity: 1.5 },
  light: { color: 0x4a2a72, envMapIntensity: 0.9 },
}

/**
 * GhostLogo — a 3D PBI brush-B rendered in WebGL that journeys with scroll:
 *
 *  · starts sitting exactly on the header (navbar) logo, clearly visible
 *  · flies to the viewport centre, grows to a capped size and turns ghostly
 *    (low opacity, behind the text) while it revolves on the Y axis
 *  · a coral "key" light orbits it so highlights sweep across the faces
 *  · revolve speed rises a touch when the user stops scrolling
 *  · at the bottom it converges onto the footer logo and dissolves into it
 *
 * The "3D" body is the logo texture on a stack of planes — a cheap extruded
 * slab that catches light on both faces. One rAF loop, no React re-renders.
 */
export default function GhostLogo() {
  const mountRef = useRef(null)
  const matRef = useRef(null)
  const reduce = useReducedMotion()
  const { theme } = useTheme()
  const themeRef = useRef(theme)
  themeRef.current = theme

  // live-update the glass tint when the theme toggles
  useEffect(() => {
    const mat = matRef.current
    if (!mat) return
    const g = GLASS[theme] || GLASS.dark
    mat.color.setHex(g.color)
    mat.envMapIntensity = g.envMapIntensity
  }, [theme])

  useEffect(() => {
    if (reduce) return
    const mount = mountRef.current
    if (!mount) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 10

    // ── lights: soft fill + an orbiting coral key light + violet rim ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const key = new THREE.PointLight(0xee8c6e, 90) // the active light
    key.position.set(3, 2, 4)
    scene.add(key)
    const rim = new THREE.PointLight(0x8b4fb0, 70)
    rim.position.set(-3, -1.5, 3)
    scene.add(rim)
    const front = new THREE.DirectionalLight(0xffffff, 0.7)
    front.position.set(0, 1, 5)
    scene.add(front)

    // ── environment map: gives the glass its reflections ──
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTex

    // ── the logo: real extruded geometry from the traced outlines ──
    const group = new THREE.Group()
    scene.add(group)
    const shapes = contours.map((c) => {
      const sh = new THREE.Shape(c.outer.map(([x, y]) => new THREE.Vector2(x, y)))
      c.holes.forEach((h) => sh.holes.push(new THREE.Path(h.map(([x, y]) => new THREE.Vector2(x, y)))))
      return sh
    })
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 0.1, // thickness relative to the unit-height logo
      bevelEnabled: false, // flat sides, as chosen
      curveSegments: 4,
    })
    geo.center()
    // glass / crystal — tint depends on the active theme
    const glass = GLASS[themeRef.current] || GLASS.dark
    const mat = new THREE.MeshPhysicalMaterial({
      color: glass.color,
      metalness: 0,
      roughness: 0.06,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: glass.envMapIntensity,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
    matRef.current = mat
    group.add(new THREE.Mesh(geo, mat))

    // ── sizing / px→world mapping at the z=0 plane ──
    let vw = 1
    let vh = 1
    let pxToWorld = 1
    const setSize = () => {
      vw = window.innerWidth || 1
      vh = window.innerHeight || 1
      renderer.setSize(vw, vh)
      camera.aspect = vw / vh
      camera.updateProjectionMatrix()
      pxToWorld = (2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / vh
    }
    setSize()
    window.addEventListener('resize', setSize)

    // ── idle detection: revolve speeds up when scrolling stops ──
    let lastScrollY = window.scrollY
    let lastScrollT = 0
    let spin = 0
    let spinSpeed = 1.0
    const SPEED_SCROLLING = 0.7 // rad/s while the page is moving
    const SPEED_IDLE = 1.5 // a bit faster when the user rests

    let rafId
    let last = 0
    // smoothed (rendered) state — eases toward the frame's target values so
    // every transition feels fluid, never snappy
    let cx = null
    let cy = null
    let cs = null
    let co = 0
    const loop = (time) => {
      rafId = requestAnimationFrame(loop)
      const dt = last ? Math.min((time - last) / 1000, 0.1) : 0
      last = time
      const t = time / 1000

      const max = document.documentElement.scrollHeight - vh
      const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0

      if (Math.abs(window.scrollY - lastScrollY) > 1) {
        lastScrollY = window.scrollY
        lastScrollT = time
      }
      const idle = time - lastScrollT > 250
      spinSpeed = lerp(spinSpeed, idle ? SPEED_IDLE : SPEED_SCROLLING, Math.min(1, dt * 3))

      // ── default mid-journey state: ghostly, drifting behind the text ──
      // two offset sines so the wander sweeps the full width, left and right
      let px = vw / 2 + (Math.sin(p * Math.PI * 2.2 + t * 0.5) * 0.6 + Math.sin(t * 0.31 + 1.7) * 0.4) * vw * 0.24
      let py = vh / 2 + Math.sin(t * 0.7 + p * 5) * 26 + Math.cos(t * 0.5) * 14
      let sizePx = Math.min(vh * 0.27, 270)
      let opacity = 0.22

      // ── launch: emerges from the header logo over the first 12% of scroll ──
      const start = clamp(p / 0.12, 0, 1)
      const startEase = smooth(start)
      if (start < 1) {
        const header = document.querySelector('[data-header-logo]')
        if (header) {
          const r = header.getBoundingClientRect()
          px = lerp(r.left + r.width / 2, px, startEase)
          py = lerp(r.top + r.height / 2, py, startEase)
          sizePx = lerp(r.height, sizePx, startEase)
          // hidden before the first scroll (the real header logo is there),
          // fades in quickly as it detaches
          opacity = lerp(0.95, opacity, startEase) * clamp(start / 0.15, 0, 1)
        }
      }

      // revolve: the spin ANGLE never scales (that made the launch erratic) —
      // instead the spin VELOCITY ramps in smoothly with the launch
      if (start <= 0) spin = 0
      else spin += spinSpeed * dt * startEase
      let rotY = spin
      // a little extra 3D character: slow, subtle tilt wobble
      let rotX = Math.sin(t * 0.5) * 0.14 * startEase
      let rotZ = Math.sin(t * 0.35) * 0.08 * startEase

      // ── landing: converges onto the footer logo and dissolves into it ──
      const footer = document.querySelector('[data-footer-logo]')
      if (footer) {
        const r = footer.getBoundingClientRect()
        const ft = clamp((vh - r.top) / (vh * 0.3), 0, 1)
        if (ft > 0) {
          const e = smooth(ft)
          px = lerp(px, r.left + r.width / 2, e)
          py = lerp(py, r.top + r.height / 2, e)
          sizePx = lerp(sizePx, r.height, e)
          // brighten so the merge reads clearly, then vanish right at the end
          opacity = lerp(opacity, 0.85, e) * (1 - Math.pow(e, 8))
          rotY = lerp(rotY % (Math.PI * 2), 0, e)
          rotX = lerp(rotX, 0, e)
          rotZ = lerp(rotZ, 0, e)
        }
      }

      // ── ease the rendered state toward the targets (buttery smooth) ──
      const k = Math.min(1, dt * 7)
      cx = cx === null ? px : lerp(cx, px, k)
      cy = cy === null ? py : lerp(cy, py, k)
      cs = cs === null ? sizePx : lerp(cs, sizePx, k)
      co = lerp(co, opacity, k)

      group.rotation.set(rotX, rotY, rotZ)
      group.position.set((cx - vw / 2) * pxToWorld, (vh / 2 - cy) * pxToWorld, 0)
      const s = cs * pxToWorld
      group.scale.set(s, s, s)
      mat.opacity = co

      // the active light slowly orbits so glints sweep across the logo
      key.position.set(Math.sin(t * 0.8) * 4.5, Math.cos(t * 0.6) * 3, 4)

      renderer.render(scene, camera)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', setSize)
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
      geo.dispose()
      mat.dispose()
      matRef.current = null
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
    }
  }, [reduce])

  if (reduce) return null

  return <div ref={mountRef} aria-hidden className="pointer-events-none fixed inset-0 -z-[1]" />
}
