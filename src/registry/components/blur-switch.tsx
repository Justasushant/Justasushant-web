import { Children, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface BlurSwitchProps {
  /** Each child is one full-size page */
  children: ReactNode
  /** Length of the whole switch in ms */
  duration?: number
  /** Go to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

export default function BlurSwitch({
  children,
  duration = 900,
  autoPlay,
  className = '',
}: BlurSwitchProps) {
  const pages = Children.toArray(children)
  const { ref, index, go } = usePager(pages.length, duration + 200, autoPlay)
  const [shown, setShown] = useState(0)
  const [blurred, setBlurred] = useState(false)

  // Blur out, swap the page while nothing is readable, then blur back in
  useEffect(() => {
    if (index === shown) return
    setBlurred(true)
    const swap = setTimeout(() => {
      setShown(index)
      setBlurred(false)
    }, duration / 2)
    return () => clearTimeout(swap)
  }, [index, shown, duration])

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={`relative size-full touch-none overflow-hidden bg-black outline-none ${className}`}
    >
      <div
        className="size-full ease-in-out"
        style={{
          transitionProperty: 'filter, transform, opacity',
          transitionDuration: `${duration / 2}ms`,
          filter: blurred ? 'blur(30px) saturate(1.8)' : 'blur(0px) saturate(1)',
          transform: blurred ? 'scale(1.1)' : 'scale(1)',
          opacity: blurred ? 0.55 : 1,
        }}
      >
        {pages[shown]}
      </div>
      <PageDots count={pages.length} index={index} onSelect={go} />
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
