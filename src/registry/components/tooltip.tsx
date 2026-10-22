import type { ReactNode } from 'react'

interface TooltipProps {
  label: ReactNode
  children: ReactNode
  side?: 'top' | 'bottom'
  className?: string
}

export default function Tooltip({ label, children, side = 'top', className = '' }: TooltipProps) {
  const top = side === 'top'

  return (
    <span className={`group relative inline-flex ${className}`}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 scale-75 whitespace-nowrap rounded-lg border border-white/10 bg-zinc-800 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100 ${
          top ? 'bottom-full mb-2.5 origin-bottom' : 'top-full mt-2.5 origin-top'
        }`}
      >
        {label}
        <span
          className={`absolute left-1/2 size-2 -translate-x-1/2 rotate-45 border-white/10 bg-zinc-800 ${
            top ? '-bottom-1 border-b border-r' : '-top-1 border-l border-t'
          }`}
        />
      </span>
    </span>
  )
}
