import { useEffect, useRef, useState } from 'react'

interface FooterLinkGroup {
  title: string
  links: { label: string; href: string }[]
}

interface RevealFooterProps {
  /** The giant name that rises at the bottom */
  brand?: string
  groups?: FooterLinkGroup[]
  /** IANA time zone for the live clock, e.g. "Asia/Kolkata" */
  timeZone?: string
  /** Shown next to the clock */
  location?: string
  accent?: string
  className?: string
}

const defaultGroups: FooterLinkGroup[] = [
  {
    title: 'Pages',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Lab', href: '/lab' },
      { label: 'Open source', href: '/open-source' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'X', href: 'https://x.com' },
    ],
  },
]

// A footer whose huge brand name rises letter by letter when it scrolls into
// view, with a live local clock and a back-to-top button
export default function RevealFooter({
  brand = 'SUSHANT',
  groups = defaultGroups,
  timeZone = 'Asia/Kolkata',
  location = 'India',
  accent = '#c6f432',
  className = '',
}: RevealFooterProps) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setShown(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const format = () =>
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    format()
    const id = setInterval(format, 1000)
    return () => clearInterval(id)
  }, [timeZone])

  // The giant name is sized to the footer's own width, so it fits on one line
  return (
    <footer ref={ref} className={`@container relative w-full overflow-hidden bg-zinc-950 text-zinc-300 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-8 border-t border-white/10 px-6 pt-10 sm:px-10">
        <div className="flex gap-12 sm:gap-16">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{group.title}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="group relative inline-block transition-colors hover:text-white">
                      {link.label}
                      <span
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
                        style={{ background: accent }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end gap-3 text-right">
          <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Local time · {location}</p>
          <p className="font-mono text-2xl tabular-nums text-white">{time}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-colors hover:border-white/40 hover:text-white"
          >
            Back to top
            <svg viewBox="0 0 24 24" className="size-3.5 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>
      <p
        aria-label={brand}
        className="mt-6 flex select-none justify-center overflow-hidden font-black leading-[0.78] tracking-tighter"
        style={{ fontSize: `${Math.round((100 / Math.max(brand.length, 4)) * 1.55)}cqw` }}
      >
        {brand.split('').map((letter, i) => (
          <span
            key={i}
            aria-hidden
            className="inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${accent}, color-mix(in srgb, ${accent} 10%, transparent))`,
              transform: shown ? 'translateY(0)' : 'translateY(100%)',
              transition: `transform 0.9s cubic-bezier(.2,.9,.2,1) ${i * 0.06}s`,
            }}
          >
            {letter === ' ' ? ' ' : letter}
          </span>
        ))}
      </p>
    </footer>
  )
}
