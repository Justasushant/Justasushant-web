import { Children, useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface TearSwitchProps {
  /** Each child is one full-size page */
  children: ReactNode
  /** How long the torn pieces take to blow away, in ms */
  duration?: number
  /** How hard the wind blows the pieces, 0 – 1 */
  wind?: number
  /** Go to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

interface Tear {
  from: number
  id: number
  left: string
  right: string
  // Where each piece flies off to
  flight: [string, string]
}

// A jagged line from top to bottom, starting somewhere random
function tearLine() {
  const start = 25 + Math.random() * 50
  const lean = (Math.random() - 0.5) * 30
  const points: string[] = []
  for (let y = 0; y <= 100; y += 5) {
    const x = start + (lean * y) / 100 + (Math.random() - 0.5) * 7
    points.push(`${x.toFixed(1)}% ${y}%`)
  }
  return points
}

// The page rips in two from a random spot, and the wind blows both halves away
export default function TearSwitch({
  children,
  duration = 1300,
  wind = 0.7,
  autoPlay,
  className = '',
}: TearSwitchProps) {
  const pages = Children.toArray(children)
  const count = pages.length
  const { ref, index, go } = usePager(count, duration * 0.7, autoPlay)
  const [tears, setTears] = useState<Tear[]>([])
  const shown = useRef(0)

  useEffect(() => {
    if (index === shown.current) return
    const from = shown.current
    shown.current = index
    const line = tearLine()
    const up = -20 - Math.random() * 40
    const tear: Tear = {
      from,
      id: Math.random(),
      left: `polygon(0 0, ${line.join(', ')}, 0 100%)`,
      right: `polygon(${line.join(', ')}, 100% 100%, 100% 0)`,
      flight: [
        `translate(${-70 * wind - 20}%, ${up}%) rotate(${-25 * wind - 10}deg)`,
        `translate(${90 * wind + 20}%, ${up - 20}%) rotate(${35 * wind + 10}deg)`,
      ],
    }
    setTears((t) => [...t, tear])
    const timer = setTimeout(() => setTears((t) => t.filter((x) => x !== tear)), duration + 50)
    return () => clearTimeout(timer)
  }, [index, duration, wind])

  return (
    <div ref={ref} tabIndex={0} className={`relative size-full touch-none overflow-hidden bg-black outline-none ${className}`}>
      <style>{`
        @keyframes tear-switch-fly {
          0% { transform: none }
          12% { transform: var(--rip) }
          100% { transform: var(--to); opacity: 0.2 }
        }
      `}</style>
      <div className="absolute inset-0">{pages[index]}</div>
      {tears.map((tear) =>
        [tear.left, tear.right].map((clip, side) => (
          <div
            key={`${tear.id}-${side}`}
            className="absolute inset-0 z-10"
            style={{ filter: 'drop-shadow(0 0 1.5px #f2efe6) drop-shadow(6px 10px 14px rgba(0,0,0,0.45))' }}
          >
            <div
              className="absolute inset-0"
              style={
                {
                  clipPath: clip,
                  // First the rip opens a crack, then the wind takes it
                  '--rip': `translateX(${side ? 2 : -2}%) rotate(${side ? 1 : -1}deg)`,
                  '--to': tear.flight[side],
                  transformOrigin: side ? '100% 0' : '0 100%',
                  animation: `tear-switch-fly ${duration}ms cubic-bezier(.5, 0, .7, .4) forwards`,
                } as CSSProperties
              }
            >
              {pages[tear.from]}
            </div>
          </div>
        )),
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
