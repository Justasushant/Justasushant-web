import { useState } from 'react'
import type { ButtonHTMLAttributes, MouseEvent } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string
}

export default function RippleButton({
  children,
  rippleColor = '#ffffff',
  className = '',
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const size = Math.max(r.width, r.height) * 2.2
    const ripple = {
      id: Date.now() + Math.random(),
      x: e.clientX - r.left - size / 2,
      y: e.clientY - r.top - size / 2,
      size,
    }
    setRipples((prev) => [...prev, ripple])
    setTimeout(() => setRipples((prev) => prev.filter((p) => p.id !== ripple.id)), 700)
    onClick?.(e)
  }

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500 ${className}`}
      {...props}
    >
      <style>{`@keyframes ripple-button-grow { from { transform: scale(0); opacity: 1 } to { transform: scale(1); opacity: 0 } }`}</style>
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            background: `color-mix(in srgb, ${rippleColor} 45%, transparent)`,
            animation: 'ripple-button-grow 0.7s ease-out forwards',
          }}
        />
      ))}
      <span className="relative">{children}</span>
    </button>
  )
}
