import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react'

interface Command {
  label: string
  group: string
  icon?: ReactNode
  shortcut?: string
  onSelect?: () => void
}

interface CommandPaletteProps {
  commands: Command[]
  placeholder?: string
  /** Position inside the nearest positioned parent instead of the viewport */
  contained?: boolean
  className?: string
}

export default function CommandPalette({
  commands,
  placeholder = 'Type a command or search…',
  contained = false,
  className = '',
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()))
  const groups = [...new Set(results.map((c) => c.group))]

  // ⌘K / Ctrl+K toggles the palette from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  const choose = (command: Command) => {
    command.onSelect?.()
    setOpen(false)
  }

  const onInputKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      choose(results[active])
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex w-64 items-center gap-3 rounded-xl border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:border-white/20 ${className}`}
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        Search…
        <kbd className="ml-auto rounded-md border border-white/10 px-1.5 font-mono text-[11px]">⌘K</kbd>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className={`${contained ? 'absolute' : 'fixed'} inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[10%] backdrop-blur-sm`}
        >
          <style>{`@keyframes command-palette-in { from { opacity: 0; transform: scale(0.96) translateY(-8px) } }`}</style>
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl"
            style={{ animation: 'command-palette-in 0.18s ease-out' }}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActive(0)
              }}
              onKeyDown={onInputKey}
              placeholder={placeholder}
              className="w-full border-b border-white/10 bg-transparent px-5 py-4 text-sm text-white outline-none placeholder:text-zinc-500"
            />
            <div className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-zinc-500">No results for “{query}”</p>
              )}
              {groups.map((group) => (
                <div key={group} className="mb-1">
                  <p className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {group}
                  </p>
                  {results
                    .filter((c) => c.group === group)
                    .map((command) => {
                      const index = results.indexOf(command)
                      return (
                        <button
                          key={command.label}
                          onMouseEnter={() => setActive(index)}
                          onClick={() => choose(command)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            index === active ? 'bg-white/10 text-white' : 'text-zinc-300'
                          }`}
                        >
                          <span className="w-5 text-center">{command.icon}</span>
                          {command.label}
                          {command.shortcut && (
                            <kbd className="ml-auto font-mono text-[11px] text-zinc-500">{command.shortcut}</kbd>
                          )}
                        </button>
                      )
                    })}
                </div>
              ))}
            </div>
            <div className="flex gap-4 border-t border-white/10 px-4 py-2.5 font-mono text-[10px] text-zinc-500">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
