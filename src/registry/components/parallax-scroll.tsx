import { Children, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface ParallaxScrollProps {
  /** Each child is one full-size page */
  children: ReactNode
  /** Show the floating shapes that drift at different speeds */
  showShapes?: boolean
  /** Scroll to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

// [left %, top % of the whole scroll, size px, speed, shape]
const SHAPES: [number, number, number, number, 'ring' | 'dot' | 'plus'][] = [
  [8, 12, 90, 0.4, 'ring'],
  [82, 20, 14, 1.6, 'dot'],
  [70, 38, 40, 0.8, 'plus'],
  [15, 55, 22, 1.3, 'dot'],
  [88, 62, 140, 0.3, 'ring'],
  [30, 80, 36, 1.1, 'plus'],
  [60, 92, 18, 1.8, 'dot'],
]

export default function ParallaxScroll({
  children,
  showShapes = true,
  autoPlay,
  className = '',
}: ParallaxScrollProps) {
  const pages = Children.toArray(children)
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let frame = 0
    const update = () => {
      const h = el.clientHeight
      const y = el.scrollTop
      // Page content lags behind the scroll and fades as it leaves
      contentRefs.current.forEach((node, i) => {
        if (!node) return
        const offset = y - i * h
        node.style.transform = `translateY(${offset * 0.45}px) scale(${1 - Math.abs(offset) / h / 6})`
        node.style.opacity = String(1 - Math.min(Math.abs(offset) / h, 1) * 0.9)
      })
      // Shapes move at their own speed, so they feel like separate layers
      shapeRefs.current.forEach((node, i) => {
        if (node) node.style.transform = `translateY(${-y * SHAPES[i][3]}px)`
      })
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
  }, [])

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
    <div className={`relative size-full overflow-hidden bg-black ${className}`}>
      <div
        ref={scrollRef}
        className="size-full overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((page, i) => (
          <section key={i} className="h-full overflow-hidden">
            <div
              ref={(node) => {
                contentRefs.current[i] = node
              }}
              className="size-full will-change-transform"
            >
              {page}
            </div>
          </section>
        ))}
      </div>
      {showShapes && (
        <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-difference">
          {SHAPES.map(([left, top, size, , shape], i) => (
            <div
              key={i}
              ref={(node) => {
                shapeRefs.current[i] = node
              }}
              className="absolute"
              style={{ left: `${left}%`, top: `${top * pages.length}%`, width: size, height: size }}
            >
              {shape === 'ring' && <div className="size-full rounded-full border-2 border-white/80" />}
              {shape === 'dot' && <div className="size-full rounded-full bg-white" />}
              {shape === 'plus' && (
                <div className="relative size-full">
                  <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-white" />
                  <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
