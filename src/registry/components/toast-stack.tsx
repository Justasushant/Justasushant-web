import { useEffect, useState } from 'react'

interface ToastItem {
  id: number
  title: string
  description?: string
}

// A tiny event bus, so you can call toast() from anywhere in your app
let listeners: ((toast: ToastItem) => void)[] = []
let nextId = 0

export function toast(title: string, description?: string) {
  const item = { id: nextId++, title, description }
  listeners.forEach((listener) => listener(item))
}

interface ToastStackProps {
  /** How long each toast stays, in ms */
  duration?: number
  /** Position inside the nearest positioned parent instead of the viewport */
  contained?: boolean
  className?: string
}

export default function ToastStack({ duration = 4000, contained = false, className = '' }: ToastStackProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const add = (item: ToastItem) => {
      setToasts((prev) => [...prev, item].slice(-5))
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== item.id)), duration)
    }
    listeners.push(add)
    return () => {
      listeners = listeners.filter((l) => l !== add)
    }
  }, [duration])

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`${contained ? 'absolute' : 'fixed'} bottom-5 right-5 z-50 h-20 w-80 max-w-[calc(100%-2.5rem)] ${className}`}
    >
      <style>{`@keyframes toast-stack-in { from { transform: translateY(120%); opacity: 0 } }`}</style>
      {toasts.map((t, i) => {
        // 0 is the newest toast, at the front of the stack
        const depth = toasts.length - 1 - i
        return (
          <div
            key={t.id}
            className="absolute inset-x-0 bottom-0 transition-all duration-300 ease-out"
            style={{
              transform: expanded
                ? `translateY(${-depth * 76}px)`
                : `translateY(${-depth * 12}px) scale(${1 - depth * 0.05})`,
              opacity: !expanded && depth > 2 ? 0 : 1,
              zIndex: 100 - depth,
            }}
          >
            <div
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-zinc-900 p-4 shadow-2xl"
              style={{ animation: 'toast-stack-in 0.35s cubic-bezier(.2, .8, .2, 1)' }}
            >
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#c6f432] text-[11px] font-bold text-zinc-950">
                ✓
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">{t.title}</p>
                {t.description && <p className="mt-0.5 truncate text-xs text-zinc-400">{t.description}</p>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
