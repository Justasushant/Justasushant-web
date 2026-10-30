import { Children, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface DiagonalSwitchProps {
  /** Each child is one full-size page */
  children: ReactNode
  /** Wipe length in ms */
  duration?: number
  /** Colour of the slash that leads the wipe */
  slashColor?: string
  /** Go to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

// A hard diagonal slash cuts across the screen and the next page wipes in behind it
export default function DiagonalSwitch({
  children,
  duration = 900,
  slashColor = '#f2efe6',
  autoPlay,
  className = '',
}: DiagonalSwitchProps) {
  const pages = Children.toArray(children)
  const count = pages.length
  const { ref, index, go } = usePager(count, duration + 150, autoPlay)

  return (
    <div ref={ref} tabIndex={0} className={`relative size-full touch-none overflow-hidden bg-black outline-none ${className}`}>
      <style>{`@keyframes diagonal-switch-slash { from { transform: translate(-50%, -50%) rotate(-45deg) translateY(-650%) } to { transform: translate(-50%, -50%) rotate(-45deg) translateY(650%) } }`}</style>
      {pages.map((page, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            zIndex: i,
            // A triangle from the top-left corner that grows past the opposite corner
            clipPath:
              i === 0 ? undefined : i <= index ? 'polygon(0 0, 220% 0, 0 220%)' : 'polygon(0 0, 0 0, 0 0)',
            transition: `clip-path ${duration}ms cubic-bezier(.7, 0, .2, 1)`,
          }}
        >
          {page}
        </div>
      ))}
      {/* The slash: a bright band racing across along the wipe edge */}
      <div
        key={index}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-[12%] w-[300%]"
        style={{
          background: `linear-gradient(to bottom, transparent, ${slashColor} 40%, ${slashColor} 60%, transparent)`,
          animation: index ? `diagonal-switch-slash ${duration}ms cubic-bezier(.7, 0, .2, 1) both` : 'none',
          opacity: index ? 1 : 0,
          mixBlendMode: 'difference',
        }}
      />
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
