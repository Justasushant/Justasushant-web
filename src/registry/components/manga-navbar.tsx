import { useState } from 'react'
import type { CSSProperties } from 'react'

interface MangaNavbarProps {
  brand?: string
  /** The mark in the brand box */
  mark?: string
  links?: string[]
  /** Which link starts selected */
  active?: number
  cta?: string
  ink?: string
  paper?: string
  onSelect?: (index: number) => void
  className?: string
}

// A navbar ruled like a strip of manga panels. Hovered links get screentone,
// the current one is inked in, and on small screens the menu drops down as a
// stack of panels.
export default function MangaNavbar({
  brand = 'Inkpanel',
  mark = '漫',
  links = ['Chapters', 'Characters', 'Studio', 'Contact'],
  active = 0,
  cta = 'Read now',
  ink = '#22211f',
  paper = '#f2efe6',
  onSelect,
  className = '',
}: MangaNavbarProps) {
  const [current, setCurrent] = useState(active)
  const [open, setOpen] = useState(false)
  const rule = `3px solid ${ink}`
  const tone = { backgroundImage: `radial-gradient(${ink} 1px, transparent 1.2px)`, backgroundSize: '5px 5px' }

  const select = (i: number) => {
    setCurrent(i)
    setOpen(false)
    onSelect?.(i)
  }

  return (
    <header className={`@container relative z-20 w-full ${className}`} style={{ background: paper, color: ink, borderBottom: rule }}>
      <style>{`@keyframes manga-navbar-pop { 0% { transform: scale(0.6); opacity: 0 } 60% { transform: scale(1.15) } 100% { transform: scale(1); opacity: 1 } }`}</style>
      <nav className="flex h-16 items-stretch">
        <a href="#" className="flex shrink-0 items-center gap-2.5 px-4 sm:px-5" style={{ borderRight: rule }}>
          <span className="grid size-9 place-items-center text-lg font-black" style={{ background: ink, color: paper }}>
            {mark}
          </span>
          <span className="text-lg font-black uppercase tracking-tight">{brand}</span>
        </a>
        <div className="hidden items-stretch @2xl:flex">
          {links.map((link, i) => {
            const on = i === current
            return (
              <button
                key={link}
                onClick={() => select(i)}
                className="group relative flex items-center px-5 text-sm font-black uppercase tracking-wider"
                style={{ borderRight: rule, background: on ? ink : 'transparent', color: on ? paper : ink }}
              >
                {!on && <span aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-30" style={tone} />}
                <span className="relative">{link}</span>
                {/* A little speech-bubble tail under the current page */}
                {on && (
                  <span
                    key={current}
                    aria-hidden
                    className="absolute -bottom-[11px] left-1/2 size-0 -translate-x-1/2 border-x-[8px] border-t-[9px] border-x-transparent"
                    style={{ borderTopColor: ink, animation: 'manga-navbar-pop 0.3s ease-out' } as CSSProperties}
                  />
                )}
              </button>
            )
          })}
        </div>
        <span className="flex-1" />
        <span className="hidden items-center px-4 font-mono text-[11px] font-bold uppercase tracking-widest @lg:flex" style={{ borderLeft: rule }}>
          P. {String(current + 1).padStart(2, '0')}
        </span>
        <div className="flex items-center px-3 sm:px-4" style={{ borderLeft: rule }}>
          <button
            className="px-4 py-2 text-xs font-black uppercase tracking-wider transition-[transform,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
            style={{ background: ink, color: paper, border: rule, boxShadow: `3px 3px 0 ${ink}55` }}
          >
            {cta}
          </button>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="grid w-14 place-items-center @2xl:hidden"
          style={{ borderLeft: rule, background: open ? ink : 'transparent' }}
        >
          <span className="flex flex-col gap-1">
            {[0, 1, 2].map((k) => (
              <span key={k} className="block h-[3px] w-5" style={{ background: open ? paper : ink }} />
            ))}
          </span>
        </button>
      </nav>
      {/* Small screens: the menu drops down as a column of panels */}
      {open && (
        <div className="absolute inset-x-0 top-full grid gap-2 p-2 @2xl:hidden" style={{ background: paper, borderBottom: rule }}>
          {links.map((link, i) => (
            <button
              key={link}
              onClick={() => select(i)}
              className="flex items-center justify-between px-4 py-3 text-left text-base font-black uppercase"
              style={{
                border: rule,
                background: i === current ? ink : paper,
                color: i === current ? paper : ink,
                animation: `manga-navbar-pop 0.25s ease-out ${i * 40}ms both`,
              }}
            >
              {link}
              <span className="font-mono text-[11px]">P. {String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
