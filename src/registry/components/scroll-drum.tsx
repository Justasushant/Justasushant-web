import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface DrumItem {
  /** Wrap a word in *stars* to set it in italics */
  name: string
  /** Shown bottom right while this row is in the middle */
  caption: string
  /** Makes the dealt card a link */
  href?: string
}

interface ScrollDrumProps {
  items: DrumItem[]
  eyebrow?: string
  /** One string per line of the heading */
  title?: string[]
  lede?: ReactNode
  /** How many cards are dealt at the end (0 hides them) */
  dealt?: number
  closing?: string
  buttonLabel?: string
  buttonHref?: string
  /** Extra scroll distance, in screens */
  hold?: number
  /** Turn the drum by itself instead of following the scroll (for small previews) */
  autoPlay?: boolean
  /** Called instead of following a link, so a router can handle it */
  onLink?: (href: string) => void
  /** Colour of the row in the middle */
  accent?: string
  className?: string
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

// How bright a row is, by how far it is from the middle. The rows next to the
// middle are held back so the one in the middle stands out.
const FADE: [number, number][] = [[0, 1], [0.35, 1], [1, 0.31], [2, 0.97], [3, 0.79], [4, 0.41], [5, 0]]
const brightness = (d: number) => {
  for (let i = 1; i < FADE.length; i++) {
    if (d <= FADE[i][0]) {
      const [d0, o0] = FADE[i - 1]
      const [d1, o1] = FADE[i]
      return o0 + ((o1 - o0) * (d - d0)) / (d1 - d0)
    }
  }
  return 0
}

// Finds what scrolls the page: the nearest scrolling parent, or the window
function scroller(el: HTMLElement | null): HTMLElement | null {
  for (let node = el?.parentElement; node; node = node.parentElement) {
    const o = getComputedStyle(node).overflowY
    if (o === 'auto' || o === 'scroll') return node
  }
  return null
}

// 0 to 1 while the tall section scrolls past its pinned stage
function useSceneProgress(ref: React.RefObject<HTMLElement | null>, auto: boolean) {
  const [state, setState] = useState({ p: 0, vh: 800 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (auto) {
      let raf = 0
      const start = performance.now()
      const loop = (now: number) => {
        // Eight seconds of turning, then a short rest before it starts over
        const t = ((now - start) % 10500) / 8500
        setState((s) => ({ ...s, p: clamp(t) }))
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      return () => cancelAnimationFrame(raf)
    }
    const root = scroller(el)
    let raf = 0
    const update = () => {
      raf = 0
      const vh = root ? root.clientHeight : window.innerHeight
      const top = root ? root.getBoundingClientRect().top : 0
      const r = el.getBoundingClientRect()
      const range = Math.max(1, r.height - vh)
      setState({ p: clamp((top - r.top) / range), vh })
    }
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    const target: HTMLElement | Window = root ?? window
    target.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    const observer = new ResizeObserver(request)
    observer.observe(root ?? document.documentElement)
    return () => {
      cancelAnimationFrame(raf)
      target.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      observer.disconnect()
    }
  }, [ref, auto])

  return state
}

const italics = (text: string) =>
  text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))

