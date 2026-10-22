import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  /** Show the floating colour orbs behind the card */
  showOrbs?: boolean
  /** How frosted the glass is, in px */
  blur?: number
  className?: string
}

export default function GlassCard({
  children,
  showOrbs = true,
  blur = 24,
  className = '',
}: GlassCardProps) {
  return (
    <div className="relative">
      <style>{`
        @keyframes glass-card-float {
          0%, 100% { transform: translate(0, 0) }
          50% { transform: translate(14px, -18px) }
        }
      `}</style>
      {showOrbs && (
        <>
          <div
            aria-hidden
            className="absolute -left-10 -top-10 size-32 rounded-full bg-[#c6f432]"
            style={{ animation: 'glass-card-float 6s ease-in-out infinite' }}
          />
          <div
            aria-hidden
            className="absolute -bottom-12 -right-8 size-40 rounded-full bg-fuchsia-500"
            style={{ animation: 'glass-card-float 7s ease-in-out -2s infinite reverse' }}
          />
        </>
      )}
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${className}`}
        style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
        {children}
      </div>
    </div>
  )
}
