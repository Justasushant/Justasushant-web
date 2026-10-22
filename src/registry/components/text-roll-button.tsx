import type { ButtonHTMLAttributes } from 'react'

interface TextRollButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  /** Delay between letters in ms */
  stagger?: number
}

export default function TextRollButton({
  text,
  stagger = 25,
  className = '',
  ...props
}: TextRollButtonProps) {
  const letters = text.split('')
  const ease = 'cubic-bezier(.65, 0, .35, 1)'

  return (
    <button
      aria-label={text}
      className={`group rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 ${className}`}
      {...props}
    >
      <span aria-hidden className="flex overflow-hidden">
        {letters.map((letter, i) => {
          const char = letter === ' ' ? ' ' : letter
          const style = { transitionDelay: `${i * stagger}ms`, transitionTimingFunction: ease }
          return (
            <span key={i} className="relative inline-block">
              <span
                className="inline-block transition-transform duration-500 group-hover:-translate-y-full"
                style={style}
              >
                {char}
              </span>
              <span
                className="absolute left-0 top-full inline-block transition-transform duration-500 group-hover:-translate-y-full"
                style={style}
              >
                {char}
              </span>
            </span>
          )
        })}
      </span>
    </button>
  )
}
