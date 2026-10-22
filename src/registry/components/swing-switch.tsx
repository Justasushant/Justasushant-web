import { Children, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface SwingSwitchProps {
  /** Each child is one full-size page */
  children: ReactNode
  /** Swing length in ms */
  duration?: number
  /** Go to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

export default function SwingSwitch({
  children,
  duration = 1000,
  autoPlay,
  className = '',
}: SwingSwitchProps) {
  const pages = Children.toArray(children)
  const count = pages.length
  const { ref, index, go } = usePager(count, duration + 150, autoPlay)
  const ease = 'cubic-bezier(.68, -0.2, .27, 1.1)'

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={`relative size-full touch-none overflow-hidden bg-black outline-none ${className}`}
    >
      {pages.map((page, i) => {
        // Past pages swing up around the bottom-left corner,
        // upcoming pages wait slightly smaller and darker underneath
        const state = i === index ? 'current' : i < index ? 'past' : 'next'
        return (
          <div
            key={i}
            className={`absolute inset-0 origin-bottom-left overflow-hidden ${
              state === 'current' ? '' : 'pointer-events-none'
            }`}
            style={{
              zIndex: count - i,
              transform:
                state === 'past'
                  ? 'rotate(-100deg) scale(1.05)'
                  : state === 'next'
                    ? 'scale(0.88)'
                    : 'rotate(0deg) scale(1)',
              borderRadius: state === 'current' ? '0px' : '28px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
              transition: `transform ${duration}ms ${ease}, border-radius ${duration}ms`,
            }}
          >
            {page}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-black"
              style={{ opacity: state === 'next' ? 0.5 : 0, transition: `opacity ${duration}ms` }}
            />
          </div>
        )
      })}
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
