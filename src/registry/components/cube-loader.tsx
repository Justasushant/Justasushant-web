import type { CSSProperties } from 'react'

interface CubeLoaderProps {
  color?: string
  /** Edge length in px */
  size?: number
  className?: string
}

// A shaded cube that hops and spins a quarter turn each time, with a shadow
// on the floor that shrinks while it's in the air
export default function CubeLoader({ color = '#c6f432', size = 44, className = '' }: CubeLoaderProps) {
  const half = size / 2
  // Each face is the base colour mixed with some black, so it looks lit from above
  const faces: [string, number][] = [
    [`rotateX(90deg) translateZ(${half}px)`, 0],
    [`translateZ(${half}px)`, 18],
    [`rotateY(90deg) translateZ(${half}px)`, 38],
    [`rotateY(180deg) translateZ(${half}px)`, 18],
    [`rotateY(-90deg) translateZ(${half}px)`, 38],
    [`rotateX(-90deg) translateZ(${half}px)`, 60],
  ]

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`flex flex-col items-center ${className}`}
      style={{ perspective: size * 8, paddingTop: size * 0.6 }}
    >
      <style>{`
        @keyframes cube-loader-hop {
          0% { transform: translateY(0) rotateX(-28deg) rotateY(45deg) }
          40% { transform: translateY(-70%) rotateX(-28deg) rotateY(90deg) }
          70%, 100% { transform: translateY(0) rotateX(-28deg) rotateY(135deg) }
        }
        @keyframes cube-loader-shadow {
          0%, 70%, 100% { transform: scale(1); opacity: 0.5 }
          40% { transform: scale(0.55); opacity: 0.2 }
        }
      `}</style>
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          animation: 'cube-loader-hop 0.9s cubic-bezier(.4,0,.3,1) infinite',
        }}
      >
        {faces.map(([transform, shade], i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-[3px]"
            style={
              {
                transform,
                background: `color-mix(in srgb, ${color}, black ${shade}%)`,
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.25)',
                backfaceVisibility: 'hidden',
              } as CSSProperties
            }
          />
        ))}
      </div>
      <span
        className="rounded-[50%] blur-[3px]"
        style={{
          marginTop: size * 0.45,
          width: size * 1.3,
          height: size * 0.22,
          background: color,
          animation: 'cube-loader-shadow 0.9s cubic-bezier(.4,0,.3,1) infinite',
        }}
      />
    </div>
  )
}
