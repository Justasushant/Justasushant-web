import { useRef, useState } from 'react'

interface HoldButtonProps {
  label?: string
  doneLabel?: string
  /** How long to hold, in ms */
  duration?: number
  color?: string
  onComplete?: () => void
  className?: string
}

export default function HoldButton({
  label = 'Hold to delete',
  doneLabel = 'Deleted ✓',
  duration = 1500,
  color = '#f43f5e',
  onComplete,
  className = '',
}: HoldButtonProps) {
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const [done, setDone] = useState(false)
  const frame = useRef(0)
  const start = useRef(0)

  const tick = (now: number) => {
    const p = Math.min((now - start.current) / duration, 1)
    setProgress(p)
    if (p < 1) {
      frame.current = requestAnimationFrame(tick)
      return
    }
    setHolding(false)
    setDone(true)
    onComplete?.()
    setTimeout(() => {
      setDone(false)
      setProgress(0)
    }, 1600)
  }

  const press = () => {
    if (done) return
    setHolding(true)
    start.current = performance.now()
    frame.current = requestAnimationFrame(tick)
  }

  // Letting go early drains the fill back out
  const release = () => {
    if (!holding) return
    cancelAnimationFrame(frame.current)
    setHolding(false)
    setProgress(0)
  }

  return (
    <button
      onPointerDown={press}
      onPointerUp={release}
      onPointerLeave={release}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && !e.repeat && press()}
      onKeyUp={release}
      className={`relative select-none overflow-hidden rounded-full border px-6 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.97] ${className}`}
      style={{ borderColor: color, background: `color-mix(in srgb, ${color} 12%, transparent)` }}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0"
        style={{
          width: `${progress * 100}%`,
          background: color,
          transition: holding ? 'none' : 'width 0.4s ease',
        }}
      />
      <span className="relative">{done ? doneLabel : label}</span>
    </button>
  )
}
