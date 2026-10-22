interface InfinityLoaderProps {
  color?: string
  /** Width in px */
  size?: number
  className?: string
}

const PATH = 'M25 25 C 25 10, 5 10, 5 25 S 25 40, 25 25 S 45 10, 45 25 S 25 40, 25 25'

export default function InfinityLoader({
  color = '#c6f432',
  size = 80,
  className = '',
}: InfinityLoaderProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 50 50"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <style>{`@keyframes infinity-loader-dash { to { stroke-dashoffset: -100 } }`}</style>
      <path d={PATH} stroke={color} strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />
      {/* A short dash travelling around the figure eight */}
      <path
        d={PATH}
        pathLength={100}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="28 72"
        style={{ animation: 'infinity-loader-dash 1.6s linear infinite' }}
      />
    </svg>
  )
}
