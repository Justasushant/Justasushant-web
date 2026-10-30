import { Children, useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface PanelSwitchProps {
  /** Each child is one full-size page */
  children: ReactNode
  /** Length of the switch in ms */
  duration?: number
  /** Colour of the panel borders */
  ink?: string
  /** Colour of the gutters between panels */
  paper?: string
  /** Go to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

const FULL = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

// A manga page of five panels with slanted gutters, and where each panel flies in from
const PANELS = [
  { clip: 'polygon(0% 0%, 58% 0%, 54% 46%, 0% 46%)', from: 'translate(-30%, -10%)' },
  { clip: 'polygon(59.6% 0%, 100% 0%, 100% 46%, 55.6% 46%)', from: 'translate(20%, -30%)' },
  { clip: 'polygon(0% 48%, 34% 48%, 31% 100%, 0% 100%)', from: 'translate(-25%, 30%)' },
  { clip: 'polygon(35.6% 48%, 71% 48%, 69% 100%, 32.6% 100%)', from: 'translate(0%, 40%)' },
  { clip: 'polygon(72.6% 48%, 100% 48%, 100% 100%, 70.6% 100%)', from: 'translate(30%, 20%)' },
]

// The next page arrives as manga panels: the screen turns to paper, the page
// slams in panel by panel with focus lines flashing, then the gutters close up
export default function PanelSwitch({
  children,
  duration = 1400,
  ink = '#22211f',
  paper = '#f2efe6',
  autoPlay,
  className = '',
}: PanelSwitchProps) {
  const pages = Children.toArray(children)
  const count = pages.length
  const { ref, index, go } = usePager(count, duration + 100, autoPlay)
  const [from, setFrom] = useState<{ page: number; id: number } | null>(null)
  const shown = useRef(0)

  useEffect(() => {
    if (index === shown.current) return
    setFrom({ page: shown.current, id: Math.random() })
    shown.current = index
    const timer = setTimeout(() => setFrom(null), duration + 30)
    return () => clearTimeout(timer)
  }, [index, duration])

  // Every panel has its own keyframes: fly in, hold as a panel, then open up to the full page
  const keyframes = PANELS.map(
    (p, i) => `@keyframes panel-switch-${i} {
      0% { clip-path: ${p.clip}; transform: ${p.from} scale(0.9); opacity: 0 }
      ${18 + i * 7}% { opacity: 1 }
      ${30 + i * 7}% { clip-path: ${p.clip}; transform: none }
      78% { clip-path: ${p.clip}; transform: none }
      100% { clip-path: ${FULL}; transform: none; opacity: 1 }
    }`,
  ).join('\n')
  // An outline that follows the clipped panel shape
  const outline = `drop-shadow(3px 0 0 ${ink}) drop-shadow(-3px 0 0 ${ink}) drop-shadow(0 3px 0 ${ink}) drop-shadow(0 -3px 0 ${ink})`

  return (
    <div ref={ref} tabIndex={0} className={`relative size-full touch-none overflow-hidden bg-black outline-none ${className}`}>
      <style>{`
        ${keyframes}
        @keyframes panel-switch-paper { 0% { opacity: 0 } 15%, 85% { opacity: 1 } 100% { opacity: 0 } }
        @keyframes panel-switch-lines { 0%, 10% { opacity: 0; transform: scale(1.3) } 25% { opacity: 0.35 } 60%, 100% { opacity: 0; transform: scale(1) } }
      `}</style>
      <div className="absolute inset-0">{pages[from ? from.page : index]}</div>
      {from && (
        <>
          {/* The old page turns to paper, with focus lines flashing across it */}
          <div className="absolute inset-0 z-10" style={{ background: paper, animation: `panel-switch-paper ${duration}ms linear both` }} />
          <div
            aria-hidden
            className="absolute inset-0 z-10"
            style={{
              background: `repeating-conic-gradient(from 0deg at 50% 50%, ${ink} 0deg 1deg, transparent 1deg 6deg)`,
              maskImage: 'radial-gradient(circle, transparent 20%, black 70%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 20%, black 70%)',
              animation: `panel-switch-lines ${duration}ms ease-out both`,
            }}
          />
          {PANELS.map((_, i) => (
            <div key={`${from.id}-${i}`} className="absolute inset-0 z-20" style={{ filter: outline } as CSSProperties}>
              <div
                className="absolute inset-0"
                style={{ animation: `panel-switch-${i} ${duration}ms cubic-bezier(.2,1.1,.3,1) ${i * 40}ms both` }}
              >
                {pages[index]}
              </div>
            </div>
          ))}
        </>
      )}
      <PageDots count={count} index={index} onSelect={go} />
    </div>
  )
}

function PageDots({
  count,
  index,
  onSelect,
}: {
  count: number
  index: number
  onSelect: (i: number) => void
}) {
  return (
    <div className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 mix-blend-difference">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          aria-label={`Go to page ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`w-1.5 rounded-full bg-white transition-all duration-500 ${
            i === index ? 'h-7' : 'h-1.5 opacity-50 hover:opacity-90'
          }`}
        />
      ))}
    </div>
  )
}

// Pages through with the wheel, swipes, arrow keys or a timer. Ignores input
// while a switch is running, and lets the wheel scroll the surrounding page
// once you're past the first or last page.
function usePager(count: number, cooldown: number, autoPlay?: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const current = useRef(0)
  const locked = useRef(false)

  const go = useCallback(
    (next: number) => {
      if (locked.current || next < 0 || next >= count || next === current.current) return
      locked.current = true
      current.current = next
      setIndex(next)
      setTimeout(() => {
        locked.current = false
      }, cooldown)
    },
    [count, cooldown],
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let touchY = 0
    let lastWheel = 0
    const step = (dir: number) => go(current.current + dir)
    const atEdge = (dir: number) =>
      (dir < 0 && current.current === 0) || (dir > 0 && current.current === count - 1)

    const onWheel = (e: WheelEvent) => {
      const dir = Math.sign(e.deltaY)
      if (!dir || atEdge(dir)) return
      e.preventDefault()
      // Only react to a new gesture, not the long tail of trackpad momentum
      const now = performance.now()
      const fresh = now - lastWheel > 200
      lastWheel = now
      if (fresh || Math.abs(e.deltaY) > 40) step(dir)
    }
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchY - e.changedTouches[0].clientY
      if (Math.abs(delta) > 40) step(Math.sign(delta))
    }
    const onKey = (e: KeyboardEvent) => {
      const dir = ['ArrowDown', 'PageDown'].includes(e.key)
        ? 1
        : ['ArrowUp', 'PageUp'].includes(e.key)
          ? -1
          : 0
      if (!dir) return
      e.preventDefault()
      step(dir)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('keydown', onKey)
    }
  }, [count, go])

  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => go((current.current + 1) % count), autoPlay)
    return () => clearInterval(id)
  }, [autoPlay, count, go])

  return { ref, index, go }
}
