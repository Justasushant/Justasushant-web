import { useEffect, useRef } from 'react'

interface StarfieldWarpProps {
  count?: number
  color?: string
  /** Cruising speed */
  speed?: number
  /** Speed while the pointer is held down */
  warpSpeed?: number
  className?: string
}

export default function StarfieldWarp({
  count = 500,
  color = '#ffffff',
  speed = 2,
  warpSpeed = 45,
  className = '',
}: StarfieldWarpProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const DEPTH = 1000
    let width = 0
    let height = 0
    let frame = 0
    let current = speed
    let warping = false
    // The vanishing point leans toward the cursor
    const center = { x: 0, y: 0, tx: 0, ty: 0 }

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      center.x = center.tx = width / 2
      center.y = center.ty = height / 2
    }
    resize()

    const spawn = (z = Math.random() * DEPTH) => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z,
      pz: z,
    })
    const stars = Array.from({ length: count }, () => spawn())

    const draw = () => {
      current += ((warping ? warpSpeed : speed) - current) * 0.05
      center.x += (center.tx - center.x) * 0.05
      center.y += (center.ty - center.y) * 0.05

      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = color
      ctx.lineCap = 'round'

      for (const s of stars) {
        s.pz = s.z
        s.z -= current
        if (s.z < 1) {
          Object.assign(s, spawn(DEPTH))
          continue
        }
        const scale = 300 / s.z
        const prevScale = 300 / s.pz
        const x = center.x + s.x * scale
        const y = center.y + s.y * scale
        const px = center.x + s.x * prevScale
        const py = center.y + s.y * prevScale

        ctx.globalAlpha = Math.min(1, (1 - s.z / DEPTH) * 1.4)
        ctx.lineWidth = Math.max(0.6, (1 - s.z / DEPTH) * 2.6)
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(x + 0.1, y + 0.1)
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      center.tx = width / 2 + (e.clientX - r.left - width / 2) * 0.35
      center.ty = height / 2 + (e.clientY - r.top - height / 2) * 0.35
    }
    const onDown = () => {
      warping = true
    }
    const onUp = () => {
      warping = false
    }
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [count, color, speed, warpSpeed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
