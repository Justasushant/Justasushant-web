import { useEffect, useState } from 'react'
import type { ButtonHTMLAttributes } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  color: string
}

interface SparkleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colors?: string[]
}

export default function SparkleButton({
  children,
  colors = ['#fde047', '#c6f432', '#f0abfc', '#ffffff'],
  className = '',
  ...props
}: SparkleButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  // Compare colours by value so a new array with the same colours does not restart the timer
  const colorKey = colors.join(',')

  // While hovered, keep sprinkling new stars around the button
  useEffect(() => {
    if (!hovered) return
    const palette = colorKey.split(',')
    const id = setInterval(() => {
      const sparkle = {
        id: Math.random(),
        x: Math.random() * 110 - 5,
        y: Math.random() * 120 - 10,
        size: 8 + Math.random() * 10,
        color: palette[Math.floor(Math.random() * palette.length)],
      }
      setSparkles((prev) => [...prev.slice(-10), sparkle])
    }, 140)
    return () => clearInterval(id)
  }, [hovered, colorKey])

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-105 active:scale-95 ${className}`}
      {...props}
    >
      <style>{`@keyframes sparkle-button-twinkle { 0% { transform: scale(0) rotate(0deg) } 50% { transform: scale(1) rotate(90deg) } 100% { transform: scale(0) rotate(180deg) } }`}</style>
      {sparkles.map((s) => (
        <svg
          key={s.id}
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            marginLeft: -s.size / 2,
            marginTop: -s.size / 2,
            animation: 'sparkle-button-twinkle 0.8s ease-in-out forwards',
          }}
        >
          <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0z" fill={s.color} />
        </svg>
      ))}
      <span className="relative">{children}</span>
    </button>
  )
}
