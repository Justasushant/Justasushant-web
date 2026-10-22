import { useState } from 'react'
import type { ReactNode } from 'react'

interface AccordionItem {
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  /** Index of the item open at first (null for none) */
  defaultOpen?: number | null
  /** Colour of the open item's icon */
  accent?: string
  className?: string
}

export default function Accordion({
  items,
  defaultOpen = 0,
  accent = '#c6f432',
  className = '',
}: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <div
      className={`w-full max-w-md divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-900/60 ${className}`}
    >
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.title}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white"
            >
              {item.title}
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full border text-base leading-none transition-all duration-300 ${
                  isOpen ? 'rotate-45 border-transparent text-zinc-950' : 'border-white/15 text-zinc-400'
                }`}
                style={{ background: isOpen ? accent : 'transparent' }}
              >
                +
              </span>
            </button>
            {/* Animating grid rows from 0fr to 1fr gives a smooth auto-height */}
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div
                  className={`px-5 pb-5 text-sm leading-relaxed text-zinc-400 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
