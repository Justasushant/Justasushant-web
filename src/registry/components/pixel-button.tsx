import { useState } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, MouseEvent } from 'react'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  /** Colour of the hard pixel shadow and outline */
  shadowColor?: string
}

// Corners cut in 4px steps, so the button looks drawn on a pixel grid
const STEPPED =
  'polygon(0 8px, 4px 8px, 4px 4px, 8px 4px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px), calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 8px), 0 calc(100% - 8px))'

// A crisp 8-bit button. It presses down in hard steps and spits out pixels.
export default function PixelButton({
  children,
  color = '#22c55e',
  shadowColor = '#052e16',
  className = '',
  onClick,
  ...props
}: PixelButtonProps) {
  const [pops, setPops] = useState<number[]>([])

  const press = (e: MouseEvent<HTMLButtonElement>) => {
    const id = Math.random()
    setPops((p) => [...p, id])
    setTimeout(() => setPops((p) => p.filter((x) => x !== id)), 500)
    onClick?.(e)
  }

  return (
    <span className="relative inline-block pb-1.5">
      <style>{`
        @keyframes pixel-button-pop {
          from { transform: translate(0, 0) }
          to { transform: translate(var(--x), var(--y)); opacity: 0 }
        }
      `}</style>
      {/* The shadow is a second stepped shape sitting underneath */}
      <span aria-hidden className="absolute inset-x-0 bottom-0 top-1.5" style={{ clipPath: STEPPED, background: shadowColor }} />
      <button
        onClick={press}
        className={`group relative block translate-y-0 font-mono text-sm font-bold uppercase tracking-widest text-white transition-transform duration-150 ease-[steps(2)] active:translate-y-1.5 ${className}`}
        style={{ clipPath: STEPPED, background: shadowColor, padding: 4 }}
        {...props}
      >
        <span
          className="block px-6 py-3"
          style={{
            clipPath: STEPPED,
            background: color,
            boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.35), inset 0 -4px 0 rgba(0,0,0,0.25)',
            textShadow: `2px 2px 0 ${shadowColor}`,
          }}
        >
          {children}
        </span>
      </button>
      {pops.map((id) =>
        [
          [-34, -22],
          [30, -26],
          [-20, -36],
          [40, -6],
          [-42, 0],
          [8, -40],
        ].map(([x, y], i) => (
          <span
            key={`${id}-${i}`}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-2"
            style={
              {
                background: i % 2 ? color : '#fff',
                '--x': `${x}px`,
                '--y': `${y}px`,
                animation: 'pixel-button-pop 0.45s steps(5) forwards',
              } as CSSProperties
            }
          />
        )),
      )}
    </span>
  )
}
