interface OrbitLoaderProps {
  color?: string
  /** Diameter in px */
  size?: number
  className?: string
}

export default function OrbitLoader({ color = '#c6f432', size = 48, className = '' }: OrbitLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <style>{`@keyframes orbit-loader-spin { to { transform: rotate(360deg) } }`}</style>
      {/* Dots ride the same orbit with an easing, so they bunch up and spread out */}
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="absolute inset-0"
          style={{ animation: `orbit-loader-spin 1.4s cubic-bezier(.5, 0, .5, 1) ${i * 0.08}s infinite` }}
        >
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
            style={{
              width: size / 6 - i,
              height: size / 6 - i,
              background: color,
              opacity: 1 - i * 0.15,
            }}
          />
        </span>
      ))}
    </div>
  )
}
