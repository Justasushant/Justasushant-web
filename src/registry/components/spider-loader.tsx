interface SpiderLoaderProps {
  /** Colour of the spider */
  color?: string
  /** Colour of the web */
  webColor?: string
  /** Size in px */
  size?: number
  /** Seconds to spin one web */
  speed?: number
  className?: string
}

const SPOKES = 12
const TURNS = 4

// Points on a circle around the centre of a 100×100 box
const at = (angle: number, r: number) => `${(50 + Math.cos(angle) * r).toFixed(2)} ${(50 + Math.sin(angle) * r).toFixed(2)}`

// The spiral the spider lays: out from the hub, sagging a little between spokes
const SPIRAL = (() => {
  const steps = SPOKES * TURNS
  const angle = (k: number) => (k / SPOKES) * Math.PI * 2 - Math.PI / 2
  const radius = (k: number) => 7 + 34 * (k / steps)
  let d = `M${at(angle(0), radius(0))}`
  for (let k = 1; k <= steps; k++) {
    const mid = (angle(k - 1) + angle(k)) / 2
    d += ` Q${at(mid, ((radius(k - 1) + radius(k)) / 2) * 0.9)} ${at(angle(k), radius(k))}`
  }
  return d
})()

const FRAME = Array.from({ length: SPOKES }, (_, i) => `M50 50 L${at((i / SPOKES) * Math.PI * 2 - Math.PI / 2, 44)}`).join(' ')

// A spider spinning an orb web: first the spokes, then it walks the spiral
// laying silk as it goes. The finished web fades and it starts again.
export default function SpiderLoader({
  color = '#e11d48',
  webColor = '#d4d4d8',
  size = 140,
  speed = 3.6,
  className = '',
}: SpiderLoaderProps) {
  const dur = `${speed}s`
  // One shared timeline: spokes 0–20%, spiral 20–85%, fade 85–100%
  const timing = { dur, repeatCount: 'indefinite', keyTimes: '0;0.2;0.85;1', calcMode: 'linear' as const }

  return (
    <svg role="status" aria-label="Loading" viewBox="0 0 100 100" width={size} height={size} className={className} style={{ overflow: 'visible' }}>
      <style>{`@keyframes spider-loader-legs { 0%, 100% { transform: rotate(-10deg) } 50% { transform: rotate(10deg) } }`}</style>
      <g fill="none" stroke={webColor} strokeLinecap="round">
        <animate attributeName="opacity" values="1;1;1;0" {...timing} />
        <path d={FRAME} strokeWidth="0.8" pathLength={1} strokeDasharray="1 1">
          <animate attributeName="stroke-dashoffset" values="1;0;0;0" {...timing} />
        </path>
        <path d={SPIRAL} strokeWidth="0.7" pathLength={1} strokeDasharray="1 1">
          <animate attributeName="stroke-dashoffset" values="1;1;0;0" {...timing} />
        </path>
      </g>
      {/* The spider rides the spiral, facing the way it walks */}
      <g>
        <animateMotion path={SPIRAL} rotate="auto" keyPoints="0;0;1;1" {...timing} />
        <animate attributeName="opacity" values="1;1;1;0" {...timing} />
        <g transform="scale(0.32)">
          <g
            stroke={color}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'spider-loader-legs 0.22s ease-in-out infinite' }}
          >
            <path d="M3 -2 L10 -11 L17 -15 M1 -2 L5 -12 L7 -18 M-2 -2 L-4 -11 L-8 -16 M-4 -2 L-11 -9 L-17 -12" />
            <path d="M3 2 L10 11 L17 15 M1 2 L5 12 L7 18 M-2 2 L-4 11 L-8 16 M-4 2 L-11 9 L-17 12" />
          </g>
          <ellipse cx="-8" cy="0" rx="8" ry="6" fill={color} />
          <ellipse cx="3" cy="0" rx="5" ry="4" fill={color} />
          <circle cx="6" cy="-1.4" r="1" fill="#fff" />
          <circle cx="6" cy="1.4" r="1" fill="#fff" />
        </g>
      </g>
      <circle cx="50" cy="50" r="1.6" fill={webColor} />
    </svg>
  )
}
