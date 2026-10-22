import { useEffect, useState } from 'react'

interface WordRotateProps {
  words: string[]
  /** Time each word is shown, in ms */
  interval?: number
  className?: string
}

export default function WordRotate({ words, interval = 2200, className = '' }: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span className={`inline-grid overflow-hidden pb-[0.1em] align-bottom ${className}`}>
      <style>{`
        @keyframes word-rotate-in {
          from { transform: translateY(90%); opacity: 0; filter: blur(6px) }
          to { transform: translateY(0); opacity: 1; filter: blur(0) }
        }
      `}</style>
      <span
        key={index}
        className="inline-block"
        style={{ animation: 'word-rotate-in 0.6s cubic-bezier(.2, .8, .2, 1)' }}
      >
        {words[index]}
      </span>
    </span>
  )
}
