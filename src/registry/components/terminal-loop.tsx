import { useEffect, useState } from 'react'

interface TerminalLine {
  /** What gets typed after the prompt */
  command: string
  /** What the terminal answers (optional) */
  output?: string
  tone?: 'default' | 'success' | 'error' | 'muted'
}

interface TerminalLoopProps {
  lines: TerminalLine[]
  /** Text in the window's title bar */
  title?: string
  /** Symbol before each command */
  prompt?: string
  /** Milliseconds per typed character */
  typingSpeed?: number
  /** Milliseconds to wait before the loop starts over */
  pause?: number
  accent?: string
  className?: string
}

const toneColor = {
  default: '#a1a1aa',
  success: '#c6f432',
  error: '#fb7185',
  muted: '#71717a',
}

export default function TerminalLoop({
  lines,
  title = '~/projects',
  prompt = '❯',
  typingSpeed = 55,
  pause = 3500,
  accent = '#c6f432',
  className = '',
}: TerminalLoopProps) {
  // Where the animation is: which line, how many characters typed, output shown yet
  const [step, setStep] = useState({ line: 0, chars: 0, output: false })

  useEffect(() => {
    const current = lines[step.line]
    let delay: number
    let next: typeof step

    if (!current) {
      delay = pause
      next = { line: 0, chars: 0, output: false }
    } else if (step.chars < current.command.length) {
      // Slightly uneven typing feels more human
      delay = typingSpeed * (0.6 + Math.random() * 0.8)
      next = { ...step, chars: step.chars + 1 }
    } else if (!step.output && current.output) {
      delay = 350
      next = { ...step, output: true }
    } else {
      delay = 550
      next = { line: step.line + 1, chars: 0, output: false }
    }

    const timeout = setTimeout(() => setStep(next), delay)
    return () => clearTimeout(timeout)
  }, [step, lines, typingSpeed, pause])

  return (
    <div
      className={`w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 font-mono text-[13px] leading-relaxed shadow-2xl ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-xs text-zinc-500">{title}</span>
      </div>
      <div className="min-h-64 space-y-1.5 p-5">
        {lines.slice(0, step.line + 1).map((line, i) => {
          const isCurrent = i === step.line
          const typed = isCurrent ? line.command.slice(0, step.chars) : line.command
          const showOutput = line.output && (!isCurrent || step.output)
          return (
            <div key={i}>
              <p className="font-semibold text-zinc-100">
                <span className="mr-2" style={{ color: accent }}>
                  {prompt}
                </span>
                {typed}
                {isCurrent && !step.output && (
                  <span
                    className="ml-0.5 inline-block h-4 w-2 animate-pulse align-middle"
                    style={{ background: accent }}
                  />
                )}
              </p>
              {showOutput && <p style={{ color: toneColor[line.tone ?? 'default'] }}>{line.output}</p>}
            </div>
          )
        })}
        {step.line >= lines.length && (
          <span className="inline-block h-4 w-2 animate-pulse align-middle" style={{ background: accent }} />
        )}
      </div>
    </div>
  )
}
