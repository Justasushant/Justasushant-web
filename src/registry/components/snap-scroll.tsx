import { Children, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface SnapScrollProps {
  /** Each child is one full-size page */
  children: ReactNode
  /** Scroll to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

export default function SnapScroll({ children, autoPlay, className = '' }: SnapScrollProps) {
  const pages = Children.toArray(children)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => setActive(Math.round(el.scrollTop / el.clientHeight))
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
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

  const goTo = (i: number) => {
    const el = scrollRef.current
    el?.scrollTo({ top: i * el.clientHeight, behavior: 'smooth' })
  }

  return (
    <div className={`relative size-full overflow-hidden bg-black ${className}`}>
      <div
        ref={scrollRef}
        className="size-full snap-y snap-mandatory overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((page, i) => (
          <section key={i} className="h-full snap-start snap-always overflow-hidden">
            {/* The page settles into place once it snaps in */}
            <div
              className="size-full transition-all duration-700 ease-out"
              style={{
                transform: active === i ? 'scale(1)' : 'scale(0.9)',
                borderRadius: active === i ? '0px' : '32px',
                opacity: active === i ? 1 : 0.4,
                overflow: 'hidden',
              }}
            >
              {page}
            </div>
          </section>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-5 left-6 font-mono text-sm text-white mix-blend-difference">
        {String(active + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
      </div>
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2 mix-blend-difference">
        {pages.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to page ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-1.5 rounded-full bg-white transition-all duration-500 ${
              i === active ? 'h-7' : 'h-1.5 opacity-50 hover:opacity-90'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
