import { useEffect, useState } from 'react'

interface TypewriterProps {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  /** How long a full word stays on screen, in ms */
  pause?: number
  className?: string
}

export default function Typewriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 40,
  pause = 1400,
  className = '',
}: TypewriterProps) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let delay = deleting ? deleteSpeed : typeSpeed
    let next = () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))

    if (!deleting && text === word) {
      delay = pause
      next = () => setDeleting(true)
    } else if (deleting && text === '') {
      next = () => {
        setDeleting(false)
        setIndex((i) => i + 1)
      }
    }

    const timeout = setTimeout(next, delay)
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return (
    <span className={className}>
      <style>{`@keyframes typewriter-blink { 50% { opacity: 0 } }`}</style>
      {text}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-current"
        style={{ animation: 'typewriter-blink 1s steps(1) infinite' }}
      />
    </span>
  )
}
