import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { site } from '../data/site.js'
import { categories, components } from '../registry/index.jsx'
import { Stage } from './Preview.jsx'
import FlickeringGrid from '../registry/components/flickering-grid.tsx'
import ScrambleText from '../registry/components/scramble-text.tsx'
import WordRotate from '../registry/components/word-rotate.tsx'
import ShimmerButton from '../registry/components/shimmer-button.tsx'
import SlideFillButton from '../registry/components/slide-fill-button.tsx'
import MarqueeText from '../registry/components/marquee-text.tsx'

// The marquee lists the Lab's real categories
const categoryNames = { Elements: 'UI elements', Text: 'Text effects', Transitions: 'Page transitions' }
const marqueeItems = [...categories.map((c) => categoryNames[c] ?? c), 'Templates (soon)']

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

// Today's wall: a few random picks from every category. The date is the seed,
// so everyone sees the same picks all day and a fresh set tomorrow.
const COLUMNS = 4
const PER_COLUMN = 5

function todaysWall() {
  const now = new Date()
  const random = seededRandom(now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate())
  const perCategory = Math.ceil((COLUMNS * PER_COLUMN) / categories.length)
  const picks = shuffle(
    categories.flatMap((category) =>
      shuffle(
        components.filter((c) => c.category === category),
        random,
      ).slice(0, perCategory),
    ),
    random,
  ).slice(0, COLUMNS * PER_COLUMN)
  return Array.from({ length: COLUMNS }, (_, i) => picks.filter((_, j) => j % COLUMNS === i))
}

const wallColumns = todaysWall()

function WallTile({ item, className = 'mb-5', tabIndex = -1 }) {
  return (
    <Link
      to={`/lab/${item.slug}`}
      tabIndex={tabIndex}
      className={`${className} block w-64 overflow-hidden`}
      style={{ contain: 'paint' }}
    >
      <TileBody item={item} />
    </Link>
  )
}

