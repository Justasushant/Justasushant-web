interface CubeLoaderProps {
  color?: string
  /** Edge length in px */
  size?: number
  className?: string
}

export default function CubeLoader({ color = '#c6f432', size = 40, className = '' }: CubeLoaderProps) {
  const half = size / 2
  const faces = [
    `translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ]

  return (
    <div
      role="status"
      aria-label="Loading"
      className={className}
      style={{ width: size, height: size, perspective: size * 6 }}
    >
      <style>{`@keyframes cube-loader-tumble { from { transform: rotateX(-25deg) rotateY(0deg) } to { transform: rotateX(-25deg) rotateY(360deg) } }`}</style>
      <div
        className="relative size-full"
        style={{
          transformStyle: 'preserve-3d',
          animation: 'cube-loader-tumble 2.4s cubic-bezier(.6, 0, .4, 1) infinite',
        }}
      >
        {faces.map((transform, i) => (
          <span
            key={i}
            className="absolute inset-0 border-2"
            style={{
              transform,
              borderColor: color,
              background: `color-mix(in srgb, ${color} 15%, transparent)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
