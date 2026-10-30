import type { CSSProperties } from 'react'

interface MangaLoaderProps {
  /** Width in px */
  size?: number
  /** Text under the page */
  label?: string
  /** Seconds for one full page */
  speed?: number
  ink?: string
  paper?: string
  className?: string
}

// Each panel inks in from a different side: [enter from, exit to] as inset() values
const PANELS = [
  { area: '1 / 1 / 2 / 3', from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 100%)', fill: 'solid' },
  { area: '1 / 3 / 3 / 4', from: 'inset(0 0 100% 0)', to: 'inset(100% 0 0 0)', fill: 'tone' },
  { area: '2 / 1 / 3 / 2', from: 'inset(100% 0 0 0)', to: 'inset(0 0 100% 0)', fill: 'lines' },
  { area: '2 / 2 / 3 / 3', from: 'inset(0 0 0 100%)', to: 'inset(0 100% 0 0)', fill: 'bang' },
] as const

// A loading manga page: the panels ink themselves in one at a time, the last
// one shouts "!", then the page wipes clean and starts again
export default function MangaLoader({
  size = 120,
  label = 'Loading',
  speed = 2.4,
  ink = '#22211f',
  paper = '#f2efe6',
  className = '',
}: MangaLoaderProps) {
  const keyframes = PANELS.map((p, i) => {
    const start = i * 14
    return `@keyframes manga-loader-${i} {
      0%, ${start}% { clip-path: ${p.from} }
      ${start + 12}%, 80% { clip-path: inset(0 0 0 0) }
      92%, 100% { clip-path: ${p.to} }
    }`
  }).join('\n')

  const fills: Record<string, CSSProperties> = {
    solid: { background: ink },
    tone: { backgroundImage: `radial-gradient(${ink} 1.2px, transparent 1.4px)`, backgroundSize: '5px 5px' },
    lines: { background: `repeating-conic-gradient(from 0deg at 50% 50%, ${ink} 0deg 3deg, transparent 3deg 12deg)` },
    bang: { background: ink },
  }

  return (
    <div role="status" aria-label={label} className={`inline-flex flex-col items-center gap-3 ${className}`} style={{ color: ink }}>
      <style>{`
        ${keyframes}
        @keyframes manga-loader-bang { 0%, 50% { transform: scale(0) rotate(-20deg) } 58% { transform: scale(1.3) rotate(8deg) } 64%, 80% { transform: scale(1) rotate(0) } 90%, 100% { transform: scale(0) } }
        @keyframes manga-loader-dot { 0%, 20% { opacity: 0 } 40%, 100% { opacity: 1 } }
      `}</style>
      <div
        className="grid gap-[5px] p-[5px]"
        style={{
          width: size,
          height: size * 0.8,
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          background: paper,
          border: `3px solid ${ink}`,
          boxShadow: `4px 4px 0 ${ink}`,
        }}
      >
        {PANELS.map((p, i) => (
          <div key={i} className="relative overflow-hidden" style={{ gridArea: p.area, border: `2px solid ${ink}`, background: paper }}>
            <div
              className="absolute inset-0 grid place-items-center"
              style={{ ...fills[p.fill], animation: `manga-loader-${i} ${speed}s cubic-bezier(.7,0,.3,1) infinite` }}
            >
              {p.fill === 'bang' && (
                <span
                  className="font-black leading-none"
                  style={{ color: paper, fontSize: size * 0.2, animation: `manga-loader-bang ${speed}s ease-out infinite` }}
                >
                  !
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {label && (
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]">
          {label}
          {[0, 1, 2].map((d) => (
            <span key={d} style={{ animation: `manga-loader-dot ${speed / 2}s ${d * 0.15}s infinite` }}>
              .
            </span>
          ))}
        </p>
      )}
    </div>
  )
}
