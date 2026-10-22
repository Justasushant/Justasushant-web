interface MorphLoaderProps {
  colors?: [string, string]
  /** Size in px */
  size?: number
  className?: string
}

export default function MorphLoader({
  colors = ['#c6f432', '#22d3ee'],
  size = 56,
  className = '',
}: MorphLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={className}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        animation: 'morph-loader-blob 2.4s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes morph-loader-blob {
          0%, 100% { border-radius: 50%; transform: rotate(0deg) scale(1) }
          25% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; transform: rotate(90deg) scale(0.85) }
          50% { border-radius: 12%; transform: rotate(180deg) scale(0.7) }
          75% { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; transform: rotate(270deg) scale(0.9) }
        }
      `}</style>
    </div>
  )
}
