import { useRef, useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'

interface CompareSliderProps {
  before: ReactNode
  after: ReactNode
  /** Starting position of the divider, 0 – 100 */
  defaultPosition?: number
  className?: string
}

export default function CompareSlider({
  before,
  after,
  defaultPosition = 50,
  className = '',
}: CompareSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(defaultPosition)
  const [dragging, setDragging] = useState(false)

  const moveTo = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (r) setPosition(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    moveTo(e.clientX)
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={(e) => dragging && moveTo(e.clientX)}
      onPointerUp={() => setDragging(false)}
      className={`relative aspect-video w-full max-w-xl cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-white/10 ${className}`}
    >
      <div className="absolute inset-0">{before}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        {after}
      </div>
      {/* Divider and handle */}
      <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${position}%` }}>
        <div
          role="slider"
          aria-label="Comparison position"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5))
            if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5))
          }}
          className={`absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-zinc-950 shadow-xl transition-transform ${
            dragging ? 'scale-110' : ''
          }`}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
