import { useState } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, MouseEvent } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  rotate: number
  color: string
}

interface ConfettiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number
  colors?: string[]
}

export default function ConfettiButton({
  children,
  count = 28,
  colors = ['#c6f432', '#22d3ee', '#f472b6', '#facc15', '#a78bfa'],
  className = '',
  onClick,
  ...props
}: ConfettiButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  const burst = (e: MouseEvent<HTMLButtonElement>) => {
    const batch = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
      const distance = 50 + Math.random() * 70
      return {
        id: Math.random(),
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 25,
        rotate: Math.random() * 720 - 360,
        color: colors[i % colors.length],
      }
    })
    setParticles((prev) => [...prev, ...batch])
    setTimeout(() => setParticles((prev) => prev.filter((p) => !batch.includes(p))), 1000)
    onClick?.(e)
  }

  return (
    <button
      onClick={burst}
      className={`relative rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition-transform active:scale-90 ${className}`}
      {...props}
    >
      <style>{`@keyframes confetti-button-fly { from { transform: translate(-50%, -50%) rotate(0deg); opacity: 1 } to { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(var(--r)); opacity: 0 } }`}</style>
      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-1.5 rounded-[2px]"
          style={
            {
              background: p.color,
              '--x': `${p.x}px`,
              '--y': `${p.y}px`,
              '--r': `${p.rotate}deg`,
              animation: 'confetti-button-fly 1s cubic-bezier(.15, .8, .3, 1) forwards',
            } as CSSProperties
          }
        />
      ))}
      {children}
    </button>
  )
}
