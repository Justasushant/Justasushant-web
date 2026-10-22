import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  /** Maximum tilt in degrees */
  maxTilt?: number
  /** How far the content floats above the card, in px */
  depth?: number
  className?: string
}

export default function TiltCard({ children, maxTilt = 14, depth = 50, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * maxTilt * 2}deg) rotateY(${(px - 0.5) * maxTilt * 2}deg)`
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`group relative rounded-2xl transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Card surface and glare live on a flat back layer */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 shadow-2xl shadow-black/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, 0.22), transparent 55%)',
          }}
        />
      </div>
      {/* Content floats above the surface, so it shifts in 3D as the card tilts */}
      <div className="relative p-6" style={{ transform: `translateZ(${depth}px)` }}>
        {children}
      </div>
    </div>
  )
}
