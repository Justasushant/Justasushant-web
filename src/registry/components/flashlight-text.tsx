import { useRef } from 'react'
import type { PointerEvent } from 'react'

interface FlashlightTextProps {
  text: string
  /** Radius of the light in px */
  radius?: number
  colors?: string[]
  className?: string
}

export default function FlashlightText({
  text,
  radius = 120,
  colors = ['#c6f432', '#22d3ee', '#f0abfc'],
  className = '',
}: FlashlightTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
    el.style.setProperty('--r', `${radius}px`)
  }

  const onPointerLeave = () => ref.current?.style.setProperty('--r', '0px')

  const mask = 'radial-gradient(circle var(--r, 0px) at var(--x, 50%) var(--y, 50%), black 40%, transparent 100%)'

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`relative cursor-none select-none ${className}`}
    >
      {/* The dim text you see in the dark */}
      <p aria-hidden className="text-zinc-800">
        {text}
      </p>
      {/* The bright, colourful copy only shows inside the flashlight */}
      <p
        className="absolute inset-0 bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {text}
      </p>
    </div>
  )
}
