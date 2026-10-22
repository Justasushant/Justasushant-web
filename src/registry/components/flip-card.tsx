import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  /** Flip sideways or head over heels */
  direction?: 'horizontal' | 'vertical'
  /** Flip length in ms */
  duration?: number
  className?: string
}

export default function FlipCard({
  front,
  back,
  direction = 'horizontal',
  duration = 700,
  className = '',
}: FlipCardProps) {
  // Hover flips on desktop, tap flips on touch screens
  const [flipped, setFlipped] = useState(false)
  const flip = direction === 'vertical' ? 'rotateX(180deg)' : 'rotateY(180deg)'

  const face =
    'absolute inset-0 overflow-hidden rounded-2xl border border-white/10 [backface-visibility:hidden]'

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className={`group h-64 w-52 cursor-pointer [perspective:1000px] ${className}`}
    >
      <div
        className={`relative size-full ease-[cubic-bezier(.4,.2,.2,1)] [transform-style:preserve-3d] [transition-property:transform] group-hover:[transform:var(--flip)] ${
          flipped ? '[transform:var(--flip)]' : ''
        }`}
        style={{ '--flip': flip, transitionDuration: `${duration}ms` } as CSSProperties}
      >
        <div className={face}>{front}</div>
        <div className={face} style={{ transform: flip }}>
          {back}
        </div>
      </div>
    </div>
  )
}
