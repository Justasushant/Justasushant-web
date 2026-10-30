interface DotsLoaderProps {
  color?: string
  /** Dot size in px */
  size?: number
  className?: string
}

// Three balls bouncing in turn. They squash when they land and stretch as they
// leave the floor, and their shadows shrink as they rise.
export default function DotsLoader({ color = '#c6f432', size = 14, className = '' }: DotsLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`flex items-end ${className}`}
      style={{ gap: size * 0.7, height: size * 4 }}
    >
      <style>{`
        @keyframes dots-loader-bounce {
          0%, 100% { transform: translateY(0) scale(1.35, 0.65) }
          12% { transform: translateY(-15%) scale(0.85, 1.15) }
          50% { transform: translateY(-260%) scale(1, 1) }
          88% { transform: translateY(-15%) scale(0.85, 1.15) }
        }
        @keyframes dots-loader-shadow {
          0%, 100% { transform: scaleX(1.3); opacity: 0.45 }
          50% { transform: scaleX(0.5); opacity: 0.12 }
        }
      `}</style>
      {[0, 1, 2].map((i) => (
        <span key={i} className="relative flex flex-col items-center">
          <span
            className="rounded-full"
            style={{
              width: size,
              height: size,
              background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${color}, white 45%), ${color} 55%)`,
              boxShadow: `0 0 ${size}px -${size / 4}px ${color}`,
              transformOrigin: '50% 100%',
              animation: `dots-loader-bounce 0.9s cubic-bezier(.45,0,.55,1) ${i * 0.15}s infinite`,
            }}
          />
          <span
            className="mt-1 rounded-[50%]"
            style={{
              width: size,
              height: size * 0.25,
              background: color,
              filter: 'blur(1.5px)',
              animation: `dots-loader-shadow 0.9s cubic-bezier(.45,0,.55,1) ${i * 0.15}s infinite`,
            }}
          />
        </span>
      ))}
    </div>
  )
}
