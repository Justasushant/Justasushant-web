import { useEffect, useState } from 'react'

interface DeployStep {
  label: string
  /** Small text shown once the step is done (optional) */
  detail?: string
}

interface DeployLoopProps {
  steps: DeployStep[]
  project?: string
  /** Shown when the deploy is ready */
  url?: string
  /** Time each step takes, in ms */
  stepTime?: number
  /** Milliseconds to wait before the loop starts over */
  pause?: number
  accent?: string
  className?: string
}

export default function DeployLoop({
  steps,
  project = 'portfolio',
  url = 'sushant.coneiz.com',
  stepTime = 1200,
  pause = 3500,
  accent = '#c6f432',
  className = '',
}: DeployLoopProps) {
  // Index of the step that is running; steps.length means everything is done
  const [current, setCurrent] = useState(0)
  const done = current >= steps.length

  useEffect(() => {
    const timeout = setTimeout(
      () => setCurrent((c) => (c >= steps.length ? 0 : c + 1)),
      done ? pause : stepTime,
    )
    return () => clearTimeout(timeout)
  }, [current, done, steps.length, stepTime, pause])

  const progress = steps.length ? Math.min(current / steps.length, 1) : 0

  return (
    <div
      className={`w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl ${className}`}
    >
      <style>{`@keyframes deploy-loop-spin { to { transform: rotate(360deg) } }`}</style>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">Deploying {project}</p>
          <p className="font-mono text-xs text-zinc-500">main · {done ? 'ready' : 'building'}</p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold"
          style={
            done
              ? { background: accent, color: '#09090b' }
              : { background: 'rgba(251, 191, 36, 0.15)', color: '#fcd34d' }
          }
        >
          {done ? 'Ready' : 'Building'}
        </span>
      </div>

      <div className="h-1 bg-white/5">
        <div
          className="h-full transition-[width] duration-700 ease-out"
          style={{ width: `${progress * 100}%`, background: accent }}
        />
      </div>

      <ul className="space-y-3 p-5 font-mono text-[13px]">
        {steps.map((step, i) => {
          const state = i < current ? 'done' : i === current ? 'running' : 'waiting'
          return (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center">
                {state === 'done' && (
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                )}
                {state === 'running' && (
                  <span
                    className="size-3.5 rounded-full border-2 border-white/20"
                    style={{ borderTopColor: accent, animation: 'deploy-loop-spin 0.7s linear infinite' }}
                  />
                )}
                {state === 'waiting' && <span className="size-1.5 rounded-full bg-zinc-700" />}
              </span>
              <span className="min-w-0">
                <span className={state === 'waiting' ? 'text-zinc-600' : 'text-zinc-100'}>{step.label}</span>
                {state === 'done' && step.detail && (
                  <span className="block text-xs text-zinc-500">{step.detail}</span>
                )}
              </span>
            </li>
          )
        })}
      </ul>

      <div
        className={`flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs transition-opacity duration-500 ${
          done ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-zinc-500">Live at</span>
        <span className="font-mono" style={{ color: accent }}>
          {url} ↗
        </span>
      </div>
    </div>
  )
}
