import type { ButtonHTMLAttributes } from 'react'

interface GlowBorderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colors?: string[]
  duration?: number
}

export default function GlowBorderButton({
  children,
  colors = ['#c6f432', '#22d3ee', '#a855f7', '#c6f432'],
  duration = 3,
  className = '',
  ...props
}: GlowBorderButtonProps) {
  const gradient = `conic-gradient(from 0deg, ${colors.join(', ')})`

  return (
    <button
      className={`group relative inline-flex overflow-hidden rounded-full p-[1.5px] transition-transform active:scale-95 ${className}`}
      {...props}
    >
      <style>{`@keyframes glow-border-spin { from { transform: translate(-50%, -50%) rotate(0deg) } to { transform: translate(-50%, -50%) rotate(360deg) } }`}</style>
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[300%]"
        style={{ background: gradient, animation: `glow-border-spin ${duration}s linear infinite` }}
      />
      <span className="relative inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors group-hover:bg-zinc-900">
        {children}
      </span>
    </button>
  )
}
