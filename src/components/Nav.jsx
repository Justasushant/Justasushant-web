import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { site } from '../data/site.js'

const sectionLinks = [
  ['Work', '/#work'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
]

// Everything in the mobile menu, in order
const menuLinks = [
  ['Lab', '/lab', 'components'],
  ['Open Source', '/open-source', 'coming soon™'],
  ['Work', '/#work', 'selected projects'],
  ['About', '/#about', 'who is this guy'],
  ['Contact', '/#contact', 'say hello'],
]

const pill = ({ isActive }) =>
  `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
    isActive ? 'bg-ink text-paper' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
  }`

export default function Nav({ solid = false }) {
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever you navigate
  useEffect(() => setOpen(false), [pathname, hash])

  // Don't let the page scroll behind the open menu
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const filled = solid || scrolled || open || pathname !== '/'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          filled ? 'border-b-2 border-ink bg-paper/95 backdrop-blur' : 'border-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 2xl:px-16">
          <Link to="/" className="group flex items-baseline gap-2 whitespace-nowrap">
            <span className="font-display text-[15px] uppercase tracking-tight text-white">{site.name}</span>
            <span className="inline-block size-1.5 rounded-full bg-accent transition-transform group-hover:scale-150" />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            <NavLink to="/lab" className={pill}>
              Lab
            </NavLink>
            <NavLink to="/open-source" className={pill}>
              Open Source
            </NavLink>
            {sectionLinks.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-full px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button: two lines that turn into a cross */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative grid size-10 place-items-center rounded-full border border-white/15 bg-zinc-950/60 backdrop-blur md:hidden"
          >
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-white transition-transform duration-300 ${
                open ? 'rotate-45' : '-translate-y-[3px]'
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-white transition-transform duration-300 ${
                open ? '-rotate-45' : 'translate-y-[3px]'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu. Rendered outside the header: its backdrop blur would trap a fixed child */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-[55] flex flex-col overflow-y-auto bg-zinc-950/95 px-5 pb-8 pt-6 backdrop-blur-xl md:hidden">
          <style>{`@keyframes menu-item-in { from { opacity: 0; transform: translateY(16px) } }`}</style>
          <nav className="flex-1">
            {menuLinks.map(([label, to, note], i) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between gap-4 border-b border-white/10 py-5"
                style={{ animation: `menu-item-in 0.45s cubic-bezier(.2,.8,.2,1) ${i * 60}ms both` }}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-zinc-600">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-4xl uppercase tracking-tight text-white">
                    {label}
                  </span>
                </span>
                <span className="font-mono text-[11px] text-zinc-500">{note}</span>
              </Link>
            ))}
          </nav>
          <div
            className="mt-8 space-y-2 text-sm"
            style={{ animation: `menu-item-in 0.45s cubic-bezier(.2,.8,.2,1) ${menuLinks.length * 60}ms both` }}
          >
            <a href={`mailto:${site.email}`} className="block text-zinc-300">
              {site.email}
            </a>
            <a href={site.whatsapp.link} target="_blank" rel="noreferrer" className="block font-semibold text-white underline">
              WhatsApp {site.whatsapp.display}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
