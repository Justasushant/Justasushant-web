import type { CSSProperties } from 'react'

interface MangaHeroProps {
  /** Small label above the title */
  chapter?: string
  title?: string
  subtitle?: string
  /** What the speech bubble says */
  speech?: string
  cta?: string
  /** Sound effect written down the side */
  sfx?: string
  /** Narration box in the close-up panel */
  narration?: string
  brand?: string
  links?: string[]
  ink?: string
  paper?: string
  className?: string
}

// Intense manga eyes: the close-up every manga uses before something big happens
function Eyes({ ink, paper }: { ink: string; paper: string }) {
  const eye = (
    <g>
      <clipPath id="manga-hero-eye">
        <path d="M40 92 Q110 42 182 80 Q118 114 40 92Z" />
      </clipPath>
      <path d="M40 92 Q110 42 182 80 Q118 114 40 92Z" fill={paper} />
      <g clipPath="url(#manga-hero-eye)">
        <circle cx="116" cy="84" r="28" fill={ink} />
        <circle cx="116" cy="84" r="13" fill="#000" />
        <circle cx="105" cy="73" r="7" fill={paper} />
        <circle cx="127" cy="95" r="3" fill={paper} />
      </g>
      <path d="M36 94 Q110 38 186 78" fill="none" stroke={ink} strokeWidth="8" strokeLinecap="round" />
      <path d="M58 100 Q118 114 170 92" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 54 L180 34 L178 44 L36 62Z" fill={ink} />
    </g>
  )
  return (
    <svg viewBox="0 0 440 150" className="w-full" style={{ animation: 'manga-hero-blink 6s infinite', transformOrigin: 'center 60%' }}>
      {eye}
      <g transform="translate(440 0) scale(-1 1)">{eye}</g>
    </svg>
  )
}

