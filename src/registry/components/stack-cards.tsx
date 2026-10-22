import { useRef, useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'

interface StackCardsProps {
  /** Each item is the content of one card */
  cards: ReactNode[]
  /** How far (px) you need to drag before a card flies off */
  threshold?: number
  className?: string
}

export default function StackCards({ cards, threshold = 100, className = '' }: StackCardsProps) {
  // Order of the deck: the first index is the card on top
  const [order, setOrder] = useState(() => cards.map((_, i) => i))
  const [drag, setDrag] = useState({ x: 0, active: false })
  const [leaving, setLeaving] = useState<{ id: number; dir: number } | null>(null)
  const start = useRef(0)

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (leaving) return
    start.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
    setDrag({ x: 0, active: true })
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.active) setDrag({ x: e.clientX - start.current, active: true })
  }

  const onPointerUp = () => {
    if (!drag.active) return
    if (Math.abs(drag.x) > threshold) {
      // Throw the card off-screen, then tuck it in at the back of the deck
      const top = order[0]
      setLeaving({ id: top, dir: Math.sign(drag.x) })
      setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]])
        setLeaving(null)
      }, 350)
    }
    setDrag({ x: 0, active: false })
  }

  return (
    <div className={`relative h-80 w-64 select-none ${className}`}>
      {order
        .slice()
        .reverse()
        .map((id) => {
          const depth = order.indexOf(id)
          const isTop = depth === 0
          const flying = leaving?.id === id
          const x = flying ? leaving.dir * 500 : isTop ? drag.x : 0
          const transform = `translate(${x}px, ${depth * 14}px) rotate(${flying ? leaving.dir * 30 : isTop ? drag.x * 0.06 : depth * -2}deg) scale(${1 - depth * 0.05})`
          return (
            <div
              key={id}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
              className={`absolute inset-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 ${
                isTop ? 'cursor-grab touch-none active:cursor-grabbing' : ''
              }`}
              style={{
                transform,
                opacity: flying ? 0 : depth > 3 ? 0 : 1,
                transition: drag.active && isTop ? 'none' : 'transform 0.35s ease, opacity 0.35s ease',
              }}
            >
              {cards[id]}
            </div>
          )
        })}
    </div>
  )
}
