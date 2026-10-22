import type { ButtonHTMLAttributes, CSSProperties } from 'react'

interface SlideFillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fillColor?: string
}

export default function SlideFillButton({
  children,
  fillColor = '#c6f432',
  className = '',
  style,
  ...props
}: SlideFillButtonProps) {
  return (
    <button
      className={`group relative overflow-hidden rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors duration-500 hover:border-[var(--fill)] hover:text-zinc-950 ${className}`}
      style={{ '--fill': fillColor, ...style } as CSSProperties}
      {...props}
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-full aspect-square w-[160%] -translate-x-1/2 rounded-full bg-[var(--fill)] transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] group-hover:-translate-y-[60%]"
      />
      <span className="relative inline-flex items-center gap-2">
        {children}
        <svg
          viewBox="0 0 24 24"
          className="size-4 transition-transform duration-500 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </button>
  )
}
