import { useState } from 'react'

interface RatingProps {
  max?: number
  defaultValue?: number
  /** Text shown for each score, from 1 up */
  labels?: string[]
  onChange?: (value: number) => void
  color?: string
  className?: string
}

export default function Rating({
  max = 5,
  defaultValue = 0,
  labels = ['Terrible', 'Meh', 'Okay', 'Great', 'Loved it!'],
  onChange,
  color = '#facc15',
  className = '',
}: RatingProps) {
  const [value, setValue] = useState(defaultValue)
  const [hover, setHover] = useState(0)
  // Bumping this key replays the pop animation on the chosen star
  const [pop, setPop] = useState(0)
  const shown = hover || value

  const choose = (n: number) => {
    setValue(n)
    setPop((p) => p + 1)
    onChange?.(n)
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <style>{`@keyframes rating-pop { 0% { transform: scale(1) } 40% { transform: scale(1.45) rotate(-12deg) } 100% { transform: scale(1) } }`}</style>
      <div role="radiogroup" aria-label="Rating" className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {Array.from({ length: max }, (_, i) => {
          const n = i + 1
          const filled = n <= shown
          return (
            <button
              key={n === value ? `${n}-${pop}` : n}
              role="radio"
              aria-checked={value === n}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onMouseEnter={() => setHover(n)}
              onClick={() => choose(n)}
              className="p-1 transition-transform hover:scale-110"
              style={{ animation: n === value && pop ? 'rating-pop 0.45s ease-out' : undefined }}
            >
              <svg viewBox="0 0 24 24" className="size-9">
                <path
                  d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"
                  fill={filled ? color : 'transparent'}
                  stroke={filled ? color : '#52525b'}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  style={{ transition: 'fill 0.2s, stroke 0.2s' }}
                />
              </svg>
            </button>
          )
        })}
      </div>
      <p className="h-5 text-sm font-medium text-zinc-300">{shown ? labels[shown - 1] : 'Rate it'}</p>
    </div>
  )
}
