import { Children } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface OrbitingCirclesProps {
  children: ReactNode
  /** Orbit radius in px */
  radius?: number
  /** Seconds per orbit */
  duration?: number
  reverse?: boolean
  showPath?: boolean
  className?: string
}

export default function OrbitingCircles({
  children,
  radius = 100,
  duration = 20,
  reverse = false,
  showPath = true,
  className = '',
}: OrbitingCirclesProps) {
  const items = Children.toArray(children)

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`}
    >
      <style>{`
        @keyframes orbiting-circles-spin {
          from { transform: rotate(var(--start)) translateX(var(--radius)) rotate(calc(var(--start) * -1)) }
          to { transform: rotate(calc(var(--start) + 360deg)) translateX(var(--radius)) rotate(calc((var(--start) + 360deg) * -1)) }
        }
      `}</style>
      {showPath && (
        <div
          aria-hidden
          className="absolute rounded-full border border-white/10"
          style={{ width: radius * 2, height: radius * 2 }}
        />
      )}
      {items.map((child, i) => (
        <div
          key={i}
          className="absolute size-0"
          style={
            {
              '--start': `${(360 / items.length) * i}deg`,
              '--radius': `${radius}px`,
              animation: `orbiting-circles-spin ${duration}s linear infinite`,
              animationDirection: reverse ? 'reverse' : 'normal',
            } as CSSProperties
          }
        >
          <div className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2">{child}</div>
        </div>
      ))}
    </div>
  )
}
