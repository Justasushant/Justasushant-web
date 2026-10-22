import { useCallback, useEffect, useRef, useState } from 'react'

interface ScrambleTextProps {
  text: string
  /** Total time to decode, in ms */
  duration?: number
  /** Scramble again when hovered */
  scrambleOnHover?: boolean
  className?: string
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}=+*^?#'

export default function ScrambleText({
  text,
  duration = 900,
  scrambleOnHover = true,
  className = '',
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)

  const scramble = useCallback(() => {
    cancelAnimationFrame(frame.current)
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const revealed = Math.floor(progress * text.length)
      setDisplay(
        text
          .split('')
          .map((char, i) =>
            i < revealed || char === ' ' ? char : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(''),
      )
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
  }, [text, duration])

  useEffect(() => {
    scramble()
    return () => cancelAnimationFrame(frame.current)
  }, [scramble])

  return (
    <span
      aria-label={text}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
      className={`inline-block ${className}`}
    >
      <span aria-hidden>{display}</span>
    </span>
  )
}
