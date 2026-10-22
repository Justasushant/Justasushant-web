import { useRef } from 'react'
import type { ButtonHTMLAttributes, PointerEvent } from 'react'

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** How strongly the button follows the cursor (0 – 1) */
  strength?: number
}

export default function MagneticButton({
  children,
  strength = 0.35,
  className = '',
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    // The padded wrapper is the "magnetic field" around the button
    <div onPointerMove={onPointerMove} onPointerLeave={reset} className="inline-block p-8">
      <button
        ref={ref}
        className={`rounded-full bg-[#c6f432] px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-[#c6f432]/20 transition-transform duration-200 ease-out ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}
