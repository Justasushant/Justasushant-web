import { Children, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface PortalSwitchProps {
  /** Each child is one full-size page */
  children: ReactNode
  /** How long the portal takes to open, in ms */
  duration?: number
  /** Main colour of the sparks */
  color?: string
  /** Colour of the hottest sparks */
  hotColor?: string
  /** Go to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  hot: boolean
}

// The portal's radius over time (0 – 1): it sparks into being, holds as a small
// ring while it spins up, then tears wide open
function openness(t: number) {
  if (t < 0.15) return (t / 0.15) * 0.12
  if (t < 0.45) return 0.12 + ((t - 0.15) / 0.3) * 0.06
  const k = (t - 0.45) / 0.55
  return 0.18 + (1 - Math.pow(1 - k, 3)) * 0.82
}

// A ring of sparks spins open in the middle of the page, like a sorcerer's
// portal, and the next page is waiting on the other side
export default function PortalSwitch({
  children,
  duration = 1800,
  color = '#f97316',
  hotColor = '#fde68a',
  autoPlay,
  className = '',
}: PortalSwitchProps) {
  const pages = Children.toArray(children)
  const count = pages.length
  const { ref, index, go } = usePager(count, duration + 150, autoPlay)
  const [from, setFrom] = useState<number | null>(null)
  const shown = useRef(0)
  const nextPage = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (index === shown.current) return
    setFrom(shown.current)
    shown.current = index
  }, [index])

  // One clock drives both the opening and the sparks, so they never drift apart
  useEffect(() => {
    if (from === null) return
    const el = ref.current
    const cv = canvas.current
    const ctx = cv?.getContext('2d')
    if (!el || !cv || !ctx) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const w = el.clientWidth
    const h = el.clientHeight
    cv.width = w * dpr
    cv.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const cx = w / 2
    const cy = h / 2
    const reach = Math.hypot(w, h) / 2 + 20
    const sparks: Spark[] = []
    const start = performance.now()
    let spin = 0
    let raf = 0

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const r = openness(t) * reach
      spin += 0.12
      if (nextPage.current) nextPage.current.style.clipPath = `circle(${r}px at 50% 50%)`
      // New sparks leave the rim at a tangent, so the ring looks like it's spinning
      const fade = t > 0.85 ? (1 - t) / 0.15 : 1
      const born = Math.round((40 + r * 0.25) * fade)
      for (let i = 0; i < born; i++) {
        const a = Math.random() * Math.PI * 2
        const speed = 2 + Math.random() * 4
        const px = cx + Math.cos(a) * r
        const py = cy + Math.sin(a) * r
        sparks.push({
          x: px,
          y: py,
          vx: -Math.sin(a + spin * 0.02) * speed + Math.cos(a) * 0.8,
          vy: Math.cos(a + spin * 0.02) * speed + Math.sin(a) * 0.8 + 0.4,
          life: 0.5 + Math.random() * 0.5,
          hot: Math.random() < 0.3,
        })
      }
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap = 'round'
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.12
        s.vx *= 0.96
        s.life -= 0.035
        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        ctx.globalAlpha = s.life
        ctx.strokeStyle = s.hot ? hotColor : color
        ctx.lineWidth = s.hot ? 2 : 1.4
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.vx * 2.5, s.y - s.vy * 2.5)
        ctx.stroke()
      }
      // A soft glow along the rim
      if (r > 2 && fade > 0) {
        ctx.globalAlpha = 0.5 * fade
        ctx.strokeStyle = color
        ctx.lineWidth = 6
        ctx.shadowColor = color
        ctx.shadowBlur = 24
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.shadowBlur = 0
      }
      ctx.globalAlpha = 1
      if (t < 1 || sparks.length) raf = requestAnimationFrame(frame)
      else {
        ctx.clearRect(0, 0, w, h)
        setFrom(null)
      }
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [from, duration, color, hotColor, ref])

  return (
    <div ref={ref} tabIndex={0} className={`relative size-full touch-none overflow-hidden bg-black outline-none ${className}`}>
      <div className="absolute inset-0">{pages[from ?? index]}</div>
      {from !== null && (
        <div ref={nextPage} className="absolute inset-0 z-10" style={{ clipPath: 'circle(0px at 50% 50%)' }}>
          {pages[index]}
        </div>
      )}
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 z-20 size-full" />
      <PageDots count={count} index={index} onSelect={go} />
    </div>
  )
}

function PageDots({
  count,
  index,
  onSelect,
}: {
  count: number
  index: number
  onSelect: (i: number) => void
}) {
  return (
    <div className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 mix-blend-difference">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          aria-label={`Go to page ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`w-1.5 rounded-full bg-white transition-all duration-500 ${
            i === index ? 'h-7' : 'h-1.5 opacity-50 hover:opacity-90'
          }`}
        />
      ))}
    </div>
  )
}

// Pages through with the wheel, swipes, arrow keys or a timer. Ignores input
// while a switch is running, and lets the wheel scroll the surrounding page
// once you're past the first or last page.
function usePager(count: number, cooldown: number, autoPlay?: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const current = useRef(0)
  const locked = useRef(false)

  const go = useCallback(
    (next: number) => {
      if (locked.current || next < 0 || next >= count || next === current.current) return
      locked.current = true
      current.current = next
      setIndex(next)
      setTimeout(() => {
        locked.current = false
      }, cooldown)
    },
    [count, cooldown],
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let touchY = 0
    let lastWheel = 0
    const step = (dir: number) => go(current.current + dir)
    const atEdge = (dir: number) =>
      (dir < 0 && current.current === 0) || (dir > 0 && current.current === count - 1)

    const onWheel = (e: WheelEvent) => {
      const dir = Math.sign(e.deltaY)
      if (!dir || atEdge(dir)) return
      e.preventDefault()
      // Only react to a new gesture, not the long tail of trackpad momentum
      const now = performance.now()
      const fresh = now - lastWheel > 200
      lastWheel = now
      if (fresh || Math.abs(e.deltaY) > 40) step(dir)
    }
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchY - e.changedTouches[0].clientY
      if (Math.abs(delta) > 40) step(Math.sign(delta))
    }
    const onKey = (e: KeyboardEvent) => {
      const dir = ['ArrowDown', 'PageDown'].includes(e.key)
        ? 1
        : ['ArrowUp', 'PageUp'].includes(e.key)
          ? -1
          : 0
      if (!dir) return
      e.preventDefault()
      step(dir)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('keydown', onKey)
    }
  }, [count, go])

  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => go((current.current + 1) % count), autoPlay)
    return () => clearInterval(id)
  }, [autoPlay, count, go])

  return { ref, index, go }
}
