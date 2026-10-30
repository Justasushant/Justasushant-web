interface RingLoaderProps {
  color?: string
  /** Size in px */
  size?: number
  /** Stroke width in px */
  thickness?: number
  className?: string
}

// The arc grows and shrinks while the whole ring turns, like Material's spinner
export default function RingLoader({
  color = '#c6f432',
  size = 52,
  thickness = 4,
  className = '',
}: RingLoaderProps) {
  // Keep the stroke the same width in px whatever the size
  const stroke = (thickness / size) * 50
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 50 50"
      width={size}
      height={size}
      className={className}
      style={{ animation: 'ring-loader-rotate 1.6s linear infinite', filter: `drop-shadow(0 0 6px ${color})` }}
    >
      <style>{`
        @keyframes ring-loader-rotate { to { transform: rotate(360deg) } }
        @keyframes ring-loader-dash {
          0% { stroke-dasharray: 1 200; stroke-dashoffset: 0 }
          50% { stroke-dasharray: 90 200; stroke-dashoffset: -35 }
          100% { stroke-dasharray: 90 200; stroke-dashoffset: -124 }
        }
      `}</style>
      <circle cx="25" cy="25" r="20" fill="none" stroke={color} strokeOpacity="0.12" strokeWidth={stroke} />
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        style={{ animation: 'ring-loader-dash 1.4s ease-in-out infinite' }}
      />
    </svg>
  )
}
