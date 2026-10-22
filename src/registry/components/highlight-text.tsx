import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface HighlightTextProps {
  children: ReactNode
  color?: string
  /** Delay before the marker sweeps in, in ms */
  delay?: number
  className?: string
}

export default function HighlightText({
  children,
  color = '#c6f432',
  delay = 200,
  className = '',
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  // Sweep the marker in the first time the text scrolls into view
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
    <span
      ref={ref}
      className={`rounded-sm px-1 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] ${className}`}
      style={{
        backgroundImage: `linear-gradient(104deg, transparent 0.5%, ${color} 2%, ${color} 97%, transparent 99%)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 85%',
        backgroundSize: visible ? '100% 70%' : '0% 70%',
        transition: `background-size 0.9s cubic-bezier(.65, 0, .35, 1) ${delay}ms`,
      }}
    >
      {children}
    </span>
  )
}
