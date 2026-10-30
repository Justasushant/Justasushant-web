import { useEffect, useRef, useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'

interface CompareSliderProps {
  before: ReactNode
  after: ReactNode
  /** Starting position of the divider, 0 – 100 */
  defaultPosition?: number
  beforeLabel?: string
  afterLabel?: string
  /** Follow the cursor on hover instead of needing a drag */
  hover?: boolean
  /** Sweep the divider once on load, as a hint that it moves */
  hint?: boolean
  accent?: string
  className?: string
}

export default function CompareSlider({
  before,
  after,
  defaultPosition = 50,
  beforeLabel = 'Before',
  afterLabel = 'After',
  hover = false,
  hint = true,
  accent = '#c6f432',
  className = '',
}: CompareSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(defaultPosition)
  const [dragging, setDragging] = useState(false)
  const [animating, setAnimating] = useState(false)
  const touched = useRef(false)

  // A quick sweep left and right so people know they can move it
  useEffect(() => {
    if (!hint) return
    const start = performance.now()
    let raf = 0
    setAnimating(true)
    const tick = (now: number) => {
      if (touched.current) return setAnimating(false)
      const t = Math.min(1, (now - start) / 1600)
      setPosition(defaultPosition + Math.sin(t * Math.PI * 2) * 18 * (1 - t))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setAnimating(false)
    }
    const delay = setTimeout(() => (raf = requestAnimationFrame(tick)), 500)
    return () => {
      clearTimeout(delay)
      cancelAnimationFrame(raf)
    }
  }, [hint, defaultPosition])

  const moveTo = (clientX: number) => {
    touched.current = true
    const r = ref.current?.getBoundingClientRect()
    if (r) setPosition(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    moveTo(e.clientX)
  }

  const label = 'pointer-events-none absolute top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur transition-opacity duration-300'

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={(e) => (dragging || hover) && moveTo(e.clientX)}
      onPointerUp={() => setDragging(false)}
      className={`group relative aspect-video w-full max-w-xl cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 ${className}`}
    >
      <div className="absolute inset-0">{before}</div>
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 0 0 ${position}%)`,
          transition: dragging || hover || animating ? 'none' : 'clip-path 0.25s ease-out',
        }}
      >
        {after}
      </div>
      <span className={`${label} left-3`} style={{ opacity: position > 12 ? 1 : 0 }}>
        {beforeLabel}
      </span>
      <span className={`${label} right-3`} style={{ opacity: position < 88 ? 1 : 0 }}>
        {afterLabel}
      </span>
      {/* Divider and handle */}
      <div
        className="absolute inset-y-0 w-[3px] -translate-x-1/2"
        style={{
          left: `${position}%`,
          background: `linear-gradient(to bottom, transparent, ${accent} 20%, ${accent} 80%, transparent)`,
          boxShadow: `0 0 18px ${accent}`,
          transition: dragging || hover || animating ? 'none' : 'left 0.25s ease-out',
        }}
      >
        <div
          role="slider"
          aria-label="Comparison position"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            touched.current = true
            if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5))
            if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5))
          }}
          className={`absolute left-1/2 top-1/2 flex h-11 w-7 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[3px] rounded-full border-2 text-zinc-950 shadow-xl outline-none transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-white ${
            dragging ? 'scale-110' : 'group-hover:scale-105'
          }`}
          style={{ background: accent, borderColor: 'rgba(255,255,255,0.7)' }}
        >
          <span className="h-0.5 w-2.5 rounded-full bg-zinc-950/60" />
          <span className="h-0.5 w-2.5 rounded-full bg-zinc-950/60" />
          <span className="h-0.5 w-2.5 rounded-full bg-zinc-950/60" />
        </div>
      </div>
    </div>
  )
}
