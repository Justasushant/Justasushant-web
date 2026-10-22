import { useMemo } from 'react'

interface MeteorsProps {
  count?: number
  color?: string
  className?: string
}

export default function Meteors({ count = 26, color = '#ffffff', className = '' }: MeteorsProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 110 - 20,
        top: Math.random() * 40 - 10,
        delay: Math.random() * 4,
        duration: 2.5 + Math.random() * 4,
      })),
    [count],
  )

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <style>{`
        @keyframes meteors-fall {
          0% { transform: rotate(215deg) translateX(0); opacity: 1 }
          70% { opacity: 1 }
          100% { transform: rotate(215deg) translateX(-900px); opacity: 0 }
        }
      `}</style>
      {meteors.map((m, i) => (
        <span
          key={i}
          className="absolute size-0.5 rounded-full"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            background: color,
            boxShadow: `0 0 6px 1px ${color}`,
            animation: `meteors-fall ${m.duration}s linear ${m.delay}s infinite`,
            opacity: 0,
          }}
        >
          <span
            className="absolute left-0 top-1/2 h-px w-28 -translate-y-1/2"
            style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
          />
        </span>
      ))}
    </div>
  )
}
