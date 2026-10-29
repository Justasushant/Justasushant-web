import { Children, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface TearRevealProps {
  /** Each child is one full-size page */
  children: ReactNode
  /** Length of one tear, in ms */
  duration?: number
  /** How violently the page tears, 0.2 – 1 */
  intensity?: number
  /** Colour of the code plates and the interference tint */
  tint?: string
  /** Lines of code that flash up on the torn ribbons */
  codeLines?: string[]
  /** Show the code ribbons */
  showCode?: boolean
  /** Go to the next page automatically every n ms */
  autoPlay?: number
  className?: string
}

const BEATS = 36
const MAX_FRAGMENTS = 80

const DEFAULT_CODE = [
  "const lab = createLab({ react: true })",
  "await deploy({ branch: 'main' })",
  'export default function Page() {',
  'let frame = requestAnimationFrame(tick)',
  "0x003F  0xA128  0x007E  0xF340  00110110",
  'items.map((item) => render(item))',
  "import { useState } from 'react'",
  'if (progress >= 1) return done()',
  "10101010  0x09BC  11001001  0x2F10",
]

// A small seeded random number: the same inputs always give the same value,
// so a given "beat" of the tear always looks the same
const fract = (v: number) => v - Math.floor(v)
function hash(x: number, y: number) {
  let px = fract(x * 123.34)
  let py = fract(y * 456.21)
  const d = px * (px + 45.32) + py * (py + 45.32)
  px += d
  py += d
  return fract(px * py)
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

interface Fragment {
  key: string
  x: number
  y: number
  w: number
  h: number
  /** How far the picture is shifted sideways inside this ribbon */
  dx: number
  dy: number
  coarse: boolean
  variation: number
  line: number
}

// Cuts the page into horizontal ribbons and decides which ones are torn
// loose and by how much. Thick ribbons come first so they survive the cap.
function buildFragments(W: number, H: number, amount: number, strength: number, beat: number, lines: number) {
  const out: Fragment[] = []
  const scale = Math.min(1, W / 900)

  for (const coarse of [true, false]) {
    const rowH = coarse ? lerp(38, 18, amount) : lerp(11, 6, amount)
    const b = coarse ? Math.floor(beat / 2) : beat
    const rows = Math.ceil(H / rowH)

    for (let r = 0; r < rows; r++) {
      const rowSeed = hash(r, coarse ? 73 : 19)
      const w = (coarse ? lerp(100, 280, rowSeed) : lerp(24, 130, rowSeed)) * scale
      const shift = rowSeed * 317
      const y = r * rowH

      for (let c = Math.floor(shift / w); c <= Math.floor((W + shift) / w); c++) {
        const x = c * w - shift
        const cluster = hash(Math.floor(x / 220) + Math.floor(b / 3), Math.floor(y / 110))
        const density = (coarse ? 0.18 : 0.06) * amount * strength * lerp(0.4, 1.7, cluster) * 2
        if (hash(c + b, r + (coarse ? 83 : 31)) >= density) continue

        const x0 = Math.max(0, x)
        const x1 = Math.min(W, x + w)
        if (x1 - x0 < 3) continue

        const variation = hash(c + b + 11, r + 97)
        const limit = Math.min(coarse ? 190 : 125, W * 0.16)
        out.push({
          key: `${coarse ? 'c' : 'f'}-${r}-${c}`,
          x: x0,
          y,
          w: x1 - x0,
          h: rowH,
          dx: (variation < 0.5 ? -1 : 1) * lerp(4, limit, variation) * lerp(0.3, 1, amount) * strength,
          dy: coarse ? (hash(c + 47, r + 47) - 0.5) * 14 * strength : 0,
          coarse,
          variation,
          line: Math.floor(hash(c + Math.floor(b / 2), r + 119) * lines),
        })
      }
    }
  }
  return out.slice(0, MAX_FRAGMENTS)
}

// The part of the page that is still there: small blocks that drop out in a
// scattered order. Returned as one CSS path of rectangles.
function holePath(W: number, H: number, p: number) {
  const rowH = 16
  const scale = Math.min(1, W / 900)
  const opening = smooth(0.4, 0.97, p)
  let d = ''

  for (let r = 0; r < Math.ceil(H / rowH); r++) {
    const y = r * rowH
    const width = lerp(40, 150, hash(r, 71)) * scale
    const offset = hash(r, 8)
    let runStart = -1

    const flush = (end: number) => {
      if (runStart < 0) return
      const x0 = Math.max(0, runStart)
      const x1 = Math.min(W, end)
      if (x1 > x0) d += `M${x0.toFixed(1)} ${y}h${(x1 - x0).toFixed(1)}v${rowH}h${(x0 - x1).toFixed(1)}z`
      runStart = -1
    }

    for (let c = 0; c <= Math.ceil(W / width + offset); c++) {
      const left = (c - offset) * width
      const cluster = hash(Math.floor(left / 180) + 53, Math.floor(y / 90) + 53)
      const threshold = lerp(0.12, 0.94, 0.6 * hash(c + 23, r + 23) + 0.4 * cluster)
      const open = smooth(threshold - 0.1, threshold + 0.1, opening) >= 0.5
      if (!open && runStart < 0) runStart = left
      if (open) flush(left)
    }
    flush(W)
  }
  return d ? `path('${d}')` : 'polygon(0 0, 0 0, 0 0)'
}

export default function TearReveal({
  children,
  duration = 1800,
  intensity = 0.6,
  tint = '#9bbbc7',
  codeLines = DEFAULT_CODE,
  showCode = true,
  autoPlay,
  className = '',
}: TearRevealProps) {
  const pages = Children.toArray(children)
  const { ref, index, go } = usePager(pages.length, duration + 150, autoPlay)
  // `shown` is the page that is settled on screen; `tear` is a running transition
  const [shown, setShown] = useState(0)
  const [tear, setTear] = useState<{ from: number; to: number } | null>(null)
  const [beat, setBeat] = useState(0)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }))
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  // A new target page starts a tear from the page that is on screen
  useEffect(() => {
    if (index === shown || tear) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(index)
      return
    }
    setBeat(0)
    setTear({ from: shown, to: index })
  }, [index, shown, tear])

  // Step through the tear in beats, a layout change every ~50ms
  useEffect(() => {
    if (!tear) return
    const start = performance.now()
    let frame = 0
    let last = 0
    const tick = (now: number) => {
      const t = (now - start) / duration
      if (t >= 1) {
        setShown(tear.to)
        setTear(null)
        setBeat(0)
        return
      }
      const b = Math.floor(t * BEATS)
      if (b !== last) {
        last = b
        setBeat(b)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [tear, duration])

  const p = beat / BEATS
  const strength = smooth(0, 0.3, p)
  const active = !!tear && size.w > 0

  const fragments = useMemo(
    () => (active ? buildFragments(size.w, size.h, intensity, strength, beat, codeLines.length) : []),
    [active, size.w, size.h, intensity, strength, beat, codeLines.length],
  )
  const clip = useMemo(
    () => (active && p > 0.4 ? holePath(size.w, size.h, p) : undefined),
    [active, size.w, size.h, p],
  )

  // Every ribbon shows a displaced copy of the page it was cut from
  const copy = (page: ReactNode, left: number, top: number) => (
    <div
      aria-hidden
      inert
      className="pointer-events-none absolute"
      style={{ left, top, width: size.w, height: size.h }}
    >
      {page}
    </div>
  )

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={`relative size-full touch-none overflow-hidden bg-black outline-none ${className}`}
    >
      {tear ? (
        <>
          <div className="absolute inset-0">{pages[tear.to]}</div>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: clip, WebkitClipPath: clip }}
          >
            <div className="absolute inset-0">{pages[tear.from]}</div>
            {fragments.map((f) => {
              const plate = showCode && f.coarse && f.variation >= 0.3
              const dark = f.variation > 0.65
              return (
                <div
                  key={f.key}
                  className="absolute overflow-hidden"
                  style={{ left: f.x, top: f.y, width: f.w, height: f.h }}
                >
                  {copy(pages[tear.from], -(f.x + f.dx), -(f.y + f.dy))}
                  {!f.coarse && f.variation > 0.72 && (
                    <div
                      className="absolute inset-0 mix-blend-overlay"
                      style={{ background: tint, opacity: 0.45 }}
                    />
                  )}
                  {plate && (
                    <div
                      className="absolute inset-0 overflow-hidden font-mono font-semibold"
                      style={{
                        background: dark
                          ? 'rgba(7, 24, 33, 0.88)'
                          : `color-mix(in srgb, ${tint} 85%, transparent)`,
                        color: dark ? '#cfe8f1' : '#0a2430',
                        fontSize: Math.max(9, f.h * 0.5),
                        lineHeight: `${f.h}px`,
                        whiteSpace: 'pre',
                      }}
                    >
                      <span className="absolute top-0" style={{ left: -((f.variation * 997) % 160) }}>
                        {codeLines[f.line]}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="size-full">{pages[shown]}</div>
      )}
      <PageDots count={pages.length} index={index} onSelect={go} />
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
