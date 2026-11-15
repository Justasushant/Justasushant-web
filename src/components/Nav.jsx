import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { site } from '../data/site.js'

const links = [
  ['Lab', '/lab'],
  ['Open Source', '/open-source'],
]

// Everything in the mobile menu, in order
const menuLinks = [
  ['Lab', '/lab', 'components'],
  ['Open Source', '/open-source', 'coming soon'],
  ['Contact', '/#contact', 'say hello'],
]

const pill = ({ isActive }) =>
  `rounded-lg px-3 py-1.5 text-[15px] transition-colors ${
    isActive ? 'bg-[#1a0e08]/[0.06] text-white' : 'text-white/70 hover:text-white'
  }`

// A floating pill, centred at the top of the page
export default function Nav() {
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever you navigate
  useEffect(() => setOpen(false), [pathname, hash])

  // Don't let the page scroll behind the open menu
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-3">
        <nav className="flex h-[50px] w-full max-w-[720px] items-center justify-between rounded-2xl bg-[#f8f4ee]/80 pl-4 pr-1.5 shadow-[0_0_0_1px_rgba(20,10,5,0.06),0_12px_32px_-18px_rgba(80,30,5,0.35)] backdrop-blur-[14px] backdrop-saturate-[1.4]">
          <Link to="/" className="text-[15px] font-semibold tracking-tight text-white">
            {site.name}
          </Link>
          <div className="ml-auto mr-1 hidden items-center gap-0.5 md:flex">
            {links.map(([label, to]) =>
              to.startsWith('/#') ? (
                <Link key={to} to={to} className="rounded-lg px-3 py-1.5 text-[15px] text-white/70 transition-colors hover:text-white">
                  {label}
                </Link>
              ) : (
                <NavLink key={to} to={to} className={pill}>
                  {label}
                </NavLink>
              ),
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              to="/#contact"
              className="hidden h-9 items-center rounded-[10px] bg-[#1a0e08] px-4 text-[14px] font-medium text-[#fff6ef] sm:inline-flex"
            >
              Contact
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative grid size-9 place-items-center rounded-[10px] md:hidden"
            >
              <span className={`absolute h-0.5 w-4 rounded-full bg-[#1a0e08] transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
              <span className={`absolute h-0.5 w-4 rounded-full bg-[#1a0e08] transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
            </button>
          </div>
        </nav>
      </header>
      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-[#f8f4ee] px-5 pb-8 pt-24 md:hidden">
          <style>{`@keyframes menu-item-in { from { opacity: 0; transform: translateY(16px) } }`}</style>
          <nav className="flex-1">
            {menuLinks.map(([label, to, note], i) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between gap-4 border-b border-[#1a0e08]/10 py-5"
                style={{ animation: `menu-item-in 0.5s cubic-bezier(.2,.8,.2,1) ${i * 60}ms both` }}
              >
                <span className="text-4xl font-semibold tracking-tight text-white">{label}</span>
                <span className="text-sm text-zinc-500">{note}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-8 space-y-2 text-sm">
            <a href={`mailto:${site.email}`} className="block text-zinc-300">
              {site.email}
            </a>
            <a href={site.whatsapp.link} target="_blank" rel="noreferrer" className="block font-medium text-white underline">
              WhatsApp {site.whatsapp.display}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
