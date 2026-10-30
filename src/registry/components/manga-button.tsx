import { useState } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, MouseEvent } from 'react'

interface MangaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** "ink" is filled black, "paper" is filled white, "outline" is just the border */
  variant?: 'ink' | 'paper' | 'outline'
  /** Sound effect that bursts out when it's clicked */
  sfx?: string
  ink?: string
  paper?: string
}

// A jagged starburst, like the balloons behind manga sound effects
const BURST = Array.from({ length: 20 }, (_, i) => {
  const r = i % 2 ? 34 : 50
  const a = (i / 20) * Math.PI * 2
  return `${(50 + Math.cos(a) * r).toFixed(1)}% ${(50 + Math.sin(a) * r).toFixed(1)}%`
}).join(', ')

// A manga-style button: hard ink shadow, screentone that slides in on hover,
// and a starburst sound effect when you hit it
export default function MangaButton({
  children,
  variant = 'ink',
  sfx = 'ドン!',
  ink = '#22211f',
  paper = '#f2efe6',
  className = '',
  onClick,
  ...props
}: MangaButtonProps) {
  const [bursts, setBursts] = useState<{ id: number; tilt: number }[]>([])
  const fill = variant === 'ink' ? ink : variant === 'paper' ? paper : 'transparent'
  const text = variant === 'ink' ? paper : ink

  const press = (e: MouseEvent<HTMLButtonElement>) => {
    const burst = { id: Math.random(), tilt: (Math.random() - 0.5) * 24 }
    setBursts((b) => [...b, burst])
    setTimeout(() => setBursts((b) => b.filter((x) => x !== burst)), 650)
    onClick?.(e)
  }

  return (
    <span className="relative inline-flex">
      <style>{`
        @keyframes manga-button-burst {
          0% { transform: translate(-50%, -50%) scale(0.2) rotate(var(--tilt)); opacity: 1 }
          35% { transform: translate(-50%, -125%) scale(1.1) rotate(var(--tilt)) }
          75% { transform: translate(-50%, -130%) scale(1) rotate(var(--tilt)); opacity: 1 }
          100% { transform: translate(-50%, -140%) scale(0.95) rotate(var(--tilt)); opacity: 0 }
        }
      `}</style>
      {bursts.map((b) => (
        <span
          key={b.id}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 grid h-20 w-28 place-items-center"
          style={{ '--tilt': `${b.tilt}deg`, animation: 'manga-button-burst 0.65s cubic-bezier(.2,1.4,.4,1) forwards' } as CSSProperties}
        >
          <span className="absolute inset-0" style={{ background: ink, clipPath: `polygon(${BURST})` }} />
          <span className="absolute inset-[4px]" style={{ background: paper, clipPath: `polygon(${BURST})` }} />
          <span className="relative text-xl font-black" style={{ color: ink }}>
            {sfx}
          </span>
        </span>
      ))}
      <button
        onClick={press}
        className={`group relative overflow-hidden border-[3px] px-7 py-3 text-sm font-black uppercase tracking-wider transition-[transform,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] ${className}`}
        style={{ background: fill, color: text, borderColor: ink, boxShadow: `4px 4px 0 ${ink}` }}
        {...props}
      >
        {/* Screentone sweeps across on hover */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"
          style={{
            backgroundImage: `radial-gradient(${text} 0.9px, transparent 1.1px)`,
            backgroundSize: '5px 5px',
            opacity: 0.3,
            maskImage: 'linear-gradient(to right, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
          }}
        />
        <span className="relative">{children}</span>
      </button>
    </span>
  )
}
