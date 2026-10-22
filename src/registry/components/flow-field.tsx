import { useEffect, useRef } from 'react'

type Direction = 'flow' | 'random' | 'spiral' | 'up' | 'down' | 'left' | 'right'

interface FlowFieldProps {
  /** Particles per 100×100 px, so it looks equally rich at any size */
  density?: number
  colors?: string[]
  /** Line thickness in px */
  size?: number
  speed?: number
  /** 'flow' follows a smooth current, the others push everything one way */
  direction?: Direction
  /** How long trails linger, 0 – 1 */
  trail?: number
  className?: string
}

interface Particle {
  x: number
  y: number
  angle: number
  life: number
  color: number
}

const HEADINGS: Record<'up' | 'down' | 'left' | 'right', number> = {
  right: 0,
  down: Math.PI / 2,
  left: Math.PI,
  up: -Math.PI / 2,
}
const MAX_PARTICLES = 9000

export default function FlowField({
  density = 110,
  colors = ['#c6f432', '#22d3ee', '#ffffff'],
  size = 1.2,
  speed = 1,
  direction = 'flow',
  trail = 0.92,
  className = '',
}: FlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Compare colours by value so a new array with the same colours does not restart the effect
  const colorKey = colors.join(',')

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const palette = colorKey.split(',')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let frame = 0
    let t = 0

    const spawn = (p: Particle) => {
      p.x = Math.random() * width
      p.y = Math.random() * height
      p.angle = Math.random() * Math.PI * 2
      p.life = 60 + Math.random() * 200
      return p
    }

    // The particle count follows the canvas area, so big screens stay full
    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.min(MAX_PARTICLES, Math.round(((width * height) / 10000) * density))
      while (particles.length < target) {
        particles.push(spawn({ x: 0, y: 0, angle: 0, life: 0, color: particles.length % palette.length }))
      }
      particles = particles.slice(0, target)
    }
    resize()

    // A smooth, slowly changing angle for every point on the canvas
    const angleAt = (x: number, y: number) =>
      (Math.sin(x * 0.0035 + t) + Math.cos(y * 0.004 - t * 0.8) + Math.sin((x + y) * 0.002)) * Math.PI

    const headingFor = (p: Particle) => {
      let angle: number
      if (direction === 'random') {
        p.angle += (Math.random() - 0.5) * 0.6
        angle = p.angle
      } else if (direction === 'spiral') {
        angle = Math.atan2(p.y - height / 2, p.x - width / 2) + Math.PI / 2 + 0.3
      } else if (direction === 'flow') {
        angle = angleAt(p.x, p.y)
      } else {
        angle = HEADINGS[direction] + Math.sin(angleAt(p.x, p.y)) * 0.35
      }

      // Near the cursor the flow turns into a whirlpool
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.hypot(dx, dy)
      if (dist < 160) {
        const mix = 1 - dist / 160
        angle = angle * (1 - mix) + (Math.atan2(dy, dx) + Math.PI / 2) * mix
      }
      return angle
    }

    const draw = () => {
      t += 0.003 * speed

      // Fade the previous frame instead of clearing it, which leaves trails
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - trail})`
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'
      ctx.lineWidth = size
      ctx.globalAlpha = 0.6

      // One path per colour keeps thousands of particles fast
      for (let c = 0; c < palette.length; c++) {
        ctx.strokeStyle = palette[c]
        ctx.beginPath()
        for (const p of particles) {
          if (p.color !== c) continue
          const angle = headingFor(p)
          const nx = p.x + Math.cos(angle) * 1.6 * speed
          const ny = p.y + Math.sin(angle) * 1.6 * speed
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(nx, ny)
          p.x = nx
          p.y = ny
          p.life--
          if (p.life < 0 || nx < 0 || nx > width || ny < 0 || ny > height) spawn(p)
        }
        ctx.stroke()
      }

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
  }, [density, colorKey, size, speed, direction, trail])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
