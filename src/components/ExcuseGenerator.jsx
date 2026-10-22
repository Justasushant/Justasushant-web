import { useEffect, useRef, useState } from 'react'
import ConfettiButton from '../registry/components/confetti-button.tsx'

const believers = [
  'my mom',
  'nobody',
  'my cat',
  'one (1) recruiter',
  'the rubber duck',
  'an AI, reluctantly',
  'me, at 3am',
]

// Same excuse, same score, so the meter feels "scientific"
const believability = (text) => {
  let hash = 0
  for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return 4 + (Math.abs(hash) % 38)
}

export default function ExcuseGenerator({
  excuses,
  label = 'Excuse-o-matic 3000',
  buttonLabel = 'Generate another excuse',
  actions,
  children,
}) {
  const [index, setIndex] = useState(0)
  const [rolling, setRolling] = useState(null)
  const [count, setCount] = useState(1)
  const [history, setHistory] = useState([])
  const [copied, setCopied] = useState(false)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearInterval), [])

  // Spin through excuses like a slot machine, then land on a new one
  const generate = () => {
    if (rolling !== null) return
    let next = index
    while (next === index && excuses.length > 1) next = Math.floor(Math.random() * excuses.length)

    const spin = setInterval(() => setRolling(Math.floor(Math.random() * excuses.length)), 70)
    timers.current.push(spin)
    setTimeout(() => {
      clearInterval(spin)
      setRolling(null)
      setHistory((h) => [excuses[index], ...h].slice(0, 3))
      setIndex(next)
      setCount((c) => c + 1)
    }, 650)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(excuses[index])
    } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  const shown = excuses[rolling ?? index]
  const score = believability(excuses[index])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950">
      {/* Backdrop: a faint grid and a glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 20% 0%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 20% 0%, black, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-24 size-72 rounded-full bg-fuchsia-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-10 size-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative p-6 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-zinc-300">
            <span className={`size-1.5 rounded-full ${rolling !== null ? 'animate-ping bg-amber-400' : 'bg-accent'}`} />
            {label}
          </p>
          <p className="font-mono text-xs text-zinc-500">
            excuse #{String(count).padStart(2, '0')} · ∞ in stock
          </p>
        </div>

        <div className="relative mt-8 min-h-[7.5rem] sm:mt-10">
          <span
            aria-hidden
            className="absolute -left-2 -top-8 select-none font-serif text-8xl leading-none text-white/10 sm:-left-4 sm:text-9xl"
          >
            “
          </span>
          <p
            key={rolling === null ? index : 'rolling'}
            aria-live="polite"
            className={`relative max-w-4xl text-2xl font-semibold leading-snug tracking-tight sm:text-4xl ${
              rolling !== null ? 'text-zinc-500 blur-[1.5px]' : 'text-white'
            }`}
            style={rolling === null ? { animation: 'excuse-land 0.55s cubic-bezier(.2,.8,.2,1)' } : undefined}
          >
            {shown}
          </p>
          <style>{`@keyframes excuse-land { from { opacity: 0; transform: translateY(18px) scale(0.98); filter: blur(8px) } }`}</style>
        </div>

        <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="max-w-sm">
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              <span>Believability</span>
              <span className="text-zinc-300">{rolling === null ? `${score}%` : '…'}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-accent transition-[width] duration-700"
                style={{ width: rolling === null ? `${score}%` : '0%' }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Convincing to: <span className="text-zinc-300">{believers[count % believers.length]}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ConfettiButton onClick={generate} className="bg-white! text-zinc-950!">
              🎲 {buttonLabel}
            </ConfettiButton>
            <button
              onClick={copy}
              className="rounded-full border border-white/15 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
            >
              {copied ? '✓ Copied' : 'Copy excuse'}
            </button>
            {actions}
          </div>
        </div>

        {children}

        {history.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-600">Previously</span>
            {history.map((h, i) => (
              <span
                key={`${h}-${i}`}
                className="max-w-xs truncate rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-xs text-zinc-500"
                title={h}
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
