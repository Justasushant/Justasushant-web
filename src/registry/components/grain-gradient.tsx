import { useId } from 'react'

interface GrainGradientProps {
  /** [base, blob 1, blob 2, blob 3] */
  colors?: [string, string, string, string]
  /** Noise strength (0 – 1) */
  grain?: number
  className?: string
}

export default function GrainGradient({
  colors = ['#0c0a1d', '#c6f432', '#0e7490', '#7e22ce'],
  grain = 0.3,
  className = '',
}: GrainGradientProps) {
  const filterId = `grain-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`
  const [base, a, b, c] = colors

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <style>{`
        @keyframes grain-gradient-shift {
          0%, 100% { background-position: 0% 0% }
          50% { background-position: 100% 100% }
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(at 20% 25%, ${a} 0, transparent 45%), radial-gradient(at 80% 20%, ${b} 0, transparent 50%), radial-gradient(at 45% 85%, ${c} 0, transparent 55%), ${base}`,
          backgroundSize: '180% 180%',
          animation: 'grain-gradient-shift 16s ease-in-out infinite',
        }}
      />
      <svg className="absolute inset-0 size-full mix-blend-overlay" style={{ opacity: grain }}>
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  )
}
