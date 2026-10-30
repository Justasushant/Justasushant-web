interface PulseLoaderProps {
  color?: string
  /** Width in px */
  size?: number
  className?: string
}

// A heartbeat line tracing across a monitor, fading out behind itself
const BEAT = 'M0 20 H34 L39 20 L43 9 L48 31 L54 3 L60 27 L64 20 H120'

export default function PulseLoader({ color = '#c6f432', size = 120, className = '' }: PulseLoaderProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 120 40"
      width={size}
      height={(size / 120) * 40}
      className={className}
      style={{ overflow: 'visible' }}
    >
      <style>{`
        @keyframes pulse-loader-trace {
          from { stroke-dashoffset: 40 }
          to { stroke-dashoffset: -100 }
        }
      `}</style>
      <path d={BEAT} fill="none" stroke={color} strokeOpacity="0.1" strokeWidth="2" strokeLinejoin="round" />
      {/* A long faint tail and a short bright head on the same line */}
      {[
        [40, 0.35, 2],
        [10, 1, 2.6],
      ].map(([length, opacity, width]) => (
        <path
          key={length}
          d={BEAT}
          pathLength={100}
          fill="none"
          stroke={color}
          strokeOpacity={opacity}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${length} 200`}
          style={{
            filter: `drop-shadow(0 0 4px ${color})`,
            // Offset by the length difference so both heads line up
            animation: 'pulse-loader-trace 1.6s linear infinite',
            animationDelay: `${((length - 40) / 140) * 1.6}s`,
          }}
        />
      ))}
    </svg>
  )
}
