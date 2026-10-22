interface BarsLoaderProps {
  color?: string
  bars?: number
  className?: string
}

export default function BarsLoader({ color = '#c6f432', bars = 5, className = '' }: BarsLoaderProps) {
  return (
    <div role="status" aria-label="Loading" className={`flex h-10 items-center gap-1 ${className}`}>
      <style>{`@keyframes bars-loader-pulse { 0%, 100% { transform: scaleY(0.3) } 50% { transform: scaleY(1) } }`}</style>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="h-full w-1.5 rounded-full"
          style={{ background: color, animation: `bars-loader-pulse 1s ease-in-out ${i * 0.1}s infinite` }}
        />
      ))}
    </div>
  )
}
