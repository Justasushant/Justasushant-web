interface InfinityLoaderProps {
  color?: string
  /** Width in px */
  size?: number
  className?: string
}

const PATH = 'M25 25 C25 8 45 8 50 25 C55 42 75 42 75 25 C75 8 55 8 50 25 C45 42 25 42 25 25'

// Layers of the comet, from the faint tail to the bright head: [length, opacity, width]
const LAYERS = [
  [34, 0.15, 5],
  [22, 0.35, 4],
  [12, 0.7, 3.5],
  [4, 1, 3.5],
]
const DURATION = 1.8

export default function InfinityLoader({ color = '#c6f432', size = 140, className = '' }: InfinityLoaderProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="15 0 70 50"
      width={size}
      height={(size / 70) * 50}
      className={className}
      style={{ overflow: 'visible' }}
    >
      <style>{`@keyframes infinity-loader-run { from { stroke-dashoffset: 0 } to { stroke-dashoffset: -100 } }`}</style>
      <path d={PATH} fill="none" stroke={color} strokeOpacity="0.1" strokeWidth="3" />
      {LAYERS.map(([length, opacity, width]) => (
        <path
          key={length}
          d={PATH}
          pathLength={100}
          fill="none"
          stroke={color}
          strokeOpacity={opacity}
          strokeWidth={width}
          strokeLinecap="round"
          strokeDasharray={`${length} ${100 - length}`}
          style={{
            filter: length === 4 ? `drop-shadow(0 0 5px ${color})` : undefined,
            animation: `infinity-loader-run ${DURATION}s linear infinite`,
            // Line every head up with the longest tail's head
            animationDelay: `${(-(LAYERS[0][0] - length) / 100) * DURATION}s`,
          }}
        />
      ))}
    </svg>
  )
}
