import { useLayoutEffect, useRef, useState } from 'react'

interface AnimatedTabsProps {
  tabs: string[]
  defaultIndex?: number
  onChange?: (index: number) => void
  pillColor?: string
  activeTextColor?: string
  className?: string
}

export default function AnimatedTabs({
  tabs,
  defaultIndex = 0,
  onChange,
  pillColor = '#ffffff',
  activeTextColor = '#09090b',
  className = '',
}: AnimatedTabsProps) {
  const [active, setActive] = useState(defaultIndex)
  const [pill, setPill] = useState({ left: 0, width: 0 })
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  // Measure the active tab and slide the pill to it
  useLayoutEffect(() => {
    const el = refs.current[active]
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
  }, [active, tabs])

  return (
    <div
      role="tablist"
      className={`relative inline-flex rounded-full border border-white/10 bg-white/5 p-1 ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-y-1 rounded-full transition-all duration-500 ease-[cubic-bezier(.34,1.4,.64,1)]"
        style={{ ...pill, background: pillColor }}
      />
      {tabs.map((tab, i) => (
        <button
          key={tab}
          ref={(el) => {
            refs.current[i] = el
          }}
          role="tab"
          aria-selected={active === i}
          onClick={() => {
            setActive(i)
            onChange?.(i)
          }}
          className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
            active === i ? '' : 'text-zinc-400 hover:text-white'
          }`}
          style={active === i ? { color: activeTextColor } : undefined}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
