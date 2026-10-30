import type { CSSProperties, ReactNode } from 'react'

interface MangaPanelItem {
  /** What goes inside the panel */
  content: ReactNode
  /** Black panel with white ink */
  dark?: boolean
  /** Screentone shading */
  tone?: boolean
  /** Focus lines bursting from the middle */
  lines?: boolean
  /** Narration box in the top-left corner */
  caption?: string
}

interface MangaPanelProps {
  panels: MangaPanelItem[]
  /** Grid layout, one letter per panel in order: ["a a b", "c d d"] */
  areas?: string[]
  /** Gap between panels, in px */
  gutter?: number
  ink?: string
  paper?: string
  className?: string
}

// A manga page: panels with ink borders and white gutters. Hover a panel and
// its contents push in, like the camera moving closer.
export default function MangaPanel({
  panels,
  areas = ['a a b', 'c d d'],
  gutter = 10,
  ink = '#22211f',
  paper = '#f2efe6',
  className = '',
}: MangaPanelProps) {
  const letters = 'abcdefghij'
  return (
    <div
      className={`grid ${className}`}
      style={{
        gap: gutter,
        padding: gutter,
        background: paper,
        border: `3px solid ${ink}`,
        gridTemplateAreas: areas.map((row) => `"${row}"`).join(' '),
        gridAutoRows: '1fr',
        gridAutoColumns: '1fr',
      }}
    >
      {panels.map((panel, i) => {
        const fg = panel.dark ? paper : ink
        const bg = panel.dark ? ink : paper
        return (
          <div
            key={i}
            className="group relative min-h-0 overflow-hidden"
            style={{ gridArea: letters[i], border: `3px solid ${ink}`, background: bg, color: fg }}
          >
            {panel.tone && (
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(${fg} 1px, transparent 1.2px)`,
                  backgroundSize: '6px 6px',
                  opacity: 0.45,
                  maskImage: 'linear-gradient(160deg, black, transparent 75%)',
                  WebkitMaskImage: 'linear-gradient(160deg, black, transparent 75%)',
                }}
              />
            )}
            {panel.lines && (
              <div
                aria-hidden
                className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                style={{
                  background: `repeating-conic-gradient(${fg} 0deg 0.8deg, transparent 0.8deg 6deg)`,
                  maskImage: 'radial-gradient(circle, transparent 30%, black 75%)',
                  WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 75%)',
                } as CSSProperties}
              />
            )}
            <div className="relative grid size-full place-items-center p-3 transition-transform duration-500 ease-out group-hover:scale-110">
              {panel.content}
            </div>
            {panel.caption && (
              <span
                className="absolute left-0 top-0 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest"
                style={{ background: paper, color: ink, borderRight: `3px solid ${ink}`, borderBottom: `3px solid ${ink}` }}
              >
                {panel.caption}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
