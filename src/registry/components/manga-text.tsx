import { useState } from 'react'
import type { CSSProperties } from 'react'

interface MangaTextProps {
  text: string
  ink?: string
  paper?: string
  /** Delay between letters in ms */
  stagger?: number
  /** Overall tilt in degrees */
  tilt?: number
  className?: string
}

// Text that slams onto the page like a manga sound effect: each letter drops
// in huge and lands with a shake, then focus lines burst out behind it.
// Hover or tap to slam it again.
export default function MangaText({
  text,
  ink = '#22211f',
  paper = '#f2efe6',
  stagger = 70,
  tilt = -6,
  className = '',
}: MangaTextProps) {
  const [take, setTake] = useState(0)
  const letters = text.split('')
  const landed = letters.length * stagger + 250

  return (
    <span
      key={take}
      onPointerEnter={() => setTake((t) => t + 1)}
      onClick={() => setTake((t) => t + 1)}
      className={`relative inline-block cursor-default select-none ${className}`}
      style={{ rotate: `${tilt}deg` }}
    >
      <style>{`
        @keyframes manga-text-slam {
          0% { transform: translateY(-40%) scale(3) rotate(var(--r)); opacity: 0 }
          55% { transform: translateY(0) scale(0.92) rotate(0); opacity: 1 }
          75% { transform: scale(1.06) }
          100% { transform: scale(1) }
        }
        @keyframes manga-text-shake {
          0%, 100% { transform: translate(0, 0) }
          20% { transform: translate(-4px, 3px) }
          40% { transform: translate(4px, -2px) }
          60% { transform: translate(-2px, -3px) }
          80% { transform: translate(2px, 2px) }
        }
        @keyframes manga-text-burst {
          from { opacity: 0; transform: scale(0.6) }
          30% { opacity: 1 }
          to { opacity: 0.85; transform: scale(1) }
        }
      `}</style>
      {/* Focus lines that burst out once the last letter lands */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[60%] -z-10"
        style={{
          background: `repeating-conic-gradient(from 0deg, ${ink} 0deg 1.2deg, transparent 1.2deg 7deg)`,
          maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, transparent 38%, black 55%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, transparent 38%, black 55%, transparent 72%)',
          animation: `manga-text-burst 0.45s ease-out ${landed}ms both`,
        }}
      />
      <span className="inline-block" style={{ animation: `manga-text-shake 0.3s linear ${landed - 150}ms` }}>
        {letters.map((letter, i) => (
          <span
            key={i}
            className="inline-block font-black uppercase"
            style={
              {
                color: paper,
                WebkitTextStroke: `0.09em ${ink}`,
                paintOrder: 'stroke fill',
                textShadow: `0.07em 0.07em 0 ${ink}`,
                '--r': `${(i % 2 ? 1 : -1) * (10 + ((i * 7) % 15))}deg`,
                animation: `manga-text-slam 0.45s cubic-bezier(.2,1.4,.4,1) ${i * stagger}ms both`,
              } as CSSProperties
            }
          >
            {letter === ' ' ? ' ' : letter}
          </span>
        ))}
      </span>
    </span>
  )
}
