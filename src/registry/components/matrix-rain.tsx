import { useEffect, useRef } from 'react'

interface MatrixRainProps {
  color?: string
  fontSize?: number
  /** Frames per second */
  fps?: number
  className?: string
}

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/{}'

export default function MatrixRain({
  color = '#c6f432',
  fontSize = 14,
  fps = 24,
  className = '',
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let drops: number[] = []
    let frame = 0
    let last = 0

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drops = Array.from({ length: Math.ceil(width / fontSize) }, () =>
        Math.floor((Math.random() * -height) / fontSize),
      )
    }
    resize()

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw)
      if (now - last < 1000 / fps) return
      last = now

      // Fade what's already drawn instead of painting a background colour,
      // so the effect works on top of any background
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'

      ctx.font = `${fontSize}px monospace`
      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillStyle = Math.random() > 0.96 ? '#ffffff' : color
        ctx.fillText(char, i * fontSize, y * fontSize)
        drops[i] = y * fontSize > height && Math.random() > 0.975 ? 0 : y + 1
      })
    }
    frame = requestAnimationFrame(draw)

    const observer = new ResizeObserver(resize)
    observer.observe(parent)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [color, fontSize, fps])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
