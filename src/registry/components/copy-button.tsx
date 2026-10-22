import { useState } from 'react'

interface CopyButtonProps {
  value: string
  className?: string
}

export default function CopyButton({ value, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Clipboard can be blocked (e.g. inside iframes) — still show the feedback
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const icon = 'absolute size-4 transition-all duration-300'

  return (
    <button
      onClick={copy}
      aria-label={copied ? 'Copied' : `Copy "${value}"`}
      className={`group inline-flex items-center gap-4 rounded-xl border border-white/10 bg-zinc-900 py-2 pl-4 pr-2 font-mono text-sm text-zinc-300 transition-colors hover:border-white/20 ${className}`}
    >
      <span>
        <span className="select-none text-zinc-500">$ </span>
        {value}
      </span>
      <span className="relative grid size-8 place-items-center rounded-lg bg-white/5 transition-colors group-hover:bg-white/10">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`${icon} ${copied ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}
        >
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#c6f432"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${icon} ${copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      </span>
    </button>
  )
}
