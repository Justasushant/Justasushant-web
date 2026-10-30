import { useState } from 'react'

interface CheckListProps {
  items?: string[]
  /** Items that start already done (by index) */
  defaultDone?: number[]
  color?: string
  title?: string
  className?: string
}

// A to-do list with crisp details: the tick draws itself, the label gets
// struck through from left to right, and the progress bar snaps forward
export default function CheckList({
  items = ['Sketch the idea', 'Build the component', 'Make it crispy', 'Ship it'],
  defaultDone = [0],
  color = '#c6f432',
  title = 'Today',
  className = '',
}: CheckListProps) {
  const [done, setDone] = useState<Set<number>>(() => new Set(defaultDone))
  const progress = done.size / items.length

  const toggle = (i: number) =>
    setDone((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  return (
    <div className={`w-80 rounded-2xl border border-white/10 bg-zinc-900 p-5 ${className}`}>
      <style>{`@keyframes check-list-pop { 0% { transform: scale(1) } 40% { transform: scale(0.8) } 70% { transform: scale(1.15) } 100% { transform: scale(1) } }`}</style>
      <div className="flex items-baseline justify-between">
        <p className="font-semibold text-white">{title}</p>
        <p className="font-mono text-xs tabular-nums text-zinc-500">
          {done.size}/{items.length}
        </p>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-[width] duration-300 ease-[cubic-bezier(.3,1.4,.5,1)]"
          style={{ width: `${progress * 100}%`, background: color }}
        />
      </div>
      <ul className="mt-4 space-y-1">
        {items.map((item, i) => {
          const checked = done.has(i)
          return (
            <li key={item}>
              <button
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-white/5"
              >
                <span
                  key={String(checked)}
                  className="grid size-5 shrink-0 place-items-center rounded-md border-2 transition-colors duration-150"
                  style={{
                    borderColor: checked ? color : 'rgba(255,255,255,0.25)',
                    background: checked ? color : 'transparent',
                    animation: 'check-list-pop 0.3s ease-out',
                  }}
                >
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="#09090b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path
                      d="m5 12 5 5 9-10"
                      pathLength={1}
                      style={{
                        strokeDasharray: 1,
                        strokeDashoffset: checked ? 0 : 1,
                        transition: `stroke-dashoffset 0.25s ease-out ${checked ? '0.08s' : '0s'}`,
                      }}
                    />
                  </svg>
                </span>
                <span className={`relative transition-colors duration-300 ${checked ? 'text-zinc-500' : 'text-zinc-200'}`}>
                  {item}
                  <span
                    className="absolute left-0 top-1/2 h-[1.5px] w-full origin-left bg-zinc-500 transition-transform duration-300 ease-out"
                    style={{ transform: `scaleX(${checked ? 1 : 0})` }}
                  />
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
