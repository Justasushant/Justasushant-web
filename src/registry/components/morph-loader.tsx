import { useId } from 'react'
import type { CSSProperties } from 'react'

interface MorphLoaderProps {
  colors?: [string, string]
  /** Size in px */
  size?: number
  className?: string
}

// Blobs that circle a centre drop, melting into it and pulling apart again.
// The "goo" is an SVG filter: blur everything, then sharpen the edges back up.
export default function MorphLoader({
  colors = ['#c6f432', '#22d3ee'],
  size = 56,
  className = '',
}: MorphLoaderProps) {
  const id = `morph-loader-${useId().replace(/:/g, '')}`
  const blob = size * 0.34

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`relative ${className}`}
      style={{ width: size * 1.6, height: size * 1.6 }}
    >
      <svg aria-hidden className="absolute size-0">
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={size / 12} />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
        </filter>
      </svg>
      <style>{`
        @keyframes morph-loader-spin { to { transform: rotate(360deg) } }
        @keyframes morph-loader-orbit {
          0% { transform: rotate(var(--a)) translateX(0) }
          50% { transform: rotate(calc(var(--a) + 180deg)) translateX(var(--r)) }
          100% { transform: rotate(calc(var(--a) + 360deg)) translateX(0) }
        }
      `}</style>
      <div
        className="relative size-full"
        style={{ filter: `url(#${id})`, animation: 'morph-loader-spin 6s linear infinite' }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={
              {
                width: blob,
                height: blob,
                margin: -blob / 2,
                '--a': `${i * 90}deg`,
                '--r': `${size * 0.42}px`,
                background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
                animation: `morph-loader-orbit 2s cubic-bezier(.6,0,.4,1) ${i * 0.12}s infinite`,
              } as CSSProperties
            }
          />
        ))}
        <span
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: blob * 1.3,
            height: blob * 1.3,
            margin: -blob * 0.65,
            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
          }}
        />
      </div>
    </div>
  )
}
