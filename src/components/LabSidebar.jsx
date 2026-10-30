import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router'
import { allCategories, categories, comingSoon, components } from '../registry/index.jsx'
import Badge from './Badge.jsx'

const STORAGE_KEY = 'lab-collapsed'

function readCollapsed() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])
  } catch {
    return new Set()
  }
}

export default function LabSidebar({ onNavigate }) {
  const ref = useRef(null)
  const { slug } = useParams()
  const activeCategory = components.find((c) => c.slug === slug)?.category
  const [collapsed, setCollapsed] = useState(readCollapsed)

  const save = (next) => {
    setCollapsed(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
    } catch {}
  }

  const toggle = (category) => {
    const next = new Set(collapsed)
    next.has(category) ? next.delete(category) : next.add(category)
    save(next)
  }

  const allCollapsed = categories.every((c) => collapsed.has(c))

  // Keep the active component visible when the sidebar scrolls
  useEffect(() => {
    ref.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <nav ref={ref} className="space-y-5 text-sm">
      <div className="flex items-center gap-1">
        <NavLink
          to="/lab"
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex flex-1 items-center justify-between rounded-lg px-3 py-1.5 font-medium transition-colors ${
              isActive ? 'bg-white/10 text-white' : 'text-zinc-300 hover:text-white'
            }`
          }
        >
          All components
          <span className="font-mono text-[11px] text-zinc-500">{components.length}</span>
        </NavLink>
        <button
          onClick={() => save(allCollapsed ? new Set() : new Set(categories))}
          title={allCollapsed ? 'Expand all' : 'Collapse all'}
          aria-label={allCollapsed ? 'Expand all categories' : 'Collapse all categories'}
          className="grid size-7 shrink-0 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {allCollapsed ? <path d="m7 15 5 5 5-5M7 9l5-5 5 5" /> : <path d="m7 20 5-5 5 5M7 4l5 5 5-5" />}
          </svg>
        </button>
      </div>

      {allCategories.map((category) => {
        // Empty categories get a single "coming soon" link instead of a list
        if (comingSoon.includes(category)) {
          return (
            <Link
              key={category}
              to={`/lab?category=${category}`}
              onClick={onNavigate}
              className="flex w-full items-center justify-between rounded-md px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-200"
            >
              <span>
                {category} <span className="text-zinc-600">0</span>
              </span>
              <span className="rounded-full bg-amber-400/15 px-1.5 py-px normal-case tracking-normal text-amber-300">
                soon
              </span>
            </Link>
          )
        }
        const items = components.filter((c) => c.category === category)
        // The category you're looking at always stays open
        const open = !collapsed.has(category) || category === activeCategory
        return (
          <div key={category}>
            <button
              onClick={() => toggle(category)}
              aria-expanded={open}
              className="group flex w-full items-center justify-between rounded-md px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-200"
            >
              <span>
                {category} <span className="text-zinc-600">{items.length}</span>
              </span>
              <svg
                viewBox="0 0 24 24"
                className={`size-3.5 transition-transform duration-300 ${open ? 'rotate-0' : '-rotate-90'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
            >
              <ul className="ml-3 mt-1 overflow-hidden border-l border-white/10">
                {items.map((c) => (
                  <li key={c.slug}>
                    <NavLink
                      to={`/lab/${c.slug}`}
                      onClick={onNavigate}
                      tabIndex={open ? 0 : -1}
                      className={({ isActive }) =>
                        `-ml-px flex items-center justify-between gap-2 border-l py-1.5 pl-4 pr-2 transition-colors ${
                          isActive
                            ? 'border-accent text-accent'
                            : 'border-transparent text-zinc-400 hover:border-zinc-500 hover:text-white'
                        }`
                      }
                    >
                      {c.name}
                      <Badge slug={c.slug} className="shrink-0 !px-1.5 !text-[9px] !leading-4" />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </nav>
  )
}