// Phones get a smaller copy of the 3D wall at the bottom of the hero,
// below the text instead of behind it (fewer tiles, so it stays light)
function MobileWall() {
  const columns = wallColumns.slice(0, 3).map((column) => column.slice(0, 3))
  const fade = 'linear-gradient(to bottom, transparent, black 20%, black 75%, transparent)'
  return (
    <div
      aria-hidden
      className="pointer-events-none relative -mx-4 mt-6 h-[360px] overflow-hidden sm:-mx-6"
      style={{ perspective: '1100px', maskImage: fade, WebkitMaskImage: fade }}
    >
      <div
        className="absolute left-1/2 top-1/2 flex gap-4"
        style={{ transform: 'translate(-50%, -50%) rotateX(38deg) rotateY(-12deg) rotateZ(20deg)' }}
      >
        {columns.map((column, i) => (
          <div
            key={i}
            style={{
              animation: `marquee-up ${40 + i * 8}s linear infinite`,
              animationDirection: i % 2 ? 'reverse' : 'normal',
            }}
          >
            {[...column, ...column].map((item, j) => (
              <WallTile key={j} item={item} className="mb-4" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function TileBody({ item }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 shadow-2xl shadow-black/50 transition-colors hover:border-accent/70"
    >
      {/* The demo renders at a bigger size and is scaled down, so it fits the tile */}
      <div className="pointer-events-none relative h-40 overflow-hidden">
        <div className="absolute left-0 top-0 h-[166.67%] w-[166.67%] origin-top-left scale-[0.6]">
          <Stage item={item} preview />
        </div>
      </div>
      <p className="flex items-center justify-between border-t border-white/10 px-3 py-2 font-mono text-[10px] text-zinc-500">
        <span>
          {item.name} <span className="text-zinc-600">· {item.category}</span>
        </span>
        <span className="text-accent">↗</span>
      </p>
    </div>
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

function ComponentWall() {
  // Fade out at the top, the bottom and the left, so the wall has no hard edges
  const mask =
    'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent), linear-gradient(to right, transparent, black 30%)'
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-40 sm:opacity-60 lg:pointer-events-auto lg:left-[28%] lg:opacity-100"
      style={{
        perspective: '1400px',
        maskImage: mask,
        WebkitMaskImage: mask,
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    >
      <div
        className="absolute left-[12%] top-1/2 flex gap-5"
        style={{ transform: 'translateY(-50%) rotateX(38deg) rotateY(-14deg) rotateZ(22deg)' }}
      >
        {wallColumns.map((column, i) => (
          <div
            key={i}
            className="hover:[animation-play-state:paused]"
            style={{
              animation: `marquee-up ${50 + i * 8}s linear infinite`,
              animationDirection: i % 2 ? 'reverse' : 'normal',
            }}
          >
            {[...column, ...column].map((item, j) => (
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
  // The 3D wall of live demos is desktop only: on a phone it sits behind the
  // text, looks muddy and runs dozens of animations for nothing
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <section id="top" className="relative isolate overflow-hidden lg:min-h-[100svh]">
      <FlickeringGrid
        maxOpacity={0.22}
        className="[mask-image:radial-gradient(ellipse_at_25%_45%,black,transparent_70%)]"
      />
      {isDesktop && <ComponentWall />}

      {/* Keep the text readable over the wall */}
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />

      <div className="pointer-events-none relative z-10 mx-auto flex flex-col justify-center px-4 pb-28 pt-24 sm:px-6 sm:pt-28 lg:min-h-[100svh] lg:px-10 lg:pb-36 2xl:px-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 sm:text-xs">
          {site.companyRole}, {site.company}
        </p>

        <h1 className="pointer-events-auto mt-6 text-[clamp(3.5rem,19vw,6rem)] font-semibold leading-[0.85] tracking-tighter sm:mt-8 sm:text-[clamp(3.6rem,13vw,10.5rem)]">
          <ScrambleText text="Sushant" duration={1100} className="block" />
          <span className="block text-transparent transition-colors duration-500 [-webkit-text-stroke:1.5px_rgba(255,255,255,0.55)] hover:text-accent hover:[-webkit-text-stroke:1.5px_#c6f432]">
            Sharma<span className="text-accent [-webkit-text-stroke:0]">.</span>
          </span>
        </h1>

        {/* On phones the rotating word gets its own line, so the sentence never has a hole in it */}
        <p className="mt-7 text-[1.75rem] leading-tight tracking-tight text-zinc-300 sm:mt-8 sm:text-4xl">
          I build{' '}
          <span className="block min-h-[1.2em] sm:inline">
            <WordRotate
              words={['websites', 'buttons', 'backgrounds', 'loaders', 'page transitions', 'text effects']}
              className="font-serif italic text-accent"
            />
          </span>{' '}
          in React.
        </p>

        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-zinc-400 sm:text-base">
          {site.tagline}
        </p>

        <div className="pointer-events-auto mt-8 grid grid-cols-2 gap-3 sm:mt-9 sm:flex sm:flex-wrap">
          <ShimmerButton
            onClick={() => navigate('/lab')}
            shimmerColor="#c6f432"
            className="whitespace-nowrap px-3 text-[13px] sm:px-6 sm:text-sm"
          >
            Explore the Lab →
          </ShimmerButton>
          <SlideFillButton
            onClick={() => navigate('/#contact')}
            className="justify-center whitespace-nowrap px-3 text-[13px] sm:px-6 sm:text-sm"
          >
            Get in touch
          </SlideFillButton>
        </div>

        <p className="mt-8 text-sm text-zinc-500 sm:mt-10">
          {components.length} components in the Lab right now, each with TSX and JSX code.
        </p>

        {!isDesktop && <MobileWall />}
      </div>

      {/* What's actually in the Lab, rather than buzzwords */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-y border-white/10 bg-zinc-950/80 py-3 backdrop-blur sm:py-4">
        <MarqueeText
          items={marqueeItems}
          speed={35}
          className="text-xl font-semibold uppercase tracking-tight text-white sm:text-3xl"
        />
      </div>
    </section>
  )
}
