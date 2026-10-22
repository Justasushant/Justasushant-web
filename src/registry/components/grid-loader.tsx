interface GridLoaderProps {
  color?: string
  /** Square size in px */
  size?: number
  className?: string
}

export default function GridLoader({ color = '#c6f432', size = 12, className = '' }: GridLoaderProps) {
  return (
    <div role="status" aria-label="Loading" className={`grid grid-cols-3 gap-1 ${className}`}>
      <style>{`@keyframes grid-loader-wave { 0%, 70%, 100% { transform: scale(1); opacity: 1 } 35% { transform: scale(0.2); opacity: 0.3 } }`}</style>
      {/* Squares shrink in a diagonal wave from the top-left corner */}
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className="rounded-[3px]"
          style={{
            width: size,
            height: size,
            background: color,
            animation: `grid-loader-wave 1.3s ease-in-out ${((i % 3) + Math.floor(i / 3)) * 0.1}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
