import type { CSSProperties } from 'react'

interface WavyTextProps {
  text: string
  /** Wave height in em */
  height?: number
  /** Seconds per wave */
  speed?: number
  className?: string
}

export default function WavyText({ text, height = 0.25, speed = 1.6, className = '' }: WavyTextProps) {
  return (
    <span aria-label={text} className={`inline-flex ${className}`}>
      <style>{`
        @keyframes wavy-text-bounce {
          0%, 60%, 100% { transform: translateY(0) }
          30% { transform: translateY(calc(var(--wave) * -1)) }
        }
      `}</style>
      {text.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block"
          style={
            {
              '--wave': `${height}em`,
              animation: `wavy-text-bounce ${speed}s ease-in-out ${i * 0.06}s infinite`,
            } as CSSProperties
          }
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}
