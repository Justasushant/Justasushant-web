import { useEffect, useRef } from 'react'

interface WebShooterProps {
  /** Colour of the webs */
  webColor?: string
  /** Colour of the spider */
  spiderColor?: string
  /** Seconds before a web fades away */
  lifetime?: number
  /** Show the spider on its thread */
  spider?: boolean
  /** Pop a comic sound effect where each web lands */
  sound?: boolean
  /** Shoot a web at a random spot every n ms (0 = only on click) */
  autoShoot?: number
  className?: string
}

interface Web {
  x: number
  y: number
  fromX: number
  born: number
  size: number
  spokes: { a: number; len: number }[]
  dew: { s: number; r: number }[]
  word: string
  tilt: number
}

interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
  born: number
}

const SHOOT_MS = 150
const WORDS = ['THWIP!', 'THWIP!', 'THWIP!', 'SPLAT!']

// Click to shoot a web, Spider-Man style: a strand fires from the wrist (the
// nearest bottom corner) and splats into an orb web. Click and drag to string
// a taut line between two points. The spider abseils down to check your work.
export default function WebShooter({
  webColor = '#f4f4f5',
  spiderColor = '#e11d48',
  lifetime = 5,
  spider = true,
  sound = true,
  autoShoot = 0,
  className = '',
}: WebShooterProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const webs: Web[] = []
    const lines: Line[] = []
    const pointer = { x: -1, y: -1 }
    const hang = { x: 0, y: 70, vx: 0, vy: 0 }
    let drag: { x: number; y: number; moved: boolean } | null = null
    let w = 0
    let h = 0
    let raf = 0

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!hang.x) hang.x = w * 0.72
    }

    const shoot = (x: number, y: number) => {
      const count = 11 + Math.floor(Math.random() * 4)
      const size = 46 + Math.random() * 40
      webs.push({
        x,
        y,
        fromX: x < w / 2 ? -10 : w + 10,
        born: performance.now(),
        size,
        spokes: Array.from({ length: count }, (_, i) => ({
          a: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.35,
          len: 0.8 + Math.random() * 0.4,
        })),
        dew: Array.from({ length: 6 }, () => ({ s: Math.random(), r: 0.3 + Math.random() * 0.6 })),
        word: WORDS[Math.floor(Math.random() * WORDS.length)],
        tilt: (Math.random() - 0.5) * 0.4,
      })
      if (webs.length > 20) webs.shift()
    }

    const fadeFor = (born: number, now: number) => Math.max(0, Math.min(1, lifetime - (now - born) / 1000))

    // A silk thread with a slight sag
    const strand = (x1: number, y1: number, x2: number, y2: number, sag: number) => {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 + sag, x2, y2)
      ctx.stroke()
    }

    const drawWeb = (web: Web, now: number) => {
      const alpha = fadeFor(web.born, now)
      if (alpha <= 0) return false
      const t = Math.min(1, (now - web.born) / SHOOT_MS)
      ctx.globalAlpha = alpha
      ctx.strokeStyle = webColor
      ctx.lineWidth = 1.4
      // The shot itself, from the wrist to the target
      const tipX = web.fromX + (web.x - web.fromX) * t
      const tipY = h + 10 + (web.y - h - 10) * t
      const since = now - web.born - SHOOT_MS
      strand(web.fromX, h + 10, tipX, tipY, t < 1 ? 0 : Math.min(26, since / 10))
      if (t < 1) return true
      const grow = Math.min(1, since / 240)
      const wobble = Math.sin(since / 40) * Math.exp(-since / 350) * 0.1
      const s = web.size * grow * (1 + wobble)
      // Impact flash
      if (since < 200) {
        ctx.globalAlpha = alpha * (1 - since / 200)
        ctx.beginPath()
        ctx.arc(web.x, web.y, s * 0.9 + since * 0.2, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = alpha
      }
      const point = (a: number, r: number) => [web.x + Math.cos(a) * r, web.y + Math.sin(a) * r]
      ctx.lineWidth = 1.1
      for (const spoke of web.spokes) {
        const [x, y] = point(spoke.a, s * spoke.len)
        ctx.beginPath()
        ctx.moveTo(web.x, web.y)
        ctx.lineTo(x, y)
        ctx.stroke()
      }
      // A spiral of silk winding out from the hub, sagging between spokes
      ctx.lineWidth = 0.8
      ctx.beginPath()
      const turns = 5
      const n = web.spokes.length
      for (let k = 0; k <= turns * n; k++) {
        const spoke = web.spokes[k % n]
        const next = web.spokes[(k + 1) % n]
        const r1 = s * spoke.len * (0.12 + (0.86 * k) / (turns * n))
        const r2 = s * next.len * (0.12 + (0.86 * (k + 1)) / (turns * n))
        const a2 = next.a + (k % n === n - 1 ? Math.PI * 2 : 0)
        const [x1, y1] = point(spoke.a, r1)
        const [x2, y2] = point(a2, r2)
        const [mx, my] = point((spoke.a + a2) / 2, ((r1 + r2) / 2) * 0.88)
        if (k === 0) ctx.moveTo(x1, y1)
        if (k < turns * n) ctx.quadraticCurveTo(mx, my, x2, y2)
      }
      ctx.stroke()
      // Dew drops catching the light
      ctx.fillStyle = webColor
      for (const d of web.dew) {
        const spoke = web.spokes[Math.floor(d.s * n)]
        const [x, y] = point(spoke.a, s * spoke.len * d.r)
        ctx.globalAlpha = alpha * 0.9
        ctx.beginPath()
        ctx.arc(x, y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.arc(web.x, web.y, 3 * grow, 0, Math.PI * 2)
      ctx.fill()
      if (sound && since < 650) {
        const pop = Math.min(1, since / 110)
        ctx.save()
        ctx.globalAlpha = Math.min(1, (650 - since) / 220)
        ctx.translate(web.x, web.y - s - 14)
        ctx.rotate(web.tilt)
        ctx.scale(pop, pop)
        ctx.font = 'italic 900 22px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.lineJoin = 'round'
        ctx.lineWidth = 5
        ctx.strokeStyle = '#09090b'
        ctx.strokeText(web.word, 0, 0)
        ctx.fillStyle = '#facc15'
        ctx.fillText(web.word, 0, 0)
        ctx.restore()
      }
      ctx.globalAlpha = 1
      return true
    }

    const drawLine = (line: Line, now: number) => {
      const alpha = fadeFor(line.born, now)
      if (alpha <= 0) return false
      const since = now - line.born
      // Twangs when it lands, then pulls tight
      const twang = Math.sin(since / 30) * Math.exp(-since / 250) * 14
      ctx.globalAlpha = alpha
      ctx.strokeStyle = webColor
      ctx.lineWidth = 1.6
      strand(line.x1, line.y1, line.x2, line.y2, twang)
      ctx.fillStyle = webColor
      for (const [x, y] of [
        [line.x1, line.y1],
        [line.x2, line.y2],
      ]) {
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      return true
    }

    const drawSpider = (now: number) => {
      // The spider abseils down to the newest web, otherwise hangs near the cursor
      const latest = webs.length && fadeFor(webs[webs.length - 1].born, now) > 0.3 ? webs[webs.length - 1] : null
      const tx = latest ? latest.x : pointer.x >= 0 ? pointer.x : w * 0.72 + Math.sin(now / 1500) * w * 0.12
      const ty = latest ? latest.y - 6 : pointer.y >= 0 ? Math.max(50, Math.min(h * 0.6, pointer.y - 50)) : h * 0.3
      hang.vx = (hang.vx + (tx - hang.x) * 0.015) * 0.9
      hang.vy = (hang.vy + (ty - hang.y) * 0.02) * 0.88
      hang.x += hang.vx
      hang.y += hang.vy
      ctx.strokeStyle = webColor
      ctx.globalAlpha = 0.55
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(hang.x - hang.vx * 8, 0)
      ctx.lineTo(hang.x, hang.y - 8)
      ctx.stroke()
      ctx.globalAlpha = 1
      const walking = Math.hypot(hang.vx, hang.vy) > 0.3
      ctx.save()
      ctx.translate(hang.x, hang.y)
      ctx.rotate(Math.max(-0.4, Math.min(0.4, hang.vx * 0.05)))
      ctx.strokeStyle = spiderColor
      ctx.lineWidth = 1.8
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      for (const side of [-1, 1]) {
        for (let i = 0; i < 4; i++) {
          const wig = walking ? Math.sin(now / 70 + i * 1.6 + side) * 3 : Math.sin(now / 600 + i) * 0.8
          const y = -2 + i * 3.2
          ctx.beginPath()
          ctx.moveTo(side * 3, y)
          ctx.lineTo(side * 11, y - 7 + i * 2 + wig)
          ctx.lineTo(side * (16 + (i === 0 || i === 3 ? 2 : 0)), y + 3 + i * 2.5 + wig)
          ctx.stroke()
        }
      }
      ctx.fillStyle = spiderColor
      ctx.beginPath()
      ctx.ellipse(0, 9, 6.5, 8.5, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(0, -2, 4.5, 4, 0, 0, Math.PI * 2)
      ctx.fill()
      // Hourglass marking and eyes
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.beginPath()
      ctx.moveTo(-2.5, 5)
      ctx.lineTo(2.5, 5)
      ctx.lineTo(-2.5, 13)
      ctx.lineTo(2.5, 13)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = '#fff'
      for (const ex of [-1.8, 1.8]) {
        ctx.beginPath()
        ctx.ellipse(ex, -3, 1.2, 1.6, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    const frame = (now: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'
      for (let i = lines.length - 1; i >= 0; i--) if (!drawLine(lines[i], now)) lines.splice(i, 1)
      for (let i = webs.length - 1; i >= 0; i--) if (!drawWeb(webs[i], now)) webs.splice(i, 1)
      // The line you're stretching right now
      if (drag && drag.moved) {
        ctx.strokeStyle = webColor
        ctx.globalAlpha = 0.8
        ctx.setLineDash([4, 4])
        strand(drag.x, drag.y, pointer.x, pointer.y, 10)
        ctx.setLineDash([])
        ctx.globalAlpha = 1
      }
      if (spider) drawSpider(now)
      raf = requestAnimationFrame(frame)
    }

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top]
    }
    const onDown = (e: PointerEvent) => {
      const [x, y] = local(e)
      drag = { x, y, moved: false }
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      ;[pointer.x, pointer.y] = local(e)
      if (drag && Math.hypot(pointer.x - drag.x, pointer.y - drag.y) > 12) drag.moved = true
    }
    const onUp = (e: PointerEvent) => {
      if (!drag) return
      const [x, y] = local(e)
      if (drag.moved) lines.push({ x1: drag.x, y1: drag.y, x2: x, y2: y, born: performance.now() })
      else shoot(x, y)
      if (lines.length > 12) lines.shift()
      drag = null
    }
    const onLeave = () => {
      pointer.x = pointer.y = -1
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointerleave', onLeave)
    const timer = autoShoot
      ? setInterval(() => shoot(w * (0.15 + Math.random() * 0.7), h * (0.2 + Math.random() * 0.45)), autoShoot)
      : undefined
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(timer)
      observer.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [webColor, spiderColor, lifetime, spider, sound, autoShoot])

  return <canvas ref={ref} className={`absolute inset-0 size-full cursor-crosshair touch-none ${className}`} />
}
