import { useEffect, useRef } from 'react'

interface WebHeroProps {
  title?: string
  /** A word in the title to colour in */
  highlight?: string
  subtitle?: string
  cta?: string
  secondaryCta?: string
  /** Accent colour: the spider, the highlight and the button */
  color?: string
  /** Colour of the silk */
  silk?: string
  className?: string
}

interface Node {
  x: number
  y: number
  px: number
  py: number
  pinned: boolean
}

interface Link {
  a: number
  b: number
  len: number
  ring: number // 0 for spokes, 1+ for the spiral rings (inner to outer)
  step: number // how far along its spoke a segment is, for the spin-in reveal
}

const SPOKES = 18
const RINGS = 15

// A Spider-Man style hero. Behind the headline hangs a real orb web, simulated
// strand by strand: brush it with your cursor, click to pluck it, and watch
// the silk catch the light. The spider at the hub keeps an eye on you.
export default function WebHero({
  title = 'Your friendly neighbourhood developer.',
  highlight = 'neighbourhood',
  subtitle = 'I build interfaces that hold together under pressure, and still look good doing it.',
  cta = 'See the work',
  secondaryCta = 'Get in touch',
  color = '#e11d48',
  silk = '#dbe4f0',
  className = '',
}: WebHeroProps) {
  const root = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = root.current
    const cv = canvas.current
    const ctx = cv?.getContext('2d')
    if (!el || !cv || !ctx) return
    let w = 0
    let h = 0
    let raf = 0
    let nodes: Node[] = []
    let links: Link[] = []
    let dew: number[] = []
    let hub = 0
    let born = performance.now()
    const pointer = { x: -999, y: -999, dx: 0, dy: 0, active: false }
    let facing = Math.PI / 2

    // Spin a fresh web for the current size
    const build = () => {
      nodes = []
      links = []
      const narrow = w < 640
      const hx = w * (narrow ? 0.5 : 0.7)
      const hy = h * (narrow ? 0.3 : 0.42)
      const reach = Math.min(w, h) * (narrow ? 0.42 : 0.46)
      const add = (x: number, y: number, pinned = false) => nodes.push({ x, y, px: x, py: y, pinned }) - 1
      const tie = (a: number, b: number, ring: number, step: number) => {
        const d = Math.hypot(nodes[b].x - nodes[a].x, nodes[b].y - nodes[a].y)
        // Rest lengths a touch shorter than the strands, so the silk is taut
        links.push({ a, b, len: d * (ring ? 0.97 : 0.985), ring, step })
      }
      hub = add(hx, hy)
      const grid: number[][] = []
      for (let i = 0; i < SPOKES; i++) {
        const a = (i / SPOKES) * Math.PI * 2 + (Math.random() - 0.5) * 0.18
        const dx = Math.cos(a)
        const dy = Math.sin(a)
        // Where this spoke meets the edge (a little past it, so the ends are hidden)
        const tx = dx > 0 ? (w + 30 - hx) / dx : dx < 0 ? (-30 - hx) / dx : Infinity
        const ty = dy > 0 ? (h + 30 - hy) / dy : dy < 0 ? (-30 - hy) / dy : Infinity
        const edge = Math.min(tx, ty)
        const room = Math.min(reach * (0.9 + Math.random() * 0.2), edge * 0.85)
        const column: number[] = []
        let prev = hub
        for (let j = 1; j <= RINGS; j++) {
          const r = 16 + (room - 16) * (j / RINGS)
          const id = add(hx + dx * r, hy + dy * r)
          tie(prev, id, 0, j)
          column.push(id)
          prev = id
        }
        const anchor = add(hx + dx * edge, hy + dy * edge, true)
        tie(prev, anchor, 0, RINGS + 1)
        grid.push(column)
      }
      for (let j = 0; j < RINGS; j++) for (let i = 0; i < SPOKES; i++) tie(grid[i][j], grid[(i + 1) % SPOKES][j], j + 1, j + 1)
      dew = Array.from({ length: 28 }, () => grid[Math.floor(Math.random() * SPOKES)][3 + Math.floor(Math.random() * (RINGS - 3))])
      born = performance.now()
    }

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = el.clientWidth
      h = el.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const simulate = () => {
      for (const n of nodes) {
        if (n.pinned) continue
        const vx = (n.x - n.px) * 0.97
        const vy = (n.y - n.py) * 0.97
        n.px = n.x
        n.py = n.y
        n.x += vx
        n.y += vy + 0.012
      }
      // Brushing past the web drags the nearby strands along with the cursor
      if (pointer.active && (pointer.dx || pointer.dy)) {
        const dx = Math.max(-25, Math.min(25, pointer.dx))
        const dy = Math.max(-25, Math.min(25, pointer.dy))
        for (const n of nodes) {
          if (n.pinned) continue
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y)
          if (d < 80) {
            const f = (1 - d / 80) ** 2 * 0.3
            n.x += dx * f
            n.y += dy * f
          }
        }
        pointer.dx = pointer.dy = 0
      }
      // Silk is like rope: it pulls when stretched but never pushes
      for (let k = 0; k < 4; k++) {
        for (const l of links) {
          const a = nodes[l.a]
          const b = nodes[l.b]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const d = Math.hypot(dx, dy) || 1
          if (d <= l.len) continue
          const pull = ((d - l.len) / d) * (l.ring ? 0.4 : 0.5)
          if (!a.pinned && !b.pinned) {
            a.x += dx * pull
            a.y += dy * pull
            b.x -= dx * pull
            b.y -= dy * pull
          } else if (!a.pinned) {
            a.x += dx * pull * 2
            a.y += dy * pull * 2
          } else if (!b.pinned) {
            b.x -= dx * pull * 2
            b.y -= dy * pull * 2
          }
        }
      }
    }

    // Light catches the silk near the cursor
    const glow = (x: number, y: number) => Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 190)

    const drawSpider = (x: number, y: number, now: number) => {
      const target = pointer.active ? Math.atan2(pointer.y - y, pointer.x - x) : Math.PI / 2
      let diff = target - facing
      diff = Math.atan2(Math.sin(diff), Math.cos(diff))
      facing += diff * 0.06
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(facing)
      ctx.scale(2.2, 2.2)
      ctx.strokeStyle = color
      ctx.lineWidth = 1.3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      // Four legs a side, front pair reaching forward, back pair trailing
      for (const side of [-1, 1]) {
        for (let i = 0; i < 4; i++) {
          const twitch = Math.sin(now / 900 + i * 1.7 + side) * 0.8
          const hipX = 3 - i * 1.6
          const reachX = [9, 4, -3, -9][i]
          ctx.beginPath()
          ctx.moveTo(hipX, side * 1.5)
          ctx.lineTo(hipX + reachX * 0.45, side * (9 + twitch))
          ctx.lineTo(hipX + reachX, side * (14 + i * 0.6))
          ctx.stroke()
        }
      }
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.ellipse(-7, 0, 7.5, 5.5, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(2.5, 0, 4.5, 3.6, 0, 0, Math.PI * 2)
      ctx.fill()
      // A pale web mark on the back and two bright eyes
      ctx.strokeStyle = 'rgba(255,255,255,0.45)'
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.moveTo(-12, 0)
      ctx.lineTo(-2, 0)
      ctx.moveTo(-7, -4)
      ctx.lineTo(-7, 4)
      ctx.stroke()
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(5, -1.3, 0.9, 0, Math.PI * 2)
      ctx.arc(5, 1.3, 0.9, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const frame = (now: number) => {
      simulate()
      ctx.clearRect(0, 0, w, h)
      // The web spins itself in: spokes first, then the rings from the hub out
      const t = Math.min(1, (now - born) / 2200)
      const spokesShown = Math.min(1, t / 0.35) * (RINGS + 1)
      const ringsShown = Math.max(0, (t - 0.3) / 0.7) * RINGS
      ctx.strokeStyle = silk
      ctx.lineCap = 'round'
      for (const l of links) {
        if (l.ring ? l.ring > ringsShown : l.step > spokesShown) continue
        const a = nodes[l.a]
        const b = nodes[l.b]
        const lit = glow((a.x + b.x) / 2, (a.y + b.y) / 2)
        ctx.globalAlpha = (l.ring ? 0.22 : 0.34) + lit * 0.6
        ctx.lineWidth = l.ring ? 0.7 : 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
      // Dew drops that glint
      ctx.fillStyle = silk
      dew.forEach((id, i) => {
        const n = nodes[id]
        if (t < 0.9) return
        ctx.globalAlpha = (0.35 + Math.sin(now / 420 + i * 2.3) * 0.25) + glow(n.x, n.y) * 0.6
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = Math.min(1, Math.max(0, (t - 0.25) / 0.3))
      drawSpider(nodes[hub].x, nodes[hub].y, now)
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    const local = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top]
    }
    const onMove = (e: PointerEvent) => {
      const [x, y] = local(e)
      if (pointer.active) {
        pointer.dx += x - pointer.x
        pointer.dy += y - pointer.y
      }
      pointer.x = x
      pointer.y = y
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
      pointer.x = pointer.y = -999
    }
    // Pluck: a click flicks the strands near it outward
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) return
      const [x, y] = local(e)
      for (const n of nodes) {
        if (n.pinned) continue
        const d = Math.hypot(n.x - x, n.y - y) || 1
        if (d < 150) {
          const f = (1 - d / 150) * 16
          n.x += ((n.x - x) / d) * f
          n.y += ((n.y - y) / d) * f
        }
      }
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(el)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerdown', onDown)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerdown', onDown)
    }
  }, [color, silk])

  // Split the title around the highlighted word
  const lit = Boolean(highlight) && title.includes(highlight)
  const at = lit ? title.indexOf(highlight) : title.length
  const before = title.slice(0, at)
  const after = lit ? title.slice(at + highlight.length) : ''

  return (
    <section
      ref={root}
      className={`relative isolate flex h-full min-h-[560px] w-full items-center overflow-hidden px-8 py-20 sm:px-14 ${className}`}
      style={{ background: 'radial-gradient(ellipse at 70% 40%, #1a2036 0%, #0a0d16 55%, #050609 100%)' }}
    >
      <style>{`@keyframes web-hero-rise { from { opacity: 0; transform: translateY(18px) } }`}</style>
      {/* City lights far below, out of focus */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40">
        {Array.from({ length: 22 }, (_, i) => (
          <span
            key={i}
            className="absolute rounded-full blur-md"
            style={{
              left: `${(i * 47) % 100}%`,
              bottom: `${(i * 31) % 60}%`,
              width: 6 + ((i * 13) % 14),
              height: 6 + ((i * 13) % 14),
              background: i % 5 === 0 ? color : i % 3 === 0 ? '#fbbf24' : '#93c5fd',
              opacity: 0.25 + ((i * 7) % 5) / 20,
            }}
          />
        ))}
      </div>
      <canvas ref={canvas} aria-hidden className="absolute inset-0 -z-10 size-full" />
      <div className="relative max-w-xl">
        <p
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-slate-400"
          style={{ animation: 'web-hero-rise 0.7s ease-out both' }}
        >
          <span className="h-px w-10" style={{ background: color }} />
          Issue 01 · Origins
        </p>
        <h1
          className="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl"
          style={{ animation: 'web-hero-rise 0.8s ease-out 0.1s both' }}
        >
          {before}
          {lit && <span style={{ color }}>{highlight}</span>}
          {after}
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400" style={{ animation: 'web-hero-rise 0.8s ease-out 0.2s both' }}>
          {subtitle}
        </p>
        <div className="mt-9 flex flex-wrap gap-3" style={{ animation: 'web-hero-rise 0.8s ease-out 0.3s both' }}>
          <a
            href="#work"
            className="rounded-md px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: color, boxShadow: `0 10px 30px -10px ${color}` }}
          >
            {cta}
          </a>
          <a
            href="#contact"
            className="rounded-md border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            {secondaryCta}
          </a>
        </div>
        <p className="mt-10 font-mono text-[11px] text-slate-500" style={{ animation: 'web-hero-rise 0.8s ease-out 0.4s both' }}>
          Brush the web with your cursor · click to pluck it
        </p>
      </div>
    </section>
  )
}
