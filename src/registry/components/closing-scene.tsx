import { useEffect, useRef, useState } from 'react'

interface ClosingSceneProps {
  /** The first line, dark on the orange */
  lead?: string
  /** The second line, which is all that's left at the end */
  emphasis?: string
  buttonLabel?: string
  buttonHref?: string
  /** Extra scroll distance, in screens */
  hold?: number
  /** Called instead of following the link, so a router can handle it */
  onLink?: (href: string) => void
  /** Play the scene by itself (for small previews) */
  autoPlay?: boolean
  className?: string
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

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
        setState((s) => ({ ...s, p: clamp(((now - start) % 9500) / 7500) }))
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
      setState({ p: clamp((top - r.top) / Math.max(1, r.height - vh)), vh })
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

// A closing line on a pinned screen. Both lines fade in on orange, then night
// slides down over the screen, the first line melts away and the second is
// lit from below like a sunrise.
export default function ClosingScene({
  lead = 'Stop guessing,',
  emphasis = 'start deciding.',
  buttonLabel = 'Get started',
  buttonHref = '#',
  hold = 2.3,
  autoPlay = false,
  onLink,
  className = '',
}: ClosingSceneProps) {
  const section = useRef<HTMLElement>(null)
  const { p, vh } = useSceneProgress(section, autoPlay)
  const appear = smooth(0, 0.14, p)
  // The dark panel sweeps down the screen. Where its edge is, the first line
  // is covered and the second line is revealed, in the very same spot.
  const night = smooth(0.34, 0.74, p)
  const sunrise = smooth(0.74, 0.96, p)
  const cta = smooth(0.9, 1, p)

  return (
    <section
      ref={section}
      className={`@container relative w-full bg-[#e8500e] ${className}`}
      style={{ height: autoPlay ? '100%' : `${vh * (1 + hold)}px`, minHeight: autoPlay ? 280 : undefined }}
    >
      <div className="grain overflow-hidden" style={{ position: autoPlay ? 'relative' : 'sticky', top: 0, height: autoPlay ? '100%' : vh }}>
        <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, #ff7a2e, #e8500e 60%, #d4410a)' }} />
        <div aria-hidden className="absolute inset-0 bg-[#140a05]" style={{ transform: `translateY(${(night - 1) * 100}%)` }} />
        <div
          aria-hidden
          className="absolute inset-x-[-10%] bottom-[-35%] h-[85%]"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 100%, #ff5b14, #c2410c 45%, rgba(194,65,12,0) 72%)', opacity: sunrise, transform: `translateY(${(1 - sunrise) * 30}%)`, filter: 'blur(8px)' }}
        />
        <h2 className="absolute inset-0 grid place-items-center px-4 text-center text-[clamp(1.5rem,9.5cqw,6.4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          <span className="sr-only">
            {lead} {emphasis}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 grid place-items-center px-4 text-[#1a0e08]"
            style={{ opacity: appear, filter: `blur(${(1 - appear) * 6}px)`, clipPath: `inset(${night * 100}% 0 0 0)` }}
          >
            {lead}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 grid place-items-center px-4 text-[#fff6ef]"
            style={{ clipPath: `inset(0 0 ${(1 - night) * 100}% 0)` }}
          >
            {emphasis}
          </span>
        </h2>
        <a
          href={buttonHref}
          onClick={onLink ? (e) => { e.preventDefault(); onLink(buttonHref) } : undefined}
          className="absolute bottom-[14%] left-1/2 inline-flex h-12 -translate-x-1/2 items-center gap-2 rounded-[13px] bg-[#fff6ef] px-6 font-medium text-[#1a0e08] shadow-[0_14px_30px_-14px_rgba(255,91,20,.6)]"
          style={{ opacity: cta, pointerEvents: cta > 0.6 ? 'auto' : 'none', transform: `translate(-50%, ${(1 - cta) * 16}px)` }}
        >
          {buttonLabel}
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  )
}
