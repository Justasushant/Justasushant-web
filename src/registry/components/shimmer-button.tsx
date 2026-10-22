import type { ButtonHTMLAttributes } from 'react'

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  background?: string
}

export default function ShimmerButton({
  children,
  shimmerColor = '#ffffff',
  background = '#09090b',
  className = '',
  style,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03] active:scale-95 ${className}`}
      style={{ background, ...style }}
      {...props}
    >
      <style>{`@keyframes shimmer-button-sweep { from { transform: translateX(-120%) } to { transform: translateX(120%) } }`}</style>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(110deg, transparent 30%, color-mix(in srgb, ${shimmerColor} 40%, transparent) 50%, transparent 70%)`,
          animation: 'shimmer-button-sweep 2.6s ease-in-out infinite',
        }}
      />
      <span
        aria-hidden
        className="absolute inset-x-4 bottom-0 h-px opacity-60 transition-opacity group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)` }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
}
