import { useState } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, MouseEvent } from 'react'

interface ComicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Sound effects to pick from on each click */
  words?: string[]
  color?: string
  /** Colour of the burst behind the word */
  burstColor?: string
}

interface Burst {
  id: number
  word: string
  x: number
  y: number
  tilt: number
}

// A jagged starburst, like the ones behind comic-book sound effects
const STAR = Array.from({ length: 24 }, (_, i) => {
  const r = i % 2 ? 30 : 50
  const a = (i / 24) * Math.PI * 2
  return `${(50 + Math.cos(a) * r).toFixed(1)}% ${(50 + Math.sin(a) * r).toFixed(1)}%`
}).join(', ')

// A chunky comic-book button. Every hit throws out a POW, BAM or ZAP.
export default function ComicButton({
  children,
  words = ['POW!', 'BAM!', 'ZAP!', 'WHAM!', 'KAPOW!', 'BOOM!'],
  color = '#facc15',
  burstColor = '#ef4444',
  className = '',
  onClick,
  ...props
}: ComicButtonProps) {
  const [bursts, setBursts] = useState<Burst[]>([])

  const hit = (e: MouseEvent<HTMLButtonElement>) => {
    const side = Math.random() > 0.5 ? 1 : -1
    const burst = {
      id: Math.random(),
      word: words[Math.floor(Math.random() * words.length)],
      x: side * (60 + Math.random() * 40),
      y: -50 - Math.random() * 30,
      tilt: side * (8 + Math.random() * 12),
    }
    setBursts((b) => [...b, burst])
    setTimeout(() => setBursts((b) => b.filter((x) => x !== burst)), 900)
    onClick?.(e)
  }

  return (
    <span className="relative inline-flex">
      <style>{`
        @keyframes comic-button-burst {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0) }
          35% { transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(1.15) rotate(var(--r)) }
          50%, 80% { transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(1) rotate(var(--r)); opacity: 1 }
          100% { transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(0.9) rotate(var(--r)); opacity: 0 }
        }
      `}</style>
      {bursts.map((b) => (
        <span
          key={b.id}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 grid h-24 w-32 place-items-center"
          style={
            {
              '--x': `${b.x}px`,
              '--y': `${b.y}px`,
              '--r': `${b.tilt}deg`,
              animation: 'comic-button-burst 0.9s cubic-bezier(.2,1.6,.4,1) forwards',
            } as CSSProperties
          }
        >
          {/* Black outline, coloured star with halftone dots, then the word */}
          <span className="absolute inset-0 bg-zinc-950" style={{ clipPath: `polygon(${STAR})` }} />
          <span
            className="absolute inset-[5px]"
            style={{
              clipPath: `polygon(${STAR})`,
              backgroundColor: burstColor,
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.25) 1.5px, transparent 1.6px)',
              backgroundSize: '6px 6px',
            }}
          />
          <span
            className="relative text-2xl font-black italic tracking-tight text-[#fef08a]"
            style={{ WebkitTextStroke: '1.5px #09090b', textShadow: '2px 2px 0 #09090b' }}
          >
            {b.word}
          </span>
        </span>
      ))}
      <button
        onClick={hit}
        className={`relative -skew-x-6 rounded-lg border-[3px] border-zinc-950 px-7 py-3 text-lg font-black uppercase italic tracking-tight text-zinc-950 shadow-[5px_5px_0_#09090b] transition-[transform,box-shadow] duration-100 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#09090b] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none ${className}`}
        style={{
          backgroundColor: color,
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1.2px, transparent 1.3px)',
          backgroundSize: '5px 5px',
        }}
        {...props}
      >
        {children}
      </button>
    </span>
  )
}
