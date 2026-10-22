import { useState } from 'react'

interface Panel {
  title: string
  subtitle?: string
  /** Any CSS background: colour, gradient or url() */
  background: string
}

interface ExpandPanelsProps {
  panels: Panel[]
  /** How much wider the open panel gets than the others */
  grow?: number
  className?: string
}

export default function ExpandPanels({ panels, grow = 5, className = '' }: ExpandPanelsProps) {
  const [active, setActive] = useState(0)

  return (
    <div className={`flex h-72 w-full max-w-2xl gap-2 ${className}`}>
      {panels.map((panel, i) => {
        const isActive = active === i
        return (
          <button
            key={i}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="relative min-w-12 overflow-hidden rounded-2xl text-left transition-[flex-grow] duration-500 ease-[cubic-bezier(.65,0,.35,1)]"
            style={{ flexGrow: isActive ? grow : 1, flexBasis: 0, background: panel.background }}
          >
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span
              className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
                isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <span className="block whitespace-nowrap text-lg font-semibold text-white">
                {panel.title}
              </span>
              {panel.subtitle && (
                <span className="block whitespace-nowrap text-sm text-white/70">{panel.subtitle}</span>
              )}
            </span>
            <span
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-white/80 transition-opacity duration-300 ${
                isActive ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </button>
        )
      })}
    </div>
  )
}
