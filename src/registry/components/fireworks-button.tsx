import { useEffect, useRef } from 'react'
import type { ButtonHTMLAttributes, MouseEvent } from 'react'

interface FireworksButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colors?: string[]
  /** Rockets launched per click */
  rockets?: number
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  rocket: boolean
}

// Every click launches rockets that burst into fireworks above the button
export default function FireworksButton({
  children,
  colors = ['#c6f432', '#22d3ee', '#f472b6', '#facc15', '#ffffff'],
  rockets = 3,
  className = '',
  onClick,
  ...props
}: FireworksButtonProps) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const sparks = useRef<Spark[]>([])
  const raf = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const run = () => {
    const el = canvas.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    ctx.clearRect(0, 0, el.width, el.height)
    const next: Spark[] = []
    for (const s of sparks.current) {
      s.x += s.vx
      s.y += s.vy
      s.vy += s.rocket ? 0.12 : 0.06
      s.vx *= s.rocket ? 1 : 0.97
      s.vy *= s.rocket ? 1 : 0.97
      s.life -= s.rocket ? 0 : 0.016
      // A rocket bursts at the top of its climb
      if (s.rocket && s.vy >= -0.6) {
        for (let i = 0; i < 36; i++) {
          const a = (i / 36) * Math.PI * 2
          const speed = 2 + Math.random() * 2.2
          next.push({ x: s.x, y: s.y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, life: 1, color: s.color, rocket: false })
        }
        continue
      }
      if (s.life <= 0) continue
      ctx.globalAlpha = Math.max(0, s.life)
      ctx.strokeStyle = s.color
      ctx.lineWidth = s.rocket ? 2 : 1.6
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x - s.vx * 3, s.y - s.vy * 3)
      ctx.stroke()
      next.push(s)
    }
    ctx.globalAlpha = 1
    sparks.current = next
    raf.current = next.length ? requestAnimationFrame(run) : 0
  }

  const launch = (e: MouseEvent<HTMLButtonElement>) => {
    const el = canvas.current
    if (el) {
      el.width = el.clientWidth
      el.height = el.clientHeight
      const x = el.width / 2
      const y = el.height - 40
      for (let i = 0; i < rockets; i++) {
        sparks.current.push({
          x: x + (Math.random() - 0.5) * 30,
          y,
          vx: (i - (rockets - 1) / 2) * 1.1 + (Math.random() - 0.5) * 0.6,
          vy: -7 - Math.random() * 1.2,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          rocket: true,
        })
      }
      if (!raf.current) raf.current = requestAnimationFrame(run)
    }
    onClick?.(e)
  }

  return (
    <span className="relative inline-flex">
      <canvas
        ref={canvas}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[320px] w-[360px] -translate-x-1/2"
        style={{ marginBottom: -20 }}
      />
      <button
        onClick={launch}
        className={`relative rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950 px-7 py-3 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_24px_-8px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-transform active:scale-95 ${className}`}
        {...props}
      >
        {children}
      </button>
    </span>
  )
}
