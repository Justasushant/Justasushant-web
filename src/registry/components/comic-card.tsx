import type { ReactNode } from 'react'

interface ComicCardProps {
  /** Big caption at the top of the panel */
  title?: string
  /** What the speech bubble says */
  speech?: string
  /** Small caption box in the corner */
  caption?: string
  /** Panel background colour */
  color?: string
  /** Anything in the middle of the panel, like a hero illustration */
  children?: ReactNode
  className?: string
}

// A comic-book panel: halftone background, caption box and a speech bubble.
// Hover it and speed lines burst out as the panel punches toward you.
export default function ComicCard({
  title = 'Meanwhile...',
  speech = 'This card has superpowers!',
  caption = 'Issue #1',
  color = '#38bdf8',
  children,
  className = '',
}: ComicCardProps) {
  return (
    <div
      className={`group relative aspect-[4/3] w-[22rem] -rotate-1 overflow-hidden border-[4px] border-zinc-950 shadow-[8px_8px_0_#09090b] transition-transform duration-300 ease-[cubic-bezier(.3,1.6,.5,1)] hover:rotate-0 hover:scale-105 ${className}`}
      style={{
        backgroundColor: color,
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.22) 2px, transparent 2.2px)',
        backgroundSize: '9px 9px',
      }}
    >
      {/* Speed lines that burst out from the middle on hover */}
      <div
        aria-hidden
        className="absolute inset-[-50%] scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
        style={{
          background:
            'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.75) 0deg 2deg, transparent 2deg 9deg, rgba(255,255,255,0.4) 9deg 10deg, transparent 10deg 17deg)',
          maskImage: 'radial-gradient(circle, transparent 18%, black 45%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 18%, black 45%)',
        }}
      />
      <p className="absolute left-3 top-3 border-[3px] border-zinc-950 bg-[#fef08a] px-2 py-1 text-xs font-black uppercase italic text-zinc-950">
        {title}
      </p>
      <div className="absolute inset-y-0 left-0 grid w-1/2 place-items-center pt-6">{children}</div>
      <div className="absolute right-4 top-[30%] max-w-[46%] translate-y-2 rounded-[50%] border-[3px] border-zinc-950 bg-white px-5 py-3 text-center text-sm font-black uppercase leading-tight text-zinc-950 transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-105">
        {speech}
        {/* The bubble's tail */}
        <span className="absolute -bottom-[14px] left-6 size-0 border-x-[8px] border-t-[14px] border-x-transparent border-t-zinc-950" />
        <span className="absolute -bottom-[9px] left-[27px] size-0 border-x-[5px] border-t-[9px] border-x-transparent border-t-white" />
      </div>
      <p className="absolute bottom-3 left-3 bg-zinc-950 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
        {caption}
      </p>
    </div>
  )
}
