import { useState } from 'react'

interface FocusCard {
  title: string
  /** Any CSS background: colour, gradient or url() */
  background: string
}

interface FocusCardsProps {
  cards: FocusCard[]
  /** Blur applied to the cards you're not looking at, in px */
  blur?: number
  className?: string
}

export default function FocusCards({ cards, blur = 4, className = '' }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className={`grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 ${className}`}>
      {cards.map((card, i) => {
        // Hovering one card pushes all the others out of focus
        const dimmed = hovered !== null && hovered !== i
        return (
          <div
            key={card.title}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative aspect-[4/5] overflow-hidden rounded-xl transition-all duration-300 ease-out"
            style={{
              background: card.background,
              filter: dimmed ? `blur(${blur}px) grayscale(0.6)` : 'none',
              transform: dimmed ? 'scale(0.96)' : 'scale(1)',
              opacity: dimmed ? 0.6 : 1,
            }}
          >
            <div
              className={`absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
                hovered === i ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-lg font-semibold text-white">{card.title}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
