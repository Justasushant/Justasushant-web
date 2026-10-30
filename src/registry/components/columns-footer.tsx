import { useRef, useState } from 'react'
import type { FormEvent, PointerEvent } from 'react'

interface FooterColumn {
  title: string
  links: string[]
}

interface ColumnsFooterProps {
  brand?: string
  tagline?: string
  columns?: FooterColumn[]
  /** Colour of the glow that follows the cursor */
  glowColor?: string
  /** Text next to the green status dot */
  status?: string
  className?: string
}

const defaultColumns: FooterColumn[] = [
  { title: 'Product', links: ['Components', 'Templates', 'Pricing', 'Changelog'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
  { title: 'Resources', links: ['Docs', 'Guides', 'Support', 'Status'] },
]

// A classic link-column footer, upgraded: a glow follows the cursor across a
// faint grid, the top border shines, and the newsletter form answers back
export default function ColumnsFooter({
  brand = 'Acme Lab',
  tagline = 'Interfaces that feel alive. Free to copy, built with React and Tailwind.',
  columns = defaultColumns,
  glowColor = '#c6f432',
  status = 'All systems normal',
  className = '',
}: ColumnsFooterProps) {
  const ref = useRef<HTMLElement>(null)
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    ref.current?.style.setProperty('--gx', `${e.clientX - r.left}px`)
    ref.current?.style.setProperty('--gy', `${e.clientY - r.top}px`)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) setJoined(true)
  }

  return (
    <footer
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group relative w-full overflow-hidden bg-zinc-950 text-zinc-400 ${className}`}
    >
      {/* A shining top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }}
      />
      {/* Grid lines and a glow that only show near the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(circle 220px at var(--gx, 50%) var(--gy, 50%), black, transparent)',
          WebkitMaskImage: 'radial-gradient(circle 220px at var(--gx, 50%) var(--gy, 50%), black, transparent)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 260px at var(--gx, 50%) var(--gy, 50%), color-mix(in srgb, ${glowColor} 12%, transparent), transparent)`,
        }}
      />
      <div className="relative grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <p className="flex items-center gap-2 text-lg font-semibold text-white">
            <span className="size-3 rounded-sm" style={{ background: glowColor }} />
            {brand}
          </p>
          <p className="mt-3 text-sm leading-relaxed">{tagline}</p>
          <form onSubmit={submit} className="mt-5 flex rounded-full border border-white/10 bg-white/5 p-1 focus-within:border-white/25">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
              disabled={joined}
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-600"
            />
            <button
              className="rounded-full px-4 py-1.5 text-xs font-semibold text-zinc-950 transition-transform active:scale-95"
              style={{ background: glowColor }}
            >
              {joined ? 'Joined ✓' : 'Subscribe'}
            </button>
          </form>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-medium text-white">{column.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="inline-flex items-center gap-1 transition-colors hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4 text-xs sm:px-10">
        <p>
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </p>
        <p className="inline-flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative size-2 rounded-full bg-emerald-400" />
          </span>
          {status}
        </p>
      </div>
    </footer>
  )
}
