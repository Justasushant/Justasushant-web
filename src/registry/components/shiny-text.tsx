import type { ReactNode } from 'react'

interface ShinyTextProps {
  children: ReactNode
  baseColor?: string
  shineColor?: string
  /** Seconds per sweep */
  speed?: number
  className?: string
}

export default function ShinyText({
  children,
  baseColor = '#71717a',
  shineColor = '#ffffff',
  speed = 3,
  className = '',
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%)`,
        backgroundSize: '250% 100%',
        animation: `shiny-text-sweep ${speed}s linear infinite`,
      }}
    >
      <style>{`@keyframes shiny-text-sweep { from { background-position: 100% 0 } to { background-position: -50% 0 } }`}</style>
      {children}
    </span>
  )
}
