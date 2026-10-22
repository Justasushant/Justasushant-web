import type { CSSProperties } from 'react'

interface FolderCardProps {
  title: string
  subtitle?: string
  color?: string
  /** Colours of the papers that pop out */
  papers?: string[]
  className?: string
}

export default function FolderCard({
  title,
  subtitle,
  color = '#c6f432',
  papers = ['#ffffff', '#e4e4e7', '#d4d4d8'],
  className = '',
}: FolderCardProps) {
  const back = `color-mix(in srgb, ${color} 72%, black)`

  return (
    <div className={`group flex w-56 cursor-pointer flex-col items-center ${className}`}>
      <div className="relative h-40 w-52 [perspective:900px]">
        {/* Back of the folder with its tab */}
        <div className="absolute inset-x-0 bottom-0 h-36 rounded-2xl rounded-tl-none" style={{ background: back }}>
          <div className="absolute -top-4 left-0 h-5 w-20 rounded-t-xl" style={{ background: back }} />
        </div>
        {/* Papers rise and fan out on hover */}
        {papers.map((paper, i) => {
          const spread = i - (papers.length - 1) / 2
          return (
            <div
              key={i}
              className="absolute bottom-4 left-1/2 h-32 w-40 rounded-lg shadow-md transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] [transform:translateX(-50%)] group-hover:[transform:translateX(calc(-50%_+_var(--tx)))_translateY(var(--ty))_rotate(var(--r))]"
              style={
                {
                  background: paper,
                  '--tx': `${spread * 26}px`,
                  '--ty': `${-34 - i * 6}px`,
                  '--r': `${spread * 8}deg`,
                  transitionDelay: `${i * 40}ms`,
                } as CSSProperties
              }
            >
              <div className="m-3 space-y-1.5">
                <div className="h-1.5 w-2/3 rounded-full bg-zinc-300" />
                <div className="h-1.5 w-1/2 rounded-full bg-zinc-300" />
                <div className="h-1.5 w-3/4 rounded-full bg-zinc-200" />
              </div>
            </div>
          )
        })}
        {/* Front flap tilts open */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 origin-bottom rounded-2xl shadow-[0_-8px_24px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out group-hover:[transform:rotateX(-35deg)]"
          style={{ background: `linear-gradient(to bottom, ${color}, color-mix(in srgb, ${color} 80%, black))` }}
        />
      </div>
      <p className="mt-4 font-semibold text-white">{title}</p>
      {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
    </div>
  )
}
