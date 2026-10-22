import { useEffect, useRef, useState } from 'react'

interface BlurInTextProps {
  text: string
  /** Delay between words, in seconds */
  stagger?: number
  className?: string
}

export default function BlurInText({ text, stagger = 0.08, className = '' }: BlurInTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  // Start the animation the first time the text scrolls into view
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} aria-label={text} className={className}>
      <style>{`
        @keyframes blur-in-text {
          from { opacity: 0; filter: blur(12px); transform: translateY(10px) }
          to { opacity: 1; filter: blur(0); transform: translateY(0) }
        }
      `}</style>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="mr-[0.25em] inline-block"
          style={{
            opacity: 0,
            animation: visible ? `blur-in-text 0.8s ease-out ${i * stagger}s forwards` : 'none',
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
