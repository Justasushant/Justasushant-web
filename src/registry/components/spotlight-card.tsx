import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  glowColor?: string
  className?: string
}

export default function SpotlightCard({
  children,
  glowColor = '#c6f432',
  className = '',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group relative overflow-hidden rounded-2xl bg-white/10 p-px ${className}`}
    >
      {/* Border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at var(--x) var(--y), ${glowColor}, transparent 70%)`,
        }}
      />
      <div className="relative h-full rounded-[15px] bg-zinc-950 p-6">
        {/* Surface glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[15px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(260px circle at var(--x) var(--y), color-mix(in srgb, ${glowColor} 12%, transparent), transparent 70%)`,
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
