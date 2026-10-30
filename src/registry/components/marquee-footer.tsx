import { useState } from 'react'

interface MarqueeFooterProps {
  /** Words that scroll across the top in big type */
  words?: string[]
  email?: string
  socials?: { label: string; href: string }[]
  /** Seconds for one loop of the marquee */
  speed?: number
  accent?: string
  className?: string
}

// A loud "let's talk" footer: a huge scrolling marquee, an email you can copy
// with one click, and social links
export default function MarqueeFooter({
  words = ["Let's talk", 'Say hello', 'Start a project'],
  email = 'hello@example.com',
  socials = [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
  ],
  speed = 18,
  accent = '#c6f432',
  className = '',
}: MarqueeFooterProps) {
  const [copied, setCopied] = useState(false)
  const row = [...words, ...words]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <footer className={`w-full overflow-hidden text-zinc-950 ${className}`} style={{ background: accent }}>
      <style>{`@keyframes marquee-footer-run { to { transform: translateX(-50%) } }`}</style>
      <div className="group flex w-max border-b-2 border-zinc-950 py-4">
        <div
          className="flex shrink-0 items-center group-hover:[animation-play-state:paused]"
          style={{ animation: `marquee-footer-run ${speed}s linear infinite` }}
        >
          {row.map((word, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
              {word}
              <svg viewBox="0 0 24 24" className="size-8 shrink-0 sm:size-12" fill="currentColor" aria-hidden>
                <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6 px-6 py-8 sm:px-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest opacity-60">Drop a line</p>
          <button
            onClick={copy}
            className="group/mail relative mt-1 text-left text-2xl font-semibold tracking-tight sm:text-4xl"
          >
            {email}
            <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-zinc-950 transition-transform duration-300 group-hover/mail:scale-x-100" />
            <span
              className={`absolute -top-7 left-0 rounded-full bg-zinc-950 px-2.5 py-0.5 text-xs font-medium transition-all duration-300 ${
                copied ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
              style={{ color: accent }}
            >
              Copied to clipboard
            </span>
          </button>
        </div>
        <ul className="flex flex-wrap gap-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-zinc-950 px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-zinc-950"
                onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                {social.label}
                <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t-2 border-zinc-950/15 px-6 py-3 font-mono text-[11px] uppercase tracking-widest opacity-60 sm:px-10">
        © {new Date().getFullYear()} · Made with React and Tailwind
      </p>
    </footer>
  )
}
