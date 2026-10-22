interface RingLoaderProps {
  color?: string
  /** Diameter in px */
  size?: number
  /** Ring thickness in px */
  thickness?: number
  className?: string
}

export default function RingLoader({
  color = '#c6f432',
  size = 44,
  thickness = 4,
  className = '',
}: RingLoaderProps) {
  // A conic gradient that fades into its own tail, cut into a ring with a mask
  const mask = `radial-gradient(farthest-side, transparent calc(100% - ${thickness}px), black calc(100% - ${thickness - 1}px))`

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(from 0deg, transparent, ${color})`,
        mask,
        WebkitMask: mask,
        animation: 'ring-loader-spin 0.9s linear infinite',
      }}
    >
      <style>{`@keyframes ring-loader-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