// A slot-machine drum for your scroll. The rows sit on a 3D cylinder that
// turns as the page scrolls; the row in the middle lights up, a counter rolls
// and a few cards are dealt at the end.
export default function ScrollDrum({
  items,
  eyebrow = 'The draw',
  title = ['Twenty directions.', 'Three dealt per page.'],
  lede = 'Instead of the one average page, a script deals a few of these at random.',
  dealt = 0,
  closing = '',
  buttonLabel = '',
  buttonHref = '#',
  hold = 2.8,
  autoPlay = false,
  onLink,
  accent = '#e8500e',
  className = '',
}: ScrollDrumProps) {
  const section = useRef<HTMLElement>(null)
  const { p, vh } = useSceneProgress(section, autoPlay)
  const [size, setSize] = useState({ w: 1000, h: 800 })

  useEffect(() => {
    const el = section.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const width = size.w
  // Taller than the preview? Then the stage is as tall as what scrolls it
  const stageH = autoPlay ? size.h : vh
  const n = items.length
  const fs = clamp(Math.min(width * 0.068, stageH * 0.085), 18, 72)
  const step = 13.1579
  const radius = fs * 4.49
  const picks = dealt > 0 ? [...new Set([Math.round(n * 0.2), Math.round(n * 0.72), n - 1])].slice(0, dealt) : []
  const hasClose = picks.length > 0 || Boolean(closing) || Boolean(buttonLabel)
  const turn = clamp(p / (hasClose ? 0.88 : 1))
  const cur = turn * (n - 1)
  const active = Math.round(cur)
  const close = hasClose ? smooth(0.88, 1, p) : 0

  return (
    <section
      ref={section}
      className={`@container relative w-full bg-[#f8f4ee] text-[#1a0e08] ${className}`}
      style={{ height: autoPlay ? '100%' : `${vh * (1 + hold)}px`, minHeight: autoPlay ? 320 : undefined }}
    >
      <style>{`@keyframes scroll-drum-roll { from { opacity: 0; transform: translateY(0.6em) } }`}</style>
      <div className="relative overflow-hidden" style={{ position: autoPlay ? 'relative' : 'sticky', top: 0, height: autoPlay ? '100%' : vh }}>
        <header className="absolute inset-x-0 top-[7%] px-6 text-center" style={{ opacity: (1 - smooth(0, 0.07, p)) * (1 - close), transform: `translateY(${-close * 30}px)` }}>
          <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#c2410c]">
            <svg viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden>
              <rect x="1" y="4" width="6" height="12" rx="2" />
              <rect x="9" y="4" width="6" height="12" rx="2" opacity=".6" />
              <rect x="16" y="6" width="3" height="8" rx="1.5" opacity=".35" />
            </svg>
            {eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.1rem,5.2cqw,3rem)] font-semibold leading-[1.03] tracking-[-0.035em]">
            {title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          {stageH > 520 && <p className="mx-auto mt-3 max-w-lg text-[clamp(13px,1.5vw,17px)] text-[#1a0e08]/60">{lede}</p>}
        </header>
        <div className="absolute inset-0" style={{ perspective: fs * 11.2, transform: `translateY(${-close * stageH * 0.2}px)` }}>
          {/* The glow, the two rules and the arrows that frame the middle row */}
          <span aria-hidden className="absolute left-1/2 top-1/2 h-40 w-[110%] -translate-x-1/2 -translate-y-1/2" style={{ background: 'radial-gradient(closest-side, rgba(255,122,46,.14), rgba(255,122,46,.07) 48%, transparent)' }} />
          {[-1, 1].map((side) => (
            <span key={side} aria-hidden className="absolute left-[3%] right-[3%] h-px bg-[#1a0e08]/10" style={{ top: `calc(50% + ${side * fs * 0.68}px)` }} />
          ))}
          {[0, 1].map((side) => (
            <span
              key={side}
              aria-hidden
              className="absolute top-1/2 size-0 -translate-y-1/2 border-y-[6px] border-y-transparent"
              style={side ? { right: '2%', borderRight: `9px solid ${accent}` } : { left: '2%', borderLeft: `9px solid ${accent}` }}
            />
          ))}
          <ol className="absolute left-1/2 top-1/2 m-0 list-none p-0" style={{ transformStyle: 'preserve-3d', transform: `translateZ(${-radius}px) rotateX(${cur * step}deg)` }}>
            {items.map((item, i) => {
              const d = Math.abs(i - cur)
              const lit = 1 - smooth(0.15, 0.6, d)
              const style: CSSProperties = {
                position: 'absolute',
                left: 0,
                top: 0,
                width: width * 0.94,
                marginLeft: -width * 0.47,
                marginTop: -fs * 0.52,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                fontSize: fs,
                lineHeight: 1.03,
                fontWeight: 600,
                letterSpacing: '-0.035em',
                fontVariationSettings: '"ROND" 100',
                transform: `rotateX(${-i * step}deg) translateZ(${radius}px)`,
                opacity: brightness(d),
                color: `color-mix(in srgb, ${accent} ${Math.round(lit * 100)}%, #1a0e08)`,
                textShadow: lit > 0.5 ? `0 0 40px ${accent}55` : undefined,
                pointerEvents: 'none',
              }
              return (
                <li key={item.name} style={style}>
                  {italics(item.name)}
                </li>
              )
            })}
          </ol>
        </div>
        <p className="absolute bottom-[9%] left-[5%] text-[clamp(13px,1.6vw,20px)] font-medium text-[#1a0e08]/60" style={{ opacity: 1 - close }}>
          <span key={active} className="inline-block font-semibold" style={{ color: accent, animation: 'scroll-drum-roll 0.35s ease-out' }}>
            {active + 1}
          </span>{' '}
          of {n}
        </p>
        <p className="absolute bottom-[9%] right-[5%] text-[clamp(13px,1.6vw,20px)] font-medium" style={{ opacity: 1 - close }}>
          <span key={active} className="inline-block" style={{ animation: 'scroll-drum-roll 0.35s ease-out' }}>
            {items[active]?.caption}
          </span>
        </p>
        {picks.length > 0 && (
          <div className="absolute inset-x-0 bottom-[7%] flex flex-col items-center gap-5 px-4 text-center" style={{ opacity: close, transform: `translateY(${(1 - close) * 36}px)`, pointerEvents: close > 0.6 ? 'auto' : 'none' }}>
            <ol className="flex flex-wrap justify-center gap-3">
              {picks.map((index) => {
                const item = items[index]
                const card = (
                  <>
                    <span className="mr-2.5 font-semibold" style={{ color: accent }}>
                      {index + 1}
                    </span>
                    <span className="text-left">
                      <span className="block text-[15px] font-semibold leading-tight">{item.name.replace(/\*/g, '')}</span>
                      <span className="block text-[13px] text-[#1a0e08]/60">{item.caption}</span>
                    </span>
                  </>
                )
                const cls = 'flex items-center rounded-2xl bg-white px-5 py-3 shadow-[0_0_0_1px_rgba(20,10,5,.05),0_1px_2px_rgba(20,10,5,.04),0_18px_40px_-28px_rgba(80,30,5,.25)] transition-transform hover:-translate-y-0.5'
                return (
                  <li key={index}>
                    {item.href ? (
                      <a href={item.href} className={cls} onClick={onLink ? (e) => { e.preventDefault(); onLink(item.href!) } : undefined}>
                        {card}
                      </a>
                    ) : (
                      <div className={cls}>{card}</div>
                    )}
                  </li>
                )
              })}
            </ol>
            <p className="text-[clamp(1.1rem,2.4vw,1.7rem)] font-semibold tracking-[-0.03em]">{closing}</p>
            <a href={buttonHref} onClick={onLink ? (e) => { e.preventDefault(); onLink(buttonHref) } : undefined} className="inline-flex h-12 items-center gap-2 rounded-[13px] bg-[#1a0e08] px-6 font-medium text-white shadow-[0_1px_2px_rgba(20,10,5,.2),0_14px_30px_-16px_rgba(80,30,5,.55)]">
              {buttonLabel}
              <span aria-hidden>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
