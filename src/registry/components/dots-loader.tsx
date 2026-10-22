interface DotsLoaderProps {
  color?: string
  /** Dot size in px */
  size?: number
  className?: string
}

export default function DotsLoader({ color = '#c6f432', size = 12, className = '' }: DotsLoaderProps) {
  return (
    <div role="status" aria-label="Loading" className={`flex items-center gap-1.5 ${className}`}>
      <style>{`@keyframes dots-loader-bounce { 0%, 80%, 100% { transform: translateY(0) scale(0.6); opacity: 0.4 } 40% { transform: translateY(-60%) scale(1); opacity: 1 } }`}</style>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            background: color,
            animation: `dots-loader-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
