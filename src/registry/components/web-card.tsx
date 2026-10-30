import { useState } from 'react'
import type { ReactNode } from 'react'

interface WebCardProps {
  children: ReactNode
  /** Colour of the web silk */
  webColor?: string
  /** Colour of the spider */
  spiderColor?: string
  className?: string
}

// A corner web: spokes fanning out from the top-right corner, linked by sagging threads
const SPOKES = [0, 15, 30, 45, 60, 75, 90].map((deg) => (deg * Math.PI) / 180)
const RINGS = [34, 62, 92, 124, 158]

const webPath = (() => {
  let d = ''
  for (const a of SPOKES) d += `M0 0 L${(-Math.sin(a) * 180).toFixed(1)} ${(Math.cos(a) * 180).toFixed(1)} `
  for (const r of RINGS) {
    SPOKES.forEach((a, i) => {
      const point = (angle: number, radius: number) =>
        `${(-Math.sin(angle) * radius).toFixed(1)} ${(Math.cos(angle) * radius).toFixed(1)}`
      if (i === 0) d += `M${point(a, r)} `
      else d += `Q${point((a + SPOKES[i - 1]) / 2, r * 0.86)} ${point(a, r)} `
    })
  }
  return d
})()

// A card with a cobweb in its corner. Hover it and the web spins itself in
// and a spider drops down on a thread to say hello.
export default function WebCard({
  children,
  webColor = 'rgba(255,255,255,0.55)',
  spiderColor = '#e11d48',
  className = '',
}: WebCardProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={`relative w-80 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-6 transition-colors duration-500 hover:border-white/25 ${className}`}
    >
      <svg
        aria-hidden
        viewBox="-180 0 180 180"
        className="pointer-events-none absolute right-0 top-0 size-44"
      >
        <path
          d={webPath}
          fill="none"
          stroke={webColor}
          strokeWidth="0.9"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: hover ? 0 : 0.82,
            transition: 'stroke-dashoffset 1.4s cubic-bezier(.3,.7,.3,1)',
          }}
        />
      </svg>
      {/* The spider drops on its thread, then bobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-12 top-0 flex flex-col items-center transition-transform duration-700 ease-[cubic-bezier(.3,1.5,.5,1)]"
        style={{ transform: hover ? 'translateY(0)' : 'translateY(-100%)', transitionDelay: hover ? '0.5s' : '0s' }}
      >
        <span className="h-8 w-px" style={{ background: webColor }} />
        <svg viewBox="-20 -14 40 34" className="w-8" style={{ animation: hover ? 'web-card-bob 1.6s ease-in-out infinite' : undefined }}>
          <style>{`@keyframes web-card-bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(4px) } }`}</style>
          <g stroke={spiderColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-3 0 L-12 -8 L-17 2 M-3 3 L-13 -1 L-18 8 M-3 6 L-13 7 L-16 15 M-3 8 L-10 13 L-12 19" />
            <path d="M3 0 L12 -8 L17 2 M3 3 L13 -1 L18 8 M3 6 L13 7 L16 15 M3 8 L10 13 L12 19" />
          </g>
          <ellipse cx="0" cy="8" rx="6" ry="8" fill={spiderColor} />
          <circle cx="0" cy="-3" r="4.5" fill={spiderColor} />
          <ellipse cx="-1.8" cy="-4" rx="1.3" ry="1.8" fill="#fff" />
          <ellipse cx="1.8" cy="-4" rx="1.3" ry="1.8" fill="#fff" />
        </svg>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
