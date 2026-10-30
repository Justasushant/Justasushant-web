import { useState } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, MouseEvent } from 'react'

interface RocketButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label?: string
  doneLabel?: string
  color?: string
}

// Click and the rocket shakes, blasts off in a puff of smoke, then the button
// says it's done. It resets after a couple of seconds.
export default function RocketButton({
  label = 'Launch',
  doneLabel = 'Launched',
  color = '#f97316',
  className = '',
  onClick,
  ...props
}: RocketButtonProps) {
  const [stage, setStage] = useState<'idle' | 'launch' | 'done'>('idle')

  const launch = (e: MouseEvent<HTMLButtonElement>) => {
    if (stage !== 'idle') return
    setStage('launch')
    setTimeout(() => setStage('done'), 1100)
    setTimeout(() => setStage('idle'), 3000)
    onClick?.(e)
  }

  return (
    <button
      onClick={launch}
      className={`relative inline-flex items-center gap-3 overflow-visible rounded-2xl bg-zinc-900 py-3 pl-4 pr-6 font-semibold text-white ring-1 ring-white/10 transition-transform active:scale-95 ${className}`}
      {...props}
    >
      <style>{`
        @keyframes rocket-button-shake { 0%, 100% { transform: translate(0, 0) rotate(-45deg) } 25% { transform: translate(-1px, 1px) rotate(-47deg) } 75% { transform: translate(1px, -1px) rotate(-43deg) } }
        @keyframes rocket-button-fly { 0% { transform: translate(0, 0) rotate(-45deg) } 100% { transform: translate(140px, -160px) rotate(-45deg) scale(0.6); opacity: 0 } }
        @keyframes rocket-button-smoke { 0% { transform: translate(0, 0) scale(0.3); opacity: 0.9 } 100% { transform: translate(var(--dx), var(--dy)) scale(1.6); opacity: 0 } }
        @keyframes rocket-button-return { from { transform: translateY(24px) rotate(-45deg); opacity: 0 } }
      `}</style>
      <span className="relative grid size-9 place-items-center rounded-xl" style={{ background: `color-mix(in srgb, ${color} 18%, transparent)` }}>
        {stage === 'done' ? (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5 9-10" />
          </svg>
        ) : (
          <svg
            key={stage}
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: 'rotate(-45deg)',
              animation:
                stage === 'launch'
                  ? 'rocket-button-shake 0.08s linear 5, rocket-button-fly 0.7s cubic-bezier(.5,0,.9,.4) 0.4s forwards'
                  : 'rocket-button-return 0.4s ease-out',
            }}
          >
            <path d="M12 2c3 2 5 6 5 10l-2 4H9l-2-4c0-4 2-8 5-10zM9 16l-2 4 3-1M15 16l2 4-3-1" />
            <circle cx="12" cy="10" r="1.6" />
          </svg>
        )}
        {stage === 'launch' &&
          [
            [-26, 10],
            [-14, 22],
            [4, 26],
            [-30, -4],
            [16, 18],
          ].map(([dx, dy], i) => (
            <span
              key={i}
              aria-hidden
              className="absolute size-3 rounded-full bg-zinc-400/70 blur-[1px]"
              style={
                {
                  '--dx': `${dx}px`,
                  '--dy': `${dy}px`,
                  animation: `rocket-button-smoke 0.9s ease-out ${0.35 + i * 0.05}s both`,
                } as CSSProperties
              }
            />
          ))}
      </span>
      <span className="relative h-6 overflow-hidden">
        <span
          className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(.3,1.4,.5,1)]"
          style={{ transform: stage === 'done' ? 'translateY(-50%)' : 'translateY(0)' }}
        >
          <span className="h-6 leading-6">{label}</span>
          <span className="h-6 leading-6" style={{ color }}>
            {doneLabel}
          </span>
        </span>
      </span>
    </button>
  )
}
