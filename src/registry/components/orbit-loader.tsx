interface OrbitLoaderProps {
  color?: string
  /** Size in px */
  size?: number
  className?: string
}

// An atom: three tilted orbits, each with an electron racing around it
const ORBIT = 'M40 0 A40 14 0 1 1 -40 0 A40 14 0 1 1 40 0'

export default function OrbitLoader({ color = '#c6f432', size = 84, className = '' }: OrbitLoaderProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      style={{ overflow: 'visible' }}
    >
      <style>{`@keyframes orbit-loader-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(0.75) } }`}</style>
      {[0, 60, 120].map((angle, i) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <path d={ORBIT} fill="none" stroke={color} strokeOpacity="0.25" strokeWidth="1.5" />
          <circle r="5" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
            <animateMotion dur={`${1.1 + i * 0.25}s`} repeatCount="indefinite" path={ORBIT} />
          </circle>
        </g>
      ))}
      <circle
        r="8"
        fill={color}
        style={{
          filter: `drop-shadow(0 0 8px ${color})`,
          transformBox: 'fill-box',
          transformOrigin: 'center',
          animation: 'orbit-loader-pulse 1.2s ease-in-out infinite',
        }}
      />
    </svg>
  )
}
