import type { ReactNode } from 'react'

interface BorderBeamCardProps {
  children: ReactNode
  /** Two beams chase each other around the edge */
  colors?: [string, string]
  /** Seconds per lap */
  duration?: number
  className?: string
}

export default function BorderBeamCard({
  children,
  colors = ['#c6f432', '#22d3ee'],
  duration = 5,
  className = '',
}: BorderBeamCardProps) {
  const [a, b] = colors

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-white/10 p-px ${className}`}>
      <style>{`@keyframes border-beam-spin { from { transform: translate(-50%, -50%) rotate(0deg) } to { transform: translate(-50%, -50%) rotate(360deg) } }`}</style>
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[250%]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg 120deg, ${a} 175deg, transparent 180deg 300deg, ${b} 355deg, transparent 360deg)`,
          animation: `border-beam-spin ${duration}s linear infinite`,
        }}
      />
      {/* A soft glow of the same beams just inside the edge */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[250%] opacity-40 blur-2xl"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg 120deg, ${a} 175deg, transparent 180deg 300deg, ${b} 355deg, transparent 360deg)`,
          animation: `border-beam-spin ${duration}s linear infinite`,
        }}
      />
      <div className="relative h-full rounded-[15px] bg-zinc-950/95 p-6">{children}</div>
    </div>
  )
}
