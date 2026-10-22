import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import OssTerminal from '../components/OssTerminal.jsx'
import { site } from '../data/site.js'
import { excuses, ossTerminalLines } from '../data/opensource.js'
import { components } from '../registry/index.jsx'
import MatrixRain from '../registry/components/matrix-rain.tsx'
import GlitchText from '../registry/components/glitch-text.tsx'
import NumberTicker from '../registry/components/number-ticker.tsx'
import TerminalLoop from '../registry/components/terminal-loop.tsx'
import ExcuseGenerator from '../components/ExcuseGenerator.jsx'
import ShimmerButton from '../registry/components/shimmer-button.tsx'

function ModeToggle({ mode, onChange }) {
  const option = (value, label, icon) => (
    <button
      onClick={() => onChange(value)}
      aria-pressed={mode === value}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        mode === value ? 'bg-white text-zinc-950' : 'text-zinc-400 hover:text-white'
      }`}
    >
      <span aria-hidden className="font-mono">
        {icon}
      </span>
      {label}
    </button>
  )
  return (
    <div className="fixed right-3 top-[68px] z-50 flex rounded-full border border-white/15 bg-zinc-950/90 p-0.5 shadow-xl backdrop-blur sm:right-5">
      {option('ui', 'UI', '◧')}
      {option('terminal', 'Terminal', '>_')}
    </div>
  )
}

function ProgressCard() {
  const [progress, setProgress] = useState(97.1)

  // Creeps towards 100% forever, but never gets there
  useEffect(() => {
    const id = setInterval(() => setProgress((p) => p + (99.99 - p) * 0.08), 700)
    return () => clearInterval(id)
  }, [])

  const stats = [
    { value: 12, label: 'repos planned' },
    { value: 0, label: 'repos shipped' },
    { value: 1337, label: 'cups of chai' },
    { value: components.length, label: 'components polished instead' },
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/90 p-6 backdrop-blur">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          Open-sourcing progress
        </p>
        <p className="font-mono text-sm tabular-nums text-accent">{progress.toFixed(2)}%</p>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-emerald-400 transition-[width] duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Estimated completion: right after one more component.
      </p>
      <dl className="mt-8 grid grid-cols-2 gap-5">
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="text-3xl font-semibold tracking-tight text-white">
              <NumberTicker value={s.value} duration={1800} />
            </dd>
            <dt className="mt-1 text-xs text-zinc-500">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function OpenSource() {
  // ?mode=terminal turns the whole page into a terminal, so it can be shared as a link
  const [params, setParams] = useSearchParams()
  const mode = params.get('mode') === 'terminal' ? 'terminal' : 'ui'
  const setMode = (next) =>
    setParams(next === 'terminal' ? { mode: 'terminal' } : {}, { replace: true })

  if (mode === 'terminal') {
    return (
      <>
        <Nav />
        <ModeToggle mode={mode} onChange={setMode} />
        <OssTerminal onExit={() => setMode('ui')} />
      </>
    )
  }

  return <OpenSourceUI mode={mode} setMode={setMode} />
}

function OpenSourceUI({ mode, setMode }) {
  const navigate = useNavigate()
  return (
    <>
      <Nav />
      <ModeToggle mode={mode} onChange={setMode} />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
          <MatrixRain fps={18} />
        </div>

        <section className="relative mx-auto px-4 pb-24 pt-32 sm:px-6 lg:px-10 2xl:px-16 sm:pt-40">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 font-mono text-xs text-amber-300">
            <span className="size-2 animate-pulse rounded-full bg-amber-400" />
            Status: coming soon™ (indefinitely)
          </p>

          <h1 className="mt-8 text-[clamp(3.5rem,12vw,9.5rem)] font-black leading-[0.85] tracking-tighter">
            <GlitchText text="TOO BUSY." speed={3} />
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-300 sm:text-2xl">
            My open-source page would be here, but I’m busy remixing everyone else’s components to
            work on my own. <span className="text-zinc-500">The irony is not lost on me.</span>
          </p>
          <button
            onClick={() => setMode('terminal')}
            className="mt-5 font-mono text-sm text-zinc-500 transition-colors hover:text-accent"
          >
            psst: prefer a terminal? switch modes and try <span className="text-accent">ls</span> →
          </button>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <TerminalLoop
              lines={ossTerminalLines}
              title="~/sushant/open-source"
              className="max-w-none"
            />
            <ProgressCard />
          </div>

          <div className="mt-5">
            <ExcuseGenerator
              excuses={excuses}
              label="Official excuse of the moment"
              buttonLabel="Give me another excuse"
            />
          </div>

          <div className="mt-16 flex flex-col items-start gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-2xl font-semibold tracking-tight">Meanwhile…</p>
              <p className="mt-1 text-zinc-400">
                Everything in the Lab is already free to copy. That’s basically open source, right?
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton onClick={() => navigate('/lab')} shimmerColor="#c6f432">
                Steal from the Lab →
              </ShimmerButton>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent('Where is the open source, Sushant?')}`}
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-medium transition-colors hover:border-white"
              >
                Bug me about it
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
