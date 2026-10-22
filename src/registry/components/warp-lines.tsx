import { useEffect, useRef } from 'react'

interface WarpLinesProps {
  color?: string
  highlightColor?: string
  /** Space between lines in px */
  spacing?: number
  /** How far the cursor bends lines, in px */
  radius?: number
  className?: string
}

const STEP = 8

export default function WarpLines({
  color = 'rgba(255, 255, 255, 0.18)',
  highlightColor = '#c6f432',
  spacing = 16,
  radius = 160,
  className = '',
}: WarpLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let frame = 0
    // One horizontal offset per point, per line
    let offsets: Float32Array[] = []

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const lines = Math.ceil(width / spacing) + 1
      const points = Math.ceil(height / STEP) + 1
      offsets = Array.from({ length: lines }, () => new Float32Array(points))
    }
    resize()

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 1

      offsets.forEach((line, li) => {
        const baseX = li * spacing
        let lineHeat = 0
        ctx.beginPath()
        for (let pi = 0; pi < line.length; pi++) {
          const y = pi * STEP
          const dx = baseX - mouse.x
          const dy = y - mouse.y
          const dist = Math.hypot(dx, dy)
          // Lines bulge away from the cursor, strongest right next to it
          let target = 0
          if (dist < radius) {
            const force = Math.cos((dist / radius) * (Math.PI / 2))
            target = Math.sign(dx || 1) * force * 36
            lineHeat = Math.max(lineHeat, force)
          }
          line[pi] += (target - line[pi]) * 0.12
          const x = baseX + line[pi]
          if (pi === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = lineHeat > 0.15 ? highlightColor : color
        ctx.globalAlpha = lineHeat > 0.15 ? 0.25 + lineHeat * 0.75 : 1
        ctx.stroke()
      })

      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [color, highlightColor, spacing, radius])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
