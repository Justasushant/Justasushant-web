import { useState } from 'react'

interface SpringToggleProps {
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  className?: string
}

export default function SpringToggle({
  defaultChecked = false,
  onChange,
  label = 'Toggle',
  className = '',
}: SpringToggleProps) {
  const [on, setOn] = useState(defaultChecked)

  const toggle = () => {
    setOn(!on)
    onChange?.(!on)
  }

  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={toggle}
      className={`relative h-9 w-16 shrink-0 rounded-full transition-colors duration-300 ${
        on ? 'bg-[#c6f432]' : 'bg-zinc-700'
      } ${className}`}
    >
      <span
        className={`absolute left-1 top-1 size-7 rounded-full bg-white shadow-md transition-transform duration-500 ease-[cubic-bezier(.34,1.8,.64,1)] ${
          on ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