// A hero laid out as a manga page: three panels split by slanted gutters.
// A title panel, a close-up of determined eyes, and a narration panel.
export default function MangaHero({
  chapter = 'Chapter 01',
  title = 'Every page tells a story.',
  subtitle = 'A design studio for brands that want to be read, not skimmed.',
  speech = "This is only the first chapter!",
  cta = 'Start reading',
  sfx = 'ゴゴゴ',
  narration = 'He knew it was time.',
  brand = 'Inkpanel',
  links = ['Chapters', 'Studio', 'Contact'],
  ink = '#22211f',
  paper = '#f2efe6',
  className = '',
}: MangaHeroProps) {
  const vars = { '--ink': ink, '--paper': paper } as CSSProperties
  const tone = (size: number) => ({
    backgroundImage: `radial-gradient(${ink} ${size}px, transparent ${size + 0.2}px)`,
    backgroundSize: '7px 7px',
  })

  return (
    <section className={`@container flex w-full flex-col p-3 ${className}`} style={{ ...vars, background: paper, color: ink }}>
      <style>{`
        @keyframes manga-hero-in { from { opacity: 0; transform: translate(var(--dx, 0), var(--dy, 0)) } }
        @keyframes manga-hero-blink { 0%, 46%, 50%, 100% { transform: scaleY(1) } 48% { transform: scaleY(0.08) } }
        .manga-hero-page { display: grid; gap: 12px }
        .manga-hero-fill { position: relative; height: 100% }
        .manga-hero-panel { position: relative; overflow: hidden; border: 3px solid var(--ink); animation: manga-hero-in 0.7s cubic-bezier(.2,1.2,.3,1) both }
        @container (min-width: 720px) {
          .manga-hero-page { display: block; position: relative; flex: 1; min-height: 580px }
          .manga-hero-panel { position: absolute; inset: 0; border: 0; background: var(--ink) }
          .manga-hero-panel > .manga-hero-fill { position: absolute; inset: 0; background: var(--paper) }
          .manga-hero-a { clip-path: polygon(0 0, 60% 0, 52% 100%, 0 100%) }
          .manga-hero-a > .manga-hero-fill { clip-path: polygon(3px 3px, calc(60% - 4px) 3px, calc(52% - 4px) calc(100% - 3px), 3px calc(100% - 3px)) }
          .manga-hero-b { clip-path: polygon(61.6% 0, 100% 0, 100% 52%, 57.4% 52%) }
          .manga-hero-b > .manga-hero-fill { clip-path: polygon(calc(61.6% + 4px) 3px, calc(100% - 3px) 3px, calc(100% - 3px) calc(52% - 3px), calc(57.4% + 4px) calc(52% - 3px)) }
          .manga-hero-c { clip-path: polygon(57.1% 55%, 100% 55%, 100% 100%, 53.6% 100%) }
          .manga-hero-c > .manga-hero-fill { clip-path: polygon(calc(57.1% + 4px) calc(55% + 3px), calc(100% - 3px) calc(55% + 3px), calc(100% - 3px) calc(100% - 3px), calc(53.6% + 4px) calc(100% - 3px)) }
          .manga-hero-a .manga-hero-content { position: absolute; left: 0; top: 0; bottom: 0; width: 50% }
          .manga-hero-b .manga-hero-content { position: absolute; left: 60%; right: 0; top: 0; height: 52% }
          .manga-hero-c .manga-hero-content { position: absolute; left: 57%; right: 0; top: 55%; bottom: 0 }
        }
      `}</style>
      {/* A manga nav strip: brand, links and the page number */}
      <nav className="mb-3 flex h-12 items-stretch border-[3px]" style={{ borderColor: ink, animation: 'manga-hero-in 0.6s ease-out both', '--dy': '-20px' } as CSSProperties}>
        <span className="flex items-center gap-2 border-r-[3px] px-3 text-sm font-black uppercase" style={{ borderColor: ink }}>
          <span className="grid size-7 place-items-center text-sm" style={{ background: ink, color: paper }}>漫</span>
          {brand}
        </span>
        {links.map((link, i) => (
          <a key={link} href="#" className="hidden items-center border-r-[3px] px-4 text-xs font-black uppercase tracking-wider transition-colors sm:flex" style={{ borderColor: ink, ...(i === 0 ? { background: ink, color: paper } : {}) }}>
            {link}
          </a>
        ))}
        <span className="flex-1" />
        <span className="flex items-center border-l-[3px] px-3 font-mono text-[11px] font-bold uppercase tracking-widest" style={{ borderColor: ink }}>
          Vol. 01 · P. 01
        </span>
      </nav>
      <div className="manga-hero-page">
        {/* Panel A: the title, with focus lines rushing in from the right */}
        <div className="manga-hero-panel manga-hero-a" style={{ '--dx': '-40px' } as CSSProperties}>
          <div className="manga-hero-fill">
            <div
              className="absolute inset-0 opacity-[0.13]"
              style={{
                background: `repeating-conic-gradient(from 0deg at 95% 40%, ${ink} 0deg 0.7deg, transparent 0.7deg 4.5deg)`,
                maskImage: 'radial-gradient(circle at 95% 40%, transparent 30%, black 80%)',
                WebkitMaskImage: 'radial-gradient(circle at 95% 40%, transparent 30%, black 80%)',
              }}
            />
            <div className="manga-hero-content relative flex flex-col justify-center p-6 sm:p-10">
              <span aria-hidden className="pointer-events-none absolute bottom-2 right-6 text-[9rem] font-black leading-none text-transparent opacity-30" style={{ WebkitTextStroke: `2px ${ink}` } as CSSProperties}>01</span>
              <p className="w-fit px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em]" style={{ background: ink, color: paper }}>
                {chapter}
              </p>
              <h1 className="mt-5 text-5xl font-black uppercase leading-[0.86] tracking-tighter sm:text-7xl">{title}</h1>
              <p className="mt-6 max-w-sm border-l-4 pl-4 text-base font-medium" style={{ borderColor: ink }}>
                {subtitle}
              </p>
              <button
                className="mt-8 w-fit border-[3px] px-6 py-3 text-sm font-black uppercase tracking-wider transition-[transform,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1"
                style={{ background: ink, color: paper, borderColor: ink, boxShadow: `5px 5px 0 ${ink}55` }}
              >
                {cta} →
              </button>
              <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.25em] opacity-70">Vol. 1 · Weekly · 24 pages</p>
            </div>
          </div>
        </div>
        {/* Panel B: the close-up, with horizontal speed lines behind it */}
        <div className="manga-hero-panel manga-hero-b" style={{ '--dy': '-40px', animationDelay: '0.12s' } as CSSProperties}>
          <div className="manga-hero-fill">
            <div
              className="absolute inset-0"
              style={{ background: `repeating-linear-gradient(to bottom, ${ink} 0 1px, transparent 1px 7px)`, opacity: 0.18 }}
            />
            <div className="manga-hero-content grid min-h-48 place-items-center px-6 py-6">
              <p className="absolute left-[14%] top-4 border-[3px] px-2.5 py-1 text-[11px] font-bold italic" style={{ background: paper, borderColor: ink }}>
                {narration}
              </p>
              <div className="w-full max-w-sm">
                <Eyes ink={ink} paper={paper} />
              </div>
            </div>
          </div>
        </div>
        {/* Panel C: screentone, a speech bubble and a sound effect */}
        <div className="manga-hero-panel manga-hero-c" style={{ '--dx': '40px', animationDelay: '0.24s' } as CSSProperties}>
          <div className="manga-hero-fill" style={tone(1.1)}>
            <div className="manga-hero-content flex min-h-48 items-center justify-center gap-4 p-6">
              <p
                className="relative rounded-[50%] border-[3px] px-7 py-5 text-center text-sm font-black uppercase leading-tight sm:text-base"
                style={{ background: paper, borderColor: ink }}
              >
                {speech}
                <span className="absolute -bottom-[18px] left-8 size-0 border-x-[10px] border-t-[18px] border-x-transparent" style={{ borderTopColor: ink }} />
                <span className="absolute -bottom-[12px] left-[35px] size-0 border-x-[7px] border-t-[13px] border-x-transparent" style={{ borderTopColor: paper }} />
              </p>
              <p
                aria-hidden
                className="text-5xl font-black leading-none [writing-mode:vertical-rl] sm:text-6xl"
                style={{ color: paper, WebkitTextStroke: `2px ${ink}`, paintOrder: 'stroke fill' } as CSSProperties}
              >
                {sfx}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
