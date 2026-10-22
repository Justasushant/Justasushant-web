import { useEffect, useRef } from 'react'

interface DotGridProps {
  dotColor?: string
  glowColor?: string
  gap?: number
  /** How far the cursor pushes dots, in px */
  radius?: number
  className?: string
}

const SHOCK_MS = 1200

export default function DotGrid({
  dotColor = 'rgba(255, 255, 255, 0.22)',
  glowColor = '#c6f432',
  gap = 24,
  radius = 140,
  className = '',
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    let dots: { x: number; y: number; ox: number; oy: number }[] = []
    let shocks: { x: number; y: number; start: number }[] = []
    let width = 0
    let height = 0
    let frame = 0

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) dots.push({ x, y, ox: 0, oy: 0 })
      }
    }
    resize()

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height)
      shocks = shocks.filter((s) => now - s.start < SHOCK_MS)

      for (const d of dots) {
        let tx = 0
        let ty = 0
        let glow = 0

        // Dots get pushed away from the cursor
        const dx = d.x - mouse.x
        const dy = d.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < radius && dist > 0) {
          const force = (1 - dist / radius) ** 2
          tx += (dx / dist) * force * 24
          ty += (dy / dist) * force * 24
          glow = 1 - dist / radius
        }

        // Clicks send a shockwave ring across the grid
        for (const s of shocks) {
          const life = (now - s.start) / SHOCK_MS
          const ring = life * Math.max(width, height)
          const sd = Math.hypot(d.x - s.x, d.y - s.y)
          const band = 1 - Math.min(Math.abs(sd - ring) / 40, 1)
          if (band > 0 && sd > 0) {
            tx += ((d.x - s.x) / sd) * band * 20 * (1 - life)
            ty += ((d.y - s.y) / sd) * band * 20 * (1 - life)
            glow = Math.max(glow, band * (1 - life))
          }
        }

        // Ease towards the target so the grid feels springy
        d.ox += (tx - d.ox) * 0.15
        d.oy += (ty - d.oy) * 0.15

        const lit = glow > 0.05
        ctx.fillStyle = lit ? glowColor : dotColor
        ctx.globalAlpha = lit ? 0.35 + glow * 0.65 : 1
        ctx.beginPath()
        ctx.arc(d.x + d.ox, d.y + d.oy, 1.2 + glow * 1.8, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onMove = (e: PointerEvent) => Object.assign(mouse, toLocal(e))
    const onLeave = () => Object.assign(mouse, { x: -9999, y: -9999 })
    const onDown = (e: PointerEvent) => shocks.push({ ...toLocal(e), start: performance.now() })

    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerleave', onLeave)
    parent.addEventListener('pointerdown', onDown)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
      parent.removeEventListener('pointerdown', onDown)
    }
  }, [dotColor, glowColor, gap, radius])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
