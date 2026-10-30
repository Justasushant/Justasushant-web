import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { site } from '../data/site.js'
import { categories, components } from '../registry/index.jsx'
import { Stage } from './Preview.jsx'
import ConeizLogo from './ConeizLogo.jsx'
import ScrambleText from '../registry/components/scramble-text.tsx'
import WordRotate from '../registry/components/word-rotate.tsx'
import MarqueeText from '../registry/components/marquee-text.tsx'

// The marquee lists the Lab's real categories
const categoryNames = { Elements: 'UI elements', Text: 'Text effects', Transitions: 'Page transitions' }
const marqueeItems = categories.map((c) => categoryNames[c] ?? c)

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
  'music-card', 'number-ticker', 'glass-card', 'comic-card', 'terminal-loop', 'compare-slider', 'flashlight-text',
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

// The ASCII sign in the small panel
const ascii = String.raw`  _      _   ___
 | |    /_\ | _ )
 | |__ / _ \| _ \
 |____/_/ \_\___/`

export default function Hero() {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <section id="top" className="relative px-3 pb-24 pt-20 sm:px-6 sm:pt-24 lg:px-10 2xl:px-16">
      {/* A manga page: panels separated by white gutters */}
      <div className="grid gap-3 sm:gap-4 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-12 lg:grid-rows-[1fr_auto]">
        {/* Panel 1: the name, with focus lines bursting behind it */}
        <div className="panel relative isolate overflow-hidden p-5 sm:p-8 lg:col-span-7 lg:row-span-1 lg:p-10">
          <div aria-hidden className="speed-lines absolute inset-0 -z-10 opacity-[0.13]" style={{ '--sx': '85%', '--sy': '30%' }} />
          <div aria-hidden className="tone-fade absolute inset-x-0 top-0 -z-10 h-24 opacity-30" />
          <p className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.15em]">
            <ConeizLogo className="size-4" />
            {site.companyRole}, {site.company}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,14vw,6rem)] uppercase leading-[0.86] tracking-tight sm:mt-8 lg:text-[clamp(3rem,6.6vw,8.5rem)]">
            <ScrambleText text="Sushant" duration={1100} className="block" />
            <span className="block text-transparent [-webkit-text-stroke:2px_#22211f] transition-colors duration-300 hover:text-ink">
              Sharma.
            </span>
          </h1>
          {/* Speech bubble */}
          <div className="relative mt-8 inline-block max-w-full rounded-[2rem] border-[3px] border-ink bg-paper px-5 py-4 sm:mt-10 sm:px-7">
            <p className="text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              I build{' '}
              <span className="inline-block min-w-[8ch] border-b-4 border-ink">
                <WordRotate
                  words={['websites', 'buttons', 'backgrounds', 'loaders', 'transitions', 'text effects']}
                  className="font-display uppercase"
                />
              </span>{' '}
              in React.
            </p>
            <span aria-hidden className="absolute -top-[18px] left-10 size-0 border-x-[12px] border-b-[18px] border-x-transparent border-b-ink" />
            <span aria-hidden className="absolute -top-[12px] left-[43px] size-0 border-x-[9px] border-b-[13px] border-x-transparent border-b-paper" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <button onClick={() => navigate('/lab')} className="ink-btn text-sm">
              Explore the Lab →
            </button>
            <button onClick={() => navigate('/#contact')} className="ink-btn ghost text-sm">
              Get in touch
            </button>
          </div>
        </div>

        {/* Panel 2: a black panel full of live components */}
        <div className="panel tone relative h-[360px] overflow-hidden lg:col-span-5 lg:row-span-2 lg:h-auto">
          <ComponentWall
            columns={isDesktop ? wallColumns : wallColumns.slice(0, 4)}
            perColumn={isDesktop ? PER_COLUMN : 3}
          />
          <p className="absolute left-3 top-3 z-10 border-[3px] border-ink bg-ink px-2 py-1 text-paper font-mono text-[11px] font-bold uppercase tracking-widest">
            Today in the Lab
          </p>
        </div>

        {/* Panel 3: ASCII sign and the numbers */}
        <div className="panel relative overflow-hidden p-5 lg:col-span-3">
          <pre aria-hidden className="font-mono text-[10px] font-bold leading-tight sm:text-xs">{ascii}</pre>
          <ul className="mt-4 space-y-1 font-mono text-xs">
            <li>&gt; {components.length} components</li>
            <li>&gt; TSX + JSX, copy &amp; paste</li>
            <li>&gt; 0 extra libraries</li>
          </ul>
        </div>

        {/* Panel 4: the narration box */}
        <div className="panel tone relative flex items-center p-5 lg:col-span-4">
          <p className="relative border-[3px] border-ink bg-paper px-4 py-3 text-[15px] leading-relaxed">
            {site.tagline}
          </p>
        </div>
      </div>

      {/* What's actually in the Lab, on a strip of ink */}
      <div className="absolute inset-x-0 bottom-0 border-y-[3px] border-ink bg-ink py-3 text-paper sm:py-4">
        <MarqueeText
          items={marqueeItems}
          speed={35}
          outlineColor="#f2efe6"
          separatorColor="#f2efe6"
          className="font-display text-xl uppercase tracking-tight text-paper sm:text-3xl"
        />
      </div>
    </section>
  )
}
