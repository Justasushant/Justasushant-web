import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'

interface HoloCardProps {
  children: ReactNode
  /** Any CSS background for the artwork underneath the foil */
  background?: string
  /** Strength of the rainbow foil, 0 – 1 */
  intensity?: number
  className?: string
}

export default function HoloCard({
  children,
  background = 'linear-gradient(160deg, #1e1b4b, #312e81 45%, #0f172a)',
  intensity = 1,
  className = '',
}: HoloCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Tilt toward the cursor and slide the rainbow foil with it
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(800px) rotateX(${(0.5 - py) * 22}deg) rotateY(${(px - 0.5) * 22}deg)`
    el.style.setProperty('--px', `${px * 100}%`)
    el.style.setProperty('--py', `${py * 100}%`)
    el.style.setProperty('--foil', String(intensity))
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    el.style.setProperty('--foil', String(intensity * 0.35))
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`relative aspect-[5/7] w-60 overflow-hidden rounded-2xl border border-white/20 shadow-2xl shadow-black/60 transition-transform duration-200 ease-out ${className}`}
      style={{ background }}
    >
      <div className="relative z-10 flex size-full flex-col justify-end p-5">{children}</div>
      {/* Rainbow foil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 mix-blend-color-dodge transition-opacity duration-300"
        style={{
          opacity: `var(--foil, ${intensity * 0.35})`,
          backgroundImage:
            'linear-gradient(115deg, transparent 20%, #ff0084 36%, #fca400 43%, #ffff00 50%, #00ff8a 57%, #00cfff 64%, #cc4cfa 71%, transparent 80%)',
          backgroundSize: '250% 250%',
          backgroundPosition: 'var(--px, 50%) var(--py, 50%)',
          filter: 'brightness(0.7) contrast(1.4)',
        }}
      />
      {/* Fine diagonal texture so the foil looks printed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(55deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 6px)',
        }}
      />
      {/* Light spot */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay"
        style={{
          background:
            'radial-gradient(circle at var(--px, 50%) var(--py, 50%), rgba(255,255,255,0.7), transparent 45%)',
        }}
      />
    </div>
  )
}
