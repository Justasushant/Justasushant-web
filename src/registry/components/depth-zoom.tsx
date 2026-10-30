import { Children, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface DepthZoomProps {
  /** Each child is one full-size page, lined up one behind the other */
  children: ReactNode
  /** Space between pages along the depth axis, in px */
  depth?: number
  /** How smoothly the camera catches up, 0.02 (floaty) – 0.3 (snappy) */
  smoothing?: number
  /** Fly forward automatically every n ms */
  autoPlay?: number
  className?: string
}

// Pages hang one behind another in 3D space. Scrolling flies the camera
// forward through them continuously, like moving through a video.
export default function DepthZoom({
  children,
  depth = 1400,
  smoothing = 0.08,
  autoPlay,
  className = '',
}: DepthZoomProps) {
  const pages = Children.toArray(children)
  const count = pages.length
  const ref = useRef<HTMLDivElement>(null)
  const layers = useRef<(HTMLDivElement | null)[]>([])
  const target = useRef(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let pos = 0
    let raf = 0
    let touchY = 0
    const max = count - 1
    const clamp = (v: number) => Math.min(max, Math.max(0, v))

    const tick = () => {
      pos += (target.current - pos) * smoothing
      layers.current.forEach((layer, i) => {
        if (!layer) return
        // 0 = right in front of the camera, positive = further away, negative = behind us
        const d = i - pos
        const z = -d * depth
        // Pages fade in from the fog and fade out as they rush past the camera
        const opacity = d < 0 ? Math.max(0, 1 + d * 2.2) : Math.max(0, 1 - d * 0.45)
        layer.style.transform = `translateZ(${z}px)`
        layer.style.opacity = String(opacity)
        layer.style.filter = d > 0.05 ? `blur(${Math.min(6, d * 3)}px)` : 'none'
        layer.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
        layer.style.pointerEvents = Math.abs(d) < 0.5 ? 'auto' : 'none'
      })
      setActive(Math.round(pos))
      raf = requestAnimationFrame(tick)
    }

    const onWheel = (e: WheelEvent) => {
      const next = clamp(target.current + e.deltaY / 900)
      // Let the page scroll on once you reach either end
      if (next === target.current) return
      e.preventDefault()
      target.current = next
    }
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY
      target.current = clamp(target.current + (touchY - y) / 400)
      touchY = y
    }
    const onKey = (e: KeyboardEvent) => {
      const dir = ['ArrowDown', 'PageDown'].includes(e.key) ? 1 : ['ArrowUp', 'PageUp'].includes(e.key) ? -1 : 0
      if (!dir) return
      e.preventDefault()
      target.current = clamp(Math.round(target.current) + dir)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('keydown', onKey)
    const timer = autoPlay
      ? setInterval(() => (target.current = target.current >= max ? 0 : Math.round(target.current) + 1), autoPlay)
      : undefined
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(timer)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('keydown', onKey)
    }
  }, [count, depth, smoothing, autoPlay])

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={`relative size-full touch-none overflow-hidden bg-black outline-none ${className}`}
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {pages.map((page, i) => (
          <div
            key={i}
            ref={(node) => {
              layers.current[i] = node
            }}
            className="absolute inset-0 will-change-transform"
            style={{ zIndex: count - i }}
          >
            {page}
          </div>
        ))}
      </div>
      <PageDots count={count} index={active} onSelect={(i) => (target.current = i)} />
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
