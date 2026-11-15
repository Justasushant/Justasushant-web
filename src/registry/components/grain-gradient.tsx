import { useId } from 'react'

interface GrainGradientProps {
  /** The one colour the glow is made of */
  color?: string
  /** Colour behind the glow */
  background?: string
  /** Noise strength (0 – 1) */
  grain?: number
  /** Seconds the grain takes to shimmer once. 0 holds it perfectly still. */
  speed?: number
  className?: string
}

// A still gradient glow with film grain on top. Only the grain moves.
export default function GrainGradient({
  color = '#e8500e',
  background = '#140a05',
  grain = 0.35,
  speed = 1.2,
  className = '',
}: GrainGradientProps) {
  const filterId = `grain-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <style>{`
        @keyframes grain-gradient-jitter {
          0% { transform: translate(0, 0) }
          20% { transform: translate(-3%, 2%) }
          40% { transform: translate(2%, -3%) }
          60% { transform: translate(-2%, -1%) }
          80% { transform: translate(3%, 3%) }
          100% { transform: translate(0, 0) }
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 105%, ${color}, color-mix(in srgb, ${color} 45%, transparent) 45%, transparent 75%), ${background}`,
        }}
      />
      <svg
        className="absolute -inset-[8%] size-[116%] mix-blend-overlay"
        style={{ opacity: grain, animation: speed > 0 ? `grain-gradient-jitter ${speed}s steps(1, end) infinite` : undefined }}
      >
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  )
}
