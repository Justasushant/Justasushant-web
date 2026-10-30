import { useState } from 'react'
import type { CSSProperties } from 'react'

interface HeartButtonProps {
  /** Starting number of likes */
  count?: number
  color?: string
  /** Colours of the little burst around the heart */
  burstColors?: string[]
  className?: string
}

// A like button: the heart pops, a ring and a burst of dots fly out, and the
// counter rolls up to the new number
export default function HeartButton({
  count = 128,
  color = '#f43f5e',
  burstColors = ['#f43f5e', '#fb923c', '#facc15', '#a78bfa', '#22d3ee'],
  className = '',
}: HeartButtonProps) {
  const [liked, setLiked] = useState(false)
  const [pops, setPops] = useState(0)
  const total = count + (liked ? 1 : 0)

  const toggle = () => {
    if (!liked) setPops((n) => n + 1)
    setLiked(!liked)
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike' : 'Like'}
      className={`inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-900 py-2 pl-3 pr-5 text-white transition-colors hover:border-white/25 ${className}`}
    >
      <style>{`
        @keyframes heart-button-pop { 0% { transform: scale(0.2) } 50% { transform: scale(1.3) } 75% { transform: scale(0.9) } 100% { transform: scale(1) } }
        @keyframes heart-button-ring { 0% { transform: scale(0.2); opacity: 1; border-width: 10px } 100% { transform: scale(1.6); opacity: 0; border-width: 0 } }
        @keyframes heart-button-dot { 0% { transform: rotate(var(--a)) translateY(0) scale(1) } 100% { transform: rotate(var(--a)) translateY(-22px) scale(0) } }
        @keyframes heart-button-count { from { transform: translateY(100%); opacity: 0 } }
      `}</style>
      <span className="relative grid size-7 place-items-center">
        {liked && (
          <span key={pops} aria-hidden className="absolute inset-0">
            <span
              className="absolute inset-0 rounded-full border-solid"
              style={{ borderColor: color, animation: 'heart-button-ring 0.5s ease-out forwards' }}
            />
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] size-1.5 rounded-full"
                style={
                  {
                    '--a': `${i * 36}deg`,
                    background: burstColors[i % burstColors.length],
                    animation: 'heart-button-dot 0.6s ease-out 0.1s both',
                  } as CSSProperties
                }
              />
            ))}
          </span>
        )}
        <svg
          key={liked ? `on-${pops}` : 'off'}
          viewBox="0 0 24 24"
          className="relative size-6"
          fill={liked ? color : 'none'}
          stroke={liked ? color : 'currentColor'}
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ animation: liked ? 'heart-button-pop 0.45s ease-out' : undefined }}
        >
          <path d="M12 20s-7-4.5-9-9a4.5 4.5 0 0 1 9-3 4.5 4.5 0 0 1 9 3c-2 4.5-9 9-9 9z" />
        </svg>
      </span>
      <span className="relative h-5 min-w-8 overflow-hidden text-left font-mono text-sm tabular-nums leading-5">
        <span key={total} className="block" style={{ animation: 'heart-button-count 0.35s ease-out' }}>
          {total}
        </span>
      </span>
    </button>
  )
}
