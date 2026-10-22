interface AuroraProps {
  colors?: string[]
  /** Seconds for one full drift */
  speed?: number
  /** Fade the aurora out towards the bottom-left corner */
  masked?: boolean
  className?: string
}

export default function Aurora({
  colors = ['#3b82f6', '#a5b4fc', '#22d3ee', '#c4b5fd', '#c6f432'],
  speed = 60,
  masked = true,
  className = '',
}: AuroraProps) {
  // Dark stripes over colourful stripes. A blurred copy on top, blended with
  // "difference" and sliding sideways, makes the bands ripple like real aurora.
  const stripes =
    'repeating-linear-gradient(100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%)'
  const bands = `repeating-linear-gradient(100deg, ${colors
    .map((color, i) => `${color} ${10 + i * 5}%`)
    .join(', ')})`
  const mask = 'radial-gradient(ellipse at 100% 0%, black 15%, transparent 75%)'

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <style>{`@keyframes aurora-flow { from { background-position: 50% 50%, 50% 50% } to { background-position: 350% 50%, 350% 50% } }`}</style>
      <div
        className="absolute -inset-[10px] opacity-60 will-change-transform"
        style={{
          backgroundImage: `${stripes}, ${bands}`,
          backgroundSize: '300%, 200%',
          backgroundPosition: '50% 50%, 50% 50%',
          filter: 'blur(10px)',
          maskImage: masked ? mask : undefined,
          WebkitMaskImage: masked ? mask : undefined,
        }}
      >
        <div
          className="absolute inset-0 mix-blend-difference"
          style={{
            backgroundImage: `${stripes}, ${bands}`,
            backgroundSize: '200%, 100%',
            animation: `aurora-flow ${speed}s linear infinite`,
          }}
        />
      </div>
    </div>
  )
}
