import { useEffect, useRef } from 'react'

interface FlashlightTextProps {
  text: string
  /** Radius of the light in px */
  radius?: number
  colors?: string[]
  /** Let the light drift around by itself while nobody is pointing at it */
  wander?: boolean
  className?: string
}

export default function FlashlightText({
  text,
  radius = 140,
  colors = ['#ffffff'],
  wander = true,
  className = '',
}: FlashlightTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  // The light eases toward its target every frame, so it feels like a real torch
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const pos = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let pointer = false
    let r = 0
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const box = el.getBoundingClientRect()
      if (!pointer) {
        if (wander) {
          // A slow figure-of-eight across the text
          const t = (now - start) / 1000
          target.x = box.width * (0.5 + Math.sin(t * 0.7) * 0.38)
          target.y = box.height * (0.5 + Math.sin(t * 1.4) * 0.3)
        }
      }
      const goalR = pointer || wander ? radius : 0
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12
      r += (goalR - r) * 0.1
      el.style.setProperty('--x', `${pos.x}px`)
      el.style.setProperty('--y', `${pos.y}px`)
      el.style.setProperty('--r', `${r}px`)
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect()
      pointer = true
      target.x = e.clientX - box.left
      target.y = e.clientY - box.top
    }
    const onLeave = () => {
      pointer = false
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [radius, wander])

  const beam = (stop: string) =>
    `radial-gradient(circle var(--r, 0px) at var(--x, 50%) var(--y, 50%), black ${stop}, transparent 100%)`

  return (
    <div ref={ref} className={`relative cursor-none select-none p-8 ${className}`}>
      {/* Dust in the air, only visible inside the beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1.4px)',
          backgroundSize: '14px 14px',
          maskImage: beam('0%'),
          WebkitMaskImage: beam('0%'),
        }}
      />
      {/* A soft halo where the light lands */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle calc(var(--r, 0px) * 1.2) at var(--x, 50%) var(--y, 50%), color-mix(in srgb, ${colors[0]} 14%, transparent), transparent 70%)`,
        }}
      />
      {/* The text as you see it in the dark: just an outline */}
      <p aria-hidden className="relative text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
        {text}
      </p>
      {/* The bright, colourful copy only shows inside the beam */}
      <p
        className="absolute inset-8 bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${colors.length > 1 ? colors.join(', ') : `${colors[0]}, ${colors[0]}`})`,
          maskImage: beam('35%'),
          WebkitMaskImage: beam('35%'),
          filter: `drop-shadow(0 0 18px color-mix(in srgb, ${colors[0]} 40%, transparent))`,
        }}
      >
        {text}
      </p>
    </div>
  )
}
