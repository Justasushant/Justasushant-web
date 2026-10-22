import type { ReactNode } from 'react'

interface GradientTextProps {
  children: ReactNode
  colors?: string[]
  /** Seconds per loop */
  speed?: number
  className?: string
}

export default function GradientText({
  children,
  colors = ['#c6f432', '#22d3ee', '#a855f7', '#f472b6'],
  speed = 5,
  className = '',
}: GradientTextProps) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${[...colors, colors[0]].join(', ')})`,
        backgroundSize: '200% auto',
        animation: `gradient-text-flow ${speed}s linear infinite`,
      }}
    >
      <style>{`@keyframes gradient-text-flow { to { background-position: 200% center } }`}</style>
      {children}
    </span>
  )
}
