interface PulseLoaderProps {
  color?: string
  /** Diameter in px */
  size?: number
  className?: string
}

export default function PulseLoader({ color = '#c6f432', size = 56, className = '' }: PulseLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`relative grid place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <style>{`@keyframes pulse-loader-ring { from { transform: scale(0.2); opacity: 1 } to { transform: scale(1); opacity: 0 } }`}</style>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: color, animation: `pulse-loader-ring 1.8s ease-out ${i * 0.6}s infinite` }}
        />
      ))}
      <span className="size-3 rounded-full" style={{ background: color }} />
    </div>
  )
}
