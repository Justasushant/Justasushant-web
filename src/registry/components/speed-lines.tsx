import { useEffect, useRef } from 'react'

interface SpeedLinesProps {
  /** "focus" lines rush into a point, "motion" lines streak sideways */
  mode?: 'focus' | 'motion'
  /** Ink colour of the lines */
  color?: string
  /** Paper colour behind them */
  background?: string
  /** Number of lines */
  lines?: number
  /** Size of the calm empty area in the middle, 0 – 1 */
  focus?: number
  /** The focus point follows the cursor */
  follow?: boolean
  className?: string
}

interface Stroke {
  a: number
  width: number
  inner: number
  phase: number
}

// Manga speed lines drawn as tapered ink strokes. A few strokes are redrawn
// every moment, so the picture shimmers like hand inking instead of flickering.
export default function SpeedLines({
  mode = 'focus',
  color = '#22211f',
  background = '#f2efe6',
  lines = 160,
  focus = 0.3,
  follow = true,
  className = '',
}: SpeedLinesProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let w = 0
    let h = 0
    let raf = 0
    const center = { x: 0.5, y: 0.5 }
    const target = { x: 0.5, y: 0.5 }
    const make = (): Stroke => ({
      a: Math.random(),
      width: 0.15 + Math.random() * 0.85,
      inner: 0.85 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
    })
    const strokes = Array.from({ length: lines }, make)

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      center.x += (target.x - center.x) * 0.06
      center.y += (target.y - center.y) * 0.06
      // Swap out a handful of strokes each frame
      for (let i = 0; i < Math.ceil(lines / 60); i++) strokes[Math.floor(Math.random() * lines)] = make()
      ctx.fillStyle = background
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = color
      const cx = center.x * w
      const cy = center.y * h
      for (const s of strokes) {
        const breathe = 1 + Math.sin(now / 500 + s.phase) * 0.06
        ctx.beginPath()
        if (mode === 'focus') {
          const a = s.a * Math.PI * 2
          const far = Math.hypot(w, h)
          const inner = Math.min(w, h) * focus * s.inner * breathe
          const spread = 0.003 + s.width * 0.014
          ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner)
          ctx.lineTo(cx + Math.cos(a - spread) * far, cy + Math.sin(a - spread) * far)
          ctx.lineTo(cx + Math.cos(a + spread) * far, cy + Math.sin(a + spread) * far)
        } else {
          // Horizontal streaks: thick on the left, tapering to a point
          const y = s.a * h
          const thick = 0.5 + s.width * 3
          const gap = w * focus * s.inner * breathe
          const end = Math.max(0, cx - gap * Math.abs(Math.sin(s.phase)))
          ctx.moveTo(0, y - thick)
          ctx.lineTo(end, y)
          ctx.lineTo(0, y + thick)
        }
        ctx.closePath()
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const parent = canvas.parentElement
    const onMove = (e: PointerEvent) => {
      if (!follow) return
      const r = canvas.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = (e.clientY - r.top) / r.height
    }
    const onLeave = () => {
      target.x = 0.5
      target.y = 0.5
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    parent?.addEventListener('pointermove', onMove)
    parent?.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      parent?.removeEventListener('pointermove', onMove)
      parent?.removeEventListener('pointerleave', onLeave)
    }
  }, [mode, color, background, lines, focus, follow])

  return <canvas ref={ref} aria-hidden className={`absolute inset-0 size-full ${className}`} />
}
