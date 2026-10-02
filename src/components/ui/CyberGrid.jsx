import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import GradientBlobs from './GradientBlobs'

// Brand-tuned palettes (RGB 0–1). Coral #EE8C6E + Violet #8B4FB0.
const PALETTES = {
  dark: {
    grid: [0.6, 0.38, 0.85], // glowing violet
    energy: [0.95, 0.55, 0.42], // coral pulses
    glow: [1.0, 0.8, 0.65], // warm cursor glow
    intensity: 1.0,
  },
  light: {
    grid: [0.42, 0.2, 0.55], // deep violet (reads on light bg)
    energy: [0.85, 0.4, 0.28], // deep coral
    glow: [0.5, 0.28, 0.62], // violet cursor glow
    intensity: 0.9,
  },
}

const vertexShader = /* glsl */ `
  void main() { gl_Position = vec4(position, 1.0); }
`

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec2  iResolution;
  uniform float iTime;
  uniform vec2  iMouse;
  uniform vec3  uGrid;
  uniform vec3  uEnergy;
  uniform vec3  uGlow;
  uniform float uIntensity;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
    vec2 mouse = (iMouse - 0.5 * iResolution.xy) / iResolution.y;

    float t         = iTime * 0.2;
    float mouseDist = length(uv - mouse);

    // warp the grid around the cursor
    float warp = sin(mouseDist * 20.0 - t * 4.0) * 0.1;
    warp *= smoothstep(0.4, 0.0, mouseDist);
    uv += warp;

    // grid lines
    vec2  gridUv = abs(fract(uv * 10.0) - 0.5);
    float line   = pow(1.0 - min(gridUv.x, gridUv.y), 50.0);

    // pulsing base grid
    vec3 color = uGrid * line * (0.55 + sin(t * 2.0) * 0.2);

    // energetic pulses travelling along the grid
    float energy = sin(uv.x * 20.0 + t * 5.0) * sin(uv.y * 20.0 + t * 3.0);
    energy = smoothstep(0.8, 1.0, energy);
    color += uEnergy * energy * line;

    // glow around the cursor
    float glow = smoothstep(0.12, 0.0, mouseDist);
    color += uGlow * glow * 0.5;

    // subtle grain
    color += random(uv + t * 0.1) * 0.04;

    color *= uIntensity;

    // alpha = brightness → dark cells stay transparent so the page theme shows through
    float alpha = clamp(max(color.r, max(color.g, color.b)), 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`

export default function CyberGrid({ className = '' }) {
  const reduce = useReducedMotion()
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const uniformsRef = useRef(null)
  const [failed, setFailed] = useState(false)

  // ── Set up Three.js (skipped when reduced-motion is on) ──
  useEffect(() => {
    if (reduce) return
    const container = containerRef.current
    if (!container) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch (e) {
      setFailed(true)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const start = performance.now()

    const pal = PALETTES[theme] || PALETTES.dark
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: { value: new THREE.Vector2() },
      uGrid: { value: new THREE.Vector3(...pal.grid) },
      uEnergy: { value: new THREE.Vector3(...pal.energy) },
      uGlow: { value: new THREE.Vector3(...pal.glow) },
      uIntensity: { value: pal.intensity },
    }
    uniformsRef.current = uniforms

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const setSize = () => {
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      if (!w || !h) return
      renderer.setSize(w, h)
      const pr = renderer.getPixelRatio()
      uniforms.iResolution.value.set(w * pr, h * pr)
      // default cursor to centre
      if (uniforms.iMouse.value.lengthSq() === 0) uniforms.iMouse.value.set((w * pr) / 2, (h * pr) / 2)
    }
    setSize()

    const ro = new ResizeObserver(setSize)
    ro.observe(container)

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const pr = renderer.getPixelRatio()
      uniforms.iMouse.value.set((e.clientX - rect.left) * pr, (rect.height - (e.clientY - rect.top)) * pr)
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const render = () => {
      uniforms.iTime.value = (performance.now() - start) / 1000
      renderer.render(scene, camera)
    }

    // Only animate while the hero is on screen (big perf win)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) renderer.setAnimationLoop(render)
        else renderer.setAnimationLoop(null)
      },
      { threshold: 0 },
    )
    io.observe(container)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
      io.disconnect()
      renderer.setAnimationLoop(null)
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
      material.dispose()
      geometry.dispose()
      renderer.dispose()
      uniformsRef.current = null
    }
    // theme handled by the effect below so we don't rebuild the scene on toggle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  // ── Live-update colours on theme change ──
  useEffect(() => {
    const u = uniformsRef.current
    if (!u) return
    const pal = PALETTES[theme] || PALETTES.dark
    u.uGrid.value.set(...pal.grid)
    u.uEnergy.value.set(...pal.energy)
    u.uGlow.value.set(...pal.glow)
    u.uIntensity.value = pal.intensity
  }, [theme])

  // Reduced motion or no WebGL → fall back to the ambient blobs
  if (reduce || failed) return <GradientBlobs className={className} />

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  )
}
