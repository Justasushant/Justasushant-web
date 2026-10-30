import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'

interface SpiderSenseTextProps {
  text: string
  /** Colour of the tingle lines */
  color?: string
  /** Second colour, flickering slightly out of step */
  accent?: string
  /** Keep the tingle on all the time instead of only on hover */
  always?: boolean
  /** Number of tingle lines */
  lines?: number
  className?: string
}

// A zigzag pointing right, 60 units long
const ZIGZAG = 'M0 0 L12 -6 L24 6 L36 -6 L48 6 L60 0'

// The Spider-Man "spider sense": zigzag tingle lines burst out around the text
// and it shivers, like it knows something is about to happen
export default function SpiderSenseText({
  text,
  color = '#ef4444',
  accent = '#3b82f6',
  always = false,
  lines = 14,
  className = '',
}: SpiderSenseTextProps) {
  const [hover, setHover] = useState(false)
  const on = always || hover

  // Rays sit on an ellipse just outside the text, fanning out on both sides
  const rays = useMemo(
    () =>
      Array.from({ length: lines }, (_, i) => {
        const half = Math.ceil(lines / 2)
        const k = Math.floor(i / 2) / Math.max(1, half - 1) - 0.5
        const angle = (i % 2 ? 0 : 180) + k * 100 * (i % 2 ? 1 : -1)
        const rad = (angle * Math.PI) / 180
        return {
          angle,
          left: 50 + Math.cos(rad) * 54,
          top: 50 + Math.sin(rad) * 80,
          delay: (i * 97) % 500,
          scale: 0.6 + ((i * 7) % 5) / 10,
        }
      }),
    [lines],
  )

  return (
    <span
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={`relative inline-block cursor-default ${className}`}
    >
      <style>{`
        @keyframes spider-sense-tingle {
          0%, 100% { opacity: 0; transform: rotate(var(--a)) scale(calc(var(--s) * 0.5)) }
          35%, 65% { opacity: 1; transform: rotate(var(--a)) scale(var(--s)) }
          50% { opacity: 0.35 }
        }
        @keyframes spider-sense-shiver {
          0%, 100% { transform: translate(0, 0) }
          25% { transform: translate(-1.5px, 1px) }
          50% { transform: translate(1.5px, -1px) }
          75% { transform: translate(-1px, -1.5px) }
        }
      `}</style>
      {on &&
        rays.map((ray, i) => (
          <span
            key={i}
            aria-hidden
            className="pointer-events-none absolute size-0"
            style={{ left: `${ray.left}%`, top: `${ray.top}%` }}
          >
            {[color, accent].map((stroke, j) => (
              <svg
                key={j}
                viewBox="0 -8 60 16"
                width="60"
                height="16"
                className="absolute -top-2 left-0 overflow-visible"
                style={
                  {
                    '--a': `${ray.angle}deg`,
                    '--s': ray.scale,
                    transformOrigin: '0 50%',
                    animation: `spider-sense-tingle 0.8s ease-in-out ${ray.delay + j * 90}ms infinite both`,
                  } as CSSProperties
                }
              >
                <path d={ZIGZAG} fill="none" stroke={stroke} strokeWidth={j ? 2 : 3.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
          </span>
        ))}
      <span
        className="relative inline-block"
        style={{ animation: on ? 'spider-sense-shiver 0.12s linear infinite' : 'none' }}
      >
        {text}
      </span>
    </span>
  )
}
