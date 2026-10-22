import { Children, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface CubeRotateProps {
  /** Each child is one full-size page (3 or more works best) */
  children: ReactNode
  /** Rotation length in ms */
  duration?: number
  /** Go to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

export default function CubeRotate({
  children,
  duration = 1100,
  autoPlay,
  className = '',
}: CubeRotateProps) {
  const pages = Children.toArray(children)
  const count = pages.length
  const { ref, index, go } = usePager(count, duration + 200, autoPlay)
  const [height, setHeight] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const firstRun = useRef(true)

  // The pages sit on the faces of a prism, so we need the real height
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(() => setHeight(el.clientHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  // Pull back while rotating, then push in again
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    setZoomed(true)
    const t = setTimeout(() => setZoomed(false), duration / 2)
    return () => clearTimeout(t)
  }, [index, duration])

  const angle = 360 / Math.max(count, 3)
  const depth = height / 2 / Math.tan(Math.PI / Math.max(count, 3))
  const ease = 'cubic-bezier(.65, 0, .35, 1)'

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={`relative size-full touch-none overflow-hidden bg-black outline-none ${className}`}
      style={{ perspective: '1600px' }}
    >
      <div
        className="size-full"
        style={{
          transform: zoomed ? 'scale(0.78)' : 'scale(1)',
          transition: `transform ${duration / 2}ms ${ease}`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="relative size-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(${-depth}px) rotateX(${index * angle}deg)`,
            transition: `transform ${duration}ms ${ease}`,
          }}
        >
          {pages.map((page, i) => (
            <div
              key={i}
              className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
              style={{ transform: `rotateX(${-i * angle}deg) translateZ(${depth}px)` }}
            >
              {page}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-black"
                style={{ opacity: i === index ? 0 : 0.55, transition: `opacity ${duration}ms` }}
              />
            </div>
          ))}
        </div>
      </div>
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
