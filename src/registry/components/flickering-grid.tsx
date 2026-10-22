import { useEffect, useRef } from 'react'

interface FlickeringGridProps {
  color?: string
  squareSize?: number
  gap?: number
  /** Chance (0 – 1) that a square changes each frame */
  flickerChance?: number
  maxOpacity?: number
  className?: string
}

export default function FlickeringGrid({
  color = '#c6f432',
  squareSize = 4,
  gap = 6,
  flickerChance = 0.08,
  maxOpacity = 0.35,
  className = '',
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cell = squareSize + gap
    let cols = 0
    let rows = 0
    let opacities = new Float32Array(0)
    let frame = 0
    let last = 0

    const resize = () => {
      const width = parent.clientWidth
      const height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(width / cell)
      rows = Math.ceil(height / cell)
      opacities = Float32Array.from({ length: cols * rows }, () => Math.random() * maxOpacity)
    }
    resize()

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw)
      if (now - last < 50) return
      last = now

      ctx.clearRect(0, 0, cols * cell, rows * cell)
      ctx.fillStyle = color
      for (let i = 0; i < opacities.length; i++) {
        if (Math.random() < flickerChance) opacities[i] = Math.random() * maxOpacity
        ctx.globalAlpha = opacities[i]
        ctx.fillRect((i % cols) * cell, Math.floor(i / cols) * cell, squareSize, squareSize)
      }
    }
    frame = requestAnimationFrame(draw)

    const observer = new ResizeObserver(resize)
    observer.observe(parent)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [color, squareSize, gap, flickerChance, maxOpacity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
