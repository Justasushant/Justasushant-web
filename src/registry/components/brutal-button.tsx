import type { ButtonHTMLAttributes, CSSProperties } from 'react'

interface BrutalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  shadowColor?: string
}

export default function BrutalButton({
  children,
  color = '#ffde59',
  shadowColor = '#fafafa',
  className = '',
  style,
  ...props
}: BrutalButtonProps) {
  return (
    <button
      className={`rounded-lg border-2 border-zinc-950 bg-[var(--brutal-bg)] px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 shadow-[4px_4px_0_0_var(--brutal-shadow)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--brutal-shadow)] active:translate-x-1 active:translate-y-1 active:shadow-none ${className}`}
      style={{ '--brutal-bg': color, '--brutal-shadow': shadowColor, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </button>
  )
}
