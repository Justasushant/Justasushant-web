import type { ButtonHTMLAttributes } from 'react'

interface LiquidButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Colour of the liquid */
  color?: string
  /** Text colour once the liquid has filled the button */
  fillTextColor?: string
}

// On hover, liquid rises inside the button with a rolling wave on top
export default function LiquidButton({
  children,
  color = '#22d3ee',
  fillTextColor = '#09090b',
  className = '',
  ...props
}: LiquidButtonProps) {
  return (
    <button
      className={`group relative overflow-hidden rounded-full border-2 px-8 py-3.5 font-semibold transition-colors duration-500 ${className}`}
      style={{ borderColor: color, color, ['--fill' as string]: fillTextColor }}
      {...props}
    >
      <style>{`@keyframes liquid-button-wave { to { transform: translateX(-50%) } }`}</style>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[160%] translate-y-full transition-transform duration-700 ease-[cubic-bezier(.3,1.4,.5,1)] group-hover:translate-y-[25%]"
      >
        {/* Two waves moving at different speeds make the surface look wet */}
        {[
          [0.5, '2.2s'],
          [1, '1.4s'],
        ].map(([opacity, speed], i) => (
          <svg
            key={i}
            viewBox="0 0 200 20"
            preserveAspectRatio="none"
            className="absolute -top-3 left-0 h-4 w-[200%]"
            style={{ animation: `liquid-button-wave ${speed} linear infinite`, opacity: opacity as number }}
          >
            <path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0z" fill={color} />
          </svg>
        ))}
        <span className="absolute inset-0 top-0.5" style={{ background: color }} />
      </span>
      <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--fill)] group-hover:delay-150">
        {children}
      </span>
    </button>
  )
}
