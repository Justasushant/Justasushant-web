import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { site } from '../data/site.js'
import { components } from '../registry/index.jsx'
import { Stage } from './Preview.jsx'
import ConeizLogo from './ConeizLogo.jsx'

// A tiny seeded random generator (mulberry32): same seed, same sequence
function seededRandom(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const shuffle = (list, random) => {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// The wall shows the Lab's best pieces, shuffled into columns that loop forever
const best = [
  'flow-field', 'blur-switch', 'web-shooter', 'dock', 'glitch-text', 'hover-grid', 'split-flap',
  'spotlight-card', 'matrix-rain', 'starfield-warp', 'comic-button', 'fireworks-button', 'tear-reveal',
  'music-card', 'number-ticker', 'glass-card', 'terminal-loop', 'compare-slider', 'flashlight-text',
]
const COLUMNS = 5
const PER_COLUMN = 4

function todaysWall() {
  const now = new Date()
  const random = seededRandom(now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate())
  const picks = shuffle(best.map((slug) => components.find((c) => c.slug === slug)).filter(Boolean), random)
  return Array.from({ length: COLUMNS }, (_, i) =>
    Array.from({ length: PER_COLUMN }, (_, j) => picks[(i * PER_COLUMN + j) % picks.length]),
  )
}

const wallColumns = todaysWall()

// A live demo, shrunk into a little black-and-white panel. Colour comes back on hover.
function WallTile({ item }) {
  return (
    <Link
      to={`/lab/${item.slug}`}
      tabIndex={-1}
      className="group/tile mb-4 block w-56 border-[3px] border-ink bg-paper shadow-[4px_4px_0_var(--color-ink)]"
      style={{ contain: 'paint' }}
    >
      <div className="pointer-events-none relative h-36 overflow-hidden border-b-[3px] border-ink grayscale invert-[0.88] contrast-125 transition-[filter] duration-300 group-hover/tile:invert-0 group-hover/tile:grayscale-0">
        <div className="absolute left-0 top-0 h-[166.67%] w-[166.67%] origin-top-left scale-[0.6]">
          <Stage item={item} preview />
        </div>
      </div>
      <p className="flex items-center justify-between px-2 py-1 font-mono text-[10px] font-bold uppercase text-ink">
        <span className="truncate">{item.name}</span>
        <span>↗</span>
      </p>
    </Link>
  )
}

// True on screens at least `query` wide; follows resizes and rotation
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = () => setMatches(list.matches)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])
  return matches
}

// Columns of live demos scrolling past at a tilt, inside a black panel
function ComponentWall({ columns = wallColumns, perColumn = PER_COLUMN }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ perspective: '1200px' }}>
      <div
        className="absolute left-1/2 top-1/2 flex gap-4"
        style={{ transform: 'translate(-50%, -50%) rotateX(30deg) rotateY(-10deg) rotateZ(14deg) scale(1.2)' }}
      >
        {columns.map((column, i) => (
          <div
            key={i}
            className="hover:[animation-play-state:paused]"
            style={{
              animation: `marquee-up ${46 + i * 8}s linear infinite`,
              animationDirection: i % 2 ? 'reverse' : 'normal',
            }}
          >
            {[...column.slice(0, perColumn), ...column.slice(0, perColumn)].map((item, j) => (
              <WallTile key={j} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <section id="top" className="px-3 pb-12 pt-20 sm:px-6 sm:pt-24 lg:px-10 2xl:px-16">
      <div className="grid gap-3 sm:gap-4 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-12">
        <div className="panel flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 lg:p-14">
          <p className="flex items-center gap-2.5 text-sm font-medium text-zinc-400">
            <ConeizLogo className="size-5" />
            {site.companyRole}, {site.company}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.8rem,13vw,5.5rem)] uppercase leading-[0.92] tracking-tight lg:text-[clamp(3rem,6vw,7.5rem)]">
            Sushant
            <br />
            Sharma
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed">{site.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={() => navigate('/lab')} className="ink-btn text-sm">
              Open the Lab
            </button>
            <button onClick={() => navigate('/#contact')} className="ink-btn ghost text-sm">
              Contact
            </button>
          </div>
        </div>

        {/* Live components, scrolling past in black and white */}
        <div className="panel tone relative h-[340px] overflow-hidden lg:col-span-5 lg:h-auto">
          <ComponentWall
            columns={isDesktop ? wallColumns : wallColumns.slice(0, 4)}
            perColumn={isDesktop ? PER_COLUMN : 3}
          />
        </div>
      </div>
    </section>
  )
}
