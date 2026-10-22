interface RetroGridProps {
  lineColor?: string
  skyColor?: string
  /** Show the striped synthwave sun */
  showSun?: boolean
  /** Seconds per grid cell */
  speed?: number
  className?: string
}

export default function RetroGrid({
  lineColor = '#e879f9',
  skyColor = '#12031f',
  showSun = true,
  speed = 0.6,
  className = '',
}: RetroGridProps) {
  // The sun gets wider gaps towards the bottom, like an 80s poster
  const sunMask =
    'linear-gradient(to bottom, black 52%, transparent 52% 56%, black 56% 64%, transparent 64% 69%, black 69% 76%, transparent 76% 82%, black 82% 88%, transparent 88% 95%, black 95%)'

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ background: `linear-gradient(to bottom, ${skyColor}, #2a0845 50%, ${skyColor} 50%)` }}
    >
      <style>{`@keyframes retro-grid-roll { to { background-position: 0 48px } }`}</style>

      {showSun && (
        <div
          className="absolute bottom-1/2 left-1/2 aspect-square w-[36%] max-w-[320px] -translate-x-1/2 translate-y-[30%] rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #fde047, #fb7185 55%, #c026d3)',
            boxShadow: '0 0 90px 10px rgba(244, 114, 182, 0.45)',
            maskImage: sunMask,
            WebkitMaskImage: sunMask,
          }}
        />
      )}

      {/* The floor: a grid plane tilted away from you, rolling forward */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden" style={{ perspective: '280px', background: skyColor }}>
        <div
          className="absolute left-1/2 top-0 h-[220%] w-[400%] origin-top"
          style={{
            transform: 'translateX(-50%) rotateX(72deg)',
            backgroundImage: `linear-gradient(to right, ${lineColor} 2px, transparent 2px), linear-gradient(to bottom, ${lineColor} 2px, transparent 2px)`,
            backgroundSize: '48px 48px',
            animation: `retro-grid-roll ${speed}s linear infinite`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${skyColor} 0%, transparent 45%)` }}
        />
      </div>

      <div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: lineColor, boxShadow: `0 0 24px 4px ${lineColor}` }}
      />
    </div>
  )
}
