import { useEffect, useRef } from 'react'

interface HoverGridProps {
  color?: string
  lineColor?: string
  /** Cell size in px */
  cellSize?: number
  /** How quickly lit cells fade, 0 – 1 (higher = longer trail) */
  trail?: number
  className?: string
}

export default function HoverGrid({
  color = '#c6f432',
  lineColor = 'rgba(255, 255, 255, 0.07)',
  cellSize = 44,
  trail = 0.94,
  className = '',
}: HoverGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let cols = 0
    let rows = 0
    let width = 0
    let height = 0
    let heat = new Float32Array(0)
    let frame = 0

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(width / cellSize)
      rows = Math.ceil(height / cellSize)
      heat = new Float32Array(cols * rows)
    }
    resize()

    const light = (col: number, row: number, amount: number) => {
      if (col < 0 || row < 0 || col >= cols || row >= rows) return
      const i = row * cols + col
      heat[i] = Math.max(heat[i], amount)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Every now and then a random cell glows by itself
      if (Math.random() < 0.08) light(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows), 0.5)

      for (let i = 0; i < heat.length; i++) {
        if (heat[i] < 0.01) continue
        const x = (i % cols) * cellSize
        const y = Math.floor(i / cols) * cellSize
        ctx.globalAlpha = heat[i] * 0.85
        ctx.fillStyle = color
        ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1)
        heat[i] *= trail
      }

      ctx.globalAlpha = 1
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x <= width; x += cellSize) {
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, height)
      }
      for (let y = 0; y <= height; y += cellSize) {
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(width, y + 0.5)
      }
      ctx.stroke()

      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    // The cell under the cursor lights fully, its neighbours a little
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const col = Math.floor((e.clientX - r.left) / cellSize)
      const row = Math.floor((e.clientY - r.top) / cellSize)
      light(col, row, 1)
      light(col + 1, row, 0.35)
      light(col - 1, row, 0.35)
      light(col, row + 1, 0.35)
      light(col, row - 1, 0.35)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    parent.addEventListener('pointermove', onMove)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      parent.removeEventListener('pointermove', onMove)
    }
  }, [color, lineColor, cellSize, trail])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
