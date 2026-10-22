import { useEffect, useRef } from 'react'

interface GridBeamsProps {
  beamColor?: string
  lineColor?: string
  cellSize?: number
  /** New beams per second */
  rate?: number
  className?: string
}

interface Beam {
  vertical: boolean
  line: number
  pos: number
  speed: number
  length: number
}

export default function GridBeams({
  beamColor = '#c6f432',
  lineColor = 'rgba(255, 255, 255, 0.06)',
  cellSize = 56,
  rate = 4,
  className = '',
}: GridBeamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let frame = 0
    let last = performance.now()
    let beams: Beam[] = []

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const spawn = (vertical: boolean, line: number) => {
      const reverse = Math.random() < 0.5
      const span = vertical ? height : width
      beams.push({
        vertical,
        line,
        pos: reverse ? span + 100 : -100,
        speed: (reverse ? -1 : 1) * (2 + Math.random() * 4),
        length: 60 + Math.random() * 120,
      })
    }

    const spawnRandom = () => {
      const vertical = Math.random() < 0.5
      const lines = Math.floor((vertical ? width : height) / cellSize)
      spawn(vertical, Math.floor(Math.random() * (lines + 1)) * cellSize)
    }

    const draw = (now: number) => {
      if (Math.random() < (rate * (now - last)) / 1000) spawnRandom()
      last = now
      ctx.clearRect(0, 0, width, height)

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

      // Each beam is a short glowing gradient travelling along a grid line
      ctx.lineWidth = 2
      ctx.shadowColor = beamColor
      ctx.shadowBlur = 12
      for (const b of beams) {
        b.pos += b.speed
        const tail = b.pos - Math.sign(b.speed) * b.length
        const [x1, y1, x2, y2] = b.vertical
          ? [b.line + 0.5, tail, b.line + 0.5, b.pos]
          : [tail, b.line + 0.5, b.pos, b.line + 0.5]
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(1, beamColor)
        ctx.strokeStyle = gradient
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
      ctx.shadowBlur = 0
      beams = beams.filter((b) => b.pos > -300 && b.pos < Math.max(width, height) + 300)

      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    // Moving the cursor fires beams along the nearest grid lines
    let lastSpawn = 0
    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastSpawn < 120) return
      lastSpawn = now
      const r = canvas.getBoundingClientRect()
      const x = Math.round((e.clientX - r.left) / cellSize) * cellSize
      const y = Math.round((e.clientY - r.top) / cellSize) * cellSize
      if (Math.random() < 0.5) spawn(true, x)
      else spawn(false, y)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    parent.addEventListener('pointermove', onMove)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      parent.removeEventListener('pointermove', onMove)
    }
  }, [beamColor, lineColor, cellSize, rate])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
