import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface DockItem {
  label: string
  icon: ReactNode
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

const GAP = 8
const PADDING = 12

export default function Dock({
  items,
  size = 40,
  magnification = 1.8,
  distance = 110,
  className = '',
}: DockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState<number | null>(null)

  // Scale based on the icon's resting position, so the dock doesn't jitter while growing
  const scaleFor = (i: number) => {
    if (mouseX === null) return 1
    const center = PADDING + i * (size + GAP) + size / 2
    const d = Math.abs(mouseX - center)
    return 1 + (magnification - 1) * Math.max(0, 1 - d / distance)
  }

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (r) setMouseX(e.clientX - r.left)
      }}
      onPointerLeave={() => setMouseX(null)}
      className={`flex items-end rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md ${className}`}
      style={{ gap: GAP, padding: PADDING }}
    >
      {items.map((item, i) => {
        const s = size * scaleFor(i)
        return (
          <button
            key={item.label}
            onClick={item.onClick}
            aria-label={item.label}
            className="group relative grid shrink-0 place-items-center rounded-xl bg-zinc-800 transition-[width,height] duration-150 ease-out"
            style={{ width: s, height: s, fontSize: s * 0.5 }}
          >
            <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/10 bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.label}
            </span>
            {item.icon}
          </button>
        )
      })}
    </div>
  )
}
