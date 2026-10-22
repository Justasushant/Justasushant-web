import { Children, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface HorizontalScrollProps {
  /** Each child is one full-size panel */
  children: ReactNode
  /** Snap to whole panels */
  snap?: boolean
  /** Scroll to the next panel automatically every n ms */
  autoPlay?: number
  className?: string
}

export default function HorizontalScroll({
  children,
  snap = true,
  autoPlay,
  className = '',
}: HorizontalScrollProps) {
  const panels = Children.toArray(children)
  const count = panels.length
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // Vertical scroll progress drives the horizontal position of the track
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let frame = 0
    const update = () => {
      const max = el.scrollHeight - el.clientHeight
      const progress = max > 0 ? el.scrollTop / max : 0
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-progress * (count - 1) * (100 / count)}%)`
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [count])

  useEffect(() => {
    const el = scrollRef.current
    if (!autoPlay || !el) return
    const id = setInterval(() => {
      const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
      el.scrollTo({ top: atEnd ? 0 : el.scrollTop + el.clientHeight, behavior: 'smooth' })
    }, autoPlay)
    return () => clearInterval(id)
  }, [autoPlay])

  return (
    <div
      ref={scrollRef}
      className={`relative size-full overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
        snap ? 'snap-y snap-mandatory' : ''
      } ${className}`}
    >
      <div className="relative" style={{ height: `${count * 100}%` }}>
        {/* Invisible snap points, one per panel */}
        {snap &&
          panels.map((_, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute inset-x-0 snap-start"
              style={{ top: `${(i / count) * 100}%`, height: `${100 / count}%` }}
            />
          ))}
        <div className="sticky top-0 overflow-hidden" style={{ height: `${100 / count}%` }}>
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: `${count * 100}%` }}
          >
            {panels.map((panel, i) => (
              <div key={i} className="h-full" style={{ flex: `0 0 ${100 / count}%` }}>
                {panel}
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
            <div ref={barRef} className="h-full origin-left bg-white mix-blend-difference" />
          </div>
        </div>
      </div>
    </div>
  )
}
