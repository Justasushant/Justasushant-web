import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface DockItem {
  label: string
  icon: ReactNode
  /** Tile colour, any CSS colour */
  color?: string
  /** Shows a small dot under the icon, like a running app */
  active?: boolean
  onClick?: () => void
}

interface DockProps {
  items: DockItem[]
  /** Icon size in px when not magnified */
  size?: number
  /** How big the hovered icon gets (1.8 = 180%) */
  magnification?: number
  /** How far from the cursor icons still grow, in px */
  distance?: number
  className?: string
}

const GAP = 10
const PADDING = 10

export default function Dock({
  items,
  size = 44,
  magnification = 1.8,
  distance = 120,
  className = '',
}: DockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const target = useRef<number | null>(null)
  const scales = useRef(items.map(() => 1))
  const [, setFrame] = useState(0)
  const [bouncing, setBouncing] = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  // Ease every icon toward its target scale each frame, so growing feels springy
  useEffect(() => {
    let raf = 0
    const tick = () => {
      let moving = false
      scales.current = items.map((_, i) => {
        const current = scales.current[i] ?? 1
        let goal = 1
        if (target.current !== null) {
          const center = PADDING + i * (size + GAP) + size / 2
          const t = Math.max(0, 1 - Math.abs(target.current - center) / distance)
          // A cosine falloff gives a rounder bulge than a straight line
          goal = 1 + (magnification - 1) * (0.5 - Math.cos(t * Math.PI) / 2)
        }
        const next = current + (goal - current) * 0.22
        if (Math.abs(goal - next) > 0.001) moving = true
        return next
      })
      setFrame((f) => f + 1)
      if (moving) raf = requestAnimationFrame(tick)
      else raf = 0
    }
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const el = ref.current
    el?.addEventListener('dockmove', start)
    start()
    return () => {
      cancelAnimationFrame(raf)
      el?.removeEventListener('dockmove', start)
    }
  }, [items, size, magnification, distance])

  const move = (x: number | null) => {
    target.current = x
    ref.current?.dispatchEvent(new Event('dockmove'))
  }

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (r) move(e.clientX - r.left)
      }}
      onPointerLeave={() => {
        move(null)
        setHovered(null)
      }}
      className={`flex items-end rounded-[22px] border border-white/15 bg-white/[0.06] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl ${className}`}
      style={{ gap: GAP, padding: PADDING, height: size + PADDING * 2 }}
    >
      <style>{`@keyframes dock-bounce { 0%, 100% { transform: translateY(0) } 30% { transform: translateY(-38%) } 55% { transform: translateY(0) } 75% { transform: translateY(-12%) } }`}</style>
      {items.map((item, i) => {
        const s = size * (scales.current[i] ?? 1)
        return (
          <div key={item.label} className="relative flex shrink-0 flex-col items-center" style={{ width: s }}>
            <span
              className={`pointer-events-none absolute whitespace-nowrap rounded-lg border border-white/10 bg-zinc-900/95 px-2.5 py-1 text-xs font-medium text-white shadow-lg transition-all duration-200 ${
                hovered === i ? 'opacity-100' : 'translate-y-1 opacity-0'
              }`}
              style={{ bottom: s + 12 }}
            >
              {item.label}
            </span>
            <button
              onClick={() => {
                setBouncing(i)
                item.onClick?.()
              }}
              onAnimationEnd={() => setBouncing(null)}
              onPointerEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              aria-label={item.label}
              className="grid place-items-center rounded-[28%] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_14px_-4px_rgba(0,0,0,0.6)] outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              style={{
                width: s,
                height: s,
                background: `linear-gradient(160deg, color-mix(in srgb, ${item.color ?? '#3f3f46'} 100%, white 18%), color-mix(in srgb, ${item.color ?? '#3f3f46'} 85%, black))`,
                animation: bouncing === i ? 'dock-bounce 0.7s ease-out' : undefined,
              }}
            >
              <span className="grid place-items-center [&>svg]:size-full" style={{ width: s * 0.5, height: s * 0.5 }}>
                {item.icon}
              </span>
            </button>
            <span
              className={`absolute -bottom-[7px] size-1 rounded-full bg-white/70 transition-opacity ${
                item.active ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        )
      })}
    </div>
  )
}
