import { Children, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface StackScrollProps {
  /** Each child is one full-size page */
  children: ReactNode
  /** Scroll to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

export default function StackScroll({ children, autoPlay, className = '' }: StackScrollProps) {
  const pages = Children.toArray(children)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // As the next page slides over, the one underneath shrinks back and darkens
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let frame = 0
    const update = () => {
      const h = el.clientHeight
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const covered = Math.min(Math.max((el.scrollTop - i * h) / h, 0), 1)
        card.style.transform = `scale(${1 - covered * 0.12}) translateY(${covered * -4}%)`
        card.style.filter = `brightness(${1 - covered * 0.6})`
        card.style.borderRadius = `${covered * 36}px`
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
    <div
      ref={scrollRef}
      className={`relative size-full overflow-y-auto overscroll-contain bg-black [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {pages.map((page, i) => (
        <div key={i} className="sticky top-0 h-full overflow-hidden">
          <div
            ref={(node) => {
              cardRefs.current[i] = node
            }}
            className="size-full origin-top overflow-hidden will-change-transform"
          >
            {page}
          </div>
        </div>
      ))}
    </div>
  )
}
