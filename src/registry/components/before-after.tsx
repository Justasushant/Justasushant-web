import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

interface Step {
  title: string
  text: string
}

interface BeforeAfterProps {
  eyebrow?: string
  /** One string per line of the heading */
  title?: string[]
  /** Five steps: the default page, then four fixes */
  steps?: Step[]
  /** Extra scroll distance, in screens */
  hold?: number
  /** Step through the fixes by itself (for small previews) */
  autoPlay?: boolean
  accent?: string
  className?: string
}

const defaultSteps: Step[] = [
  { title: 'The default', text: 'A purple gradient, gradient text and three glass cards. The page every tool ships.' },
  { title: 'One palette', text: 'The gradient goes. A warm neutral and one dark accent carry the whole page.' },
  { title: 'Real type', text: 'Copy that says something, a tighter headline, and no buzzwords doing the talking.' },
  { title: 'Layout with intent', text: 'Left-aligned hierarchy and a real product preview instead of three filler cards.' },
  { title: 'The last 10%', text: 'A note under the button, real tags in the preview, a little depth where it helps.' },
]

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

function scroller(el: HTMLElement | null): HTMLElement | null {
  for (let node = el?.parentElement; node; node = node.parentElement) {
    const o = getComputedStyle(node).overflowY
    if (o === 'auto' || o === 'scroll') return node
  }
  return null
}

// 0 to 1 while the tall section scrolls past its pinned stage
function useSceneProgress(ref: React.RefObject<HTMLElement | null>, auto: boolean, steps: number) {
  const [state, setState] = useState({ p: 0, vh: 800, tick: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (auto) {
      const id = setInterval(() => setState((s) => ({ ...s, tick: s.tick + 1 })), 2200)
      return () => clearInterval(id)
    }
    const root = scroller(el)
    let raf = 0
    const update = () => {
      raf = 0
      const vh = root ? root.clientHeight : window.innerHeight
      const top = root ? root.getBoundingClientRect().top : 0
      const r = el.getBoundingClientRect()
      setState((s) => ({ ...s, p: clamp((top - r.top) / Math.max(1, r.height - vh)), vh }))
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
  }, [ref, auto, steps])

  return state
}

const cq = (n: number): CSSProperties => ({ fontSize: `${n}cqw` })

// The same small landing page in two moods: "slop" and "calm"
function Centered({ slop, real }: { slop: boolean; real: boolean }) {
  const cards = real
    ? [['Timers', '25 minutes, or whatever you pick.'], ['Streaks', 'Counts days, not guilt.'], ['Quiet', 'No sounds and no popups.']]
    : [['Lightning Fast', 'Experience blazing fast performance like never before.'], ['Super Secure', 'Your data is protected with enterprise-grade security.'], ['Beautiful Design', 'A stunning interface that you will absolutely love.']]
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: slop ? 'linear-gradient(135deg,#7c3aed,#4f46e5 50%,#c026d3)' : '#f8f4ee', color: slop ? '#fff' : '#1a0e08', padding: '3.2cqw 4cqw' }}
    >
      <div className="flex items-center justify-between" style={cq(1.5)}>
        <span className="font-semibold" style={cq(1.9)}>
          Tempo
        </span>
        <span className="flex gap-[2.4cqw] opacity-75">
          <span>Features</span>
          <span>Pricing</span>
          <span>About</span>
        </span>
        <span className="rounded-full px-[1.6cqw] py-[0.7cqw] font-medium" style={{ background: slop ? '#fff' : '#1a0e08', color: slop ? '#6d28d9' : '#fff', fontSize: '1.4cqw' }}>
          Get started
        </span>
      </div>
      <div className="mt-[3.2cqw] text-center">
        <p className="mx-auto font-extrabold leading-[1.08]" style={{ ...cq(slop ? 4.6 : 4.2), maxWidth: slop ? '72%' : '82%', letterSpacing: slop ? '-0.01em' : '-0.035em', fontWeight: slop ? 800 : 600 }}>
          {real ? (
            'Focus time that stays out of your way.'
          ) : (
            <>
              Revolutionize Your{' '}
              <span style={slop ? { backgroundImage: 'linear-gradient(90deg,#f472b6,#fde047)', WebkitBackgroundClip: 'text', color: 'transparent' } : undefined}>Focus</span> Experience
            </>
          )}
        </p>
        <p className="mx-auto mt-[1.4cqw] opacity-75" style={{ ...cq(1.55), maxWidth: '52%' }}>
          {real
            ? 'A timer, a streak counter and nothing else. Open it, press start, get on with your day.'
            : 'Unlock the power of AI-driven productivity with our cutting-edge, seamless and intuitive platform.'}
        </p>
        <div className="mt-[2cqw] flex justify-center gap-[1.2cqw]" style={cq(1.5)}>
          <span className="rounded-full px-[2.4cqw] py-[1cqw] font-semibold text-white" style={{ background: slop ? 'linear-gradient(90deg,#ec4899,#f97316)' : '#1a0e08' }}>
            {real ? 'Start a session' : 'Get Started Free'}
          </span>
          <span className="rounded-full px-[2.4cqw] py-[1cqw] font-semibold" style={{ boxShadow: `inset 0 0 0 1px ${slop ? 'rgba(255,255,255,.6)' : 'rgba(20,10,5,.18)'}` }}>
            {real ? 'See how it works' : 'Learn More'}
          </span>
        </div>
      </div>
      <div className="mt-[3.6cqw] grid grid-cols-3 gap-[1.6cqw]">
        {cards.map(([t, d]) => (
          <div
            key={t}
            className="text-center"
            style={{
              borderRadius: '1.6cqw',
              padding: '1.8cqw',
              background: slop ? 'rgba(255,255,255,.16)' : '#fff',
              backdropFilter: slop ? 'blur(6px)' : undefined,
              boxShadow: slop ? 'inset 0 0 0 1px rgba(255,255,255,.35)' : '0 0 0 1px rgba(20,10,5,.06)',
            }}
          >
            <span className="mx-auto block rounded-lg" style={{ width: '2.4cqw', height: '2.4cqw', background: slop ? 'linear-gradient(135deg,#f472b6,#fbbf24)' : '#e8500e' }} />
            <p className="mt-[0.8cqw] font-semibold" style={cq(1.6)}>
              {t}
            </p>
            <p className="mt-[0.4cqw] opacity-70" style={cq(1.25)}>
              {d}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// The finished page: left-aligned text and a real product preview
function Split({ polish }: { polish: boolean }) {
  const rows = ['Outline the essay', 'Review pricing page', 'Call with Dana']
  return (
    <div className="absolute inset-0" style={{ background: '#f8f4ee', color: '#1a0e08', padding: '3.2cqw 4cqw' }}>
      <div className="flex items-center justify-between" style={cq(1.5)}>
        <span className="font-semibold" style={cq(1.9)}>
          Tempo
        </span>
        <span className="flex items-center gap-[2.4cqw]">
          <span className="opacity-70">Features</span>
          <span className="opacity-70">Pricing</span>
          <span className="rounded-full px-[1.6cqw] py-[0.7cqw] font-medium text-white" style={{ background: '#1a0e08', fontSize: '1.4cqw' }}>
            Get started
          </span>
        </span>
      </div>
      <div className="absolute" style={{ left: '4cqw', top: '17cqw', width: '40cqw' }}>
        <p className="font-semibold leading-[1.08]" style={{ ...cq(4.2), letterSpacing: '-0.035em' }}>
          Focus time that stays out of your way.
        </p>
        <p className="mt-[1.6cqw] opacity-70" style={cq(1.5)}>
          A timer, a streak counter and nothing else. Open it, press start, get on with your day.
        </p>
        <div className="mt-[2cqw] flex gap-[1.2cqw]" style={cq(1.5)}>
          <span className="rounded-[0.9cqw] px-[2.2cqw] py-[1cqw] font-medium text-white" style={{ background: '#1a0e08' }}>
            Start a session
          </span>
          <span className="rounded-[0.9cqw] px-[2.2cqw] py-[1cqw] font-medium" style={{ boxShadow: 'inset 0 0 0 1px rgba(20,10,5,.18)' }}>
            See how it works
          </span>
        </div>
        <p className="mt-[1.4cqw] opacity-0 transition-opacity duration-700" style={{ ...cq(1.2), opacity: polish ? 0.55 : 0 }}>
          Free for personal use. No card needed.
        </p>
      </div>
      <div className="absolute" style={{ right: '4cqw', top: '13cqw', width: '38cqw' }}>
        <div
          aria-hidden
          className="absolute transition-all duration-700"
          style={{ inset: polish ? '-2.4cqw -2.4cqw -2.4cqw -2.4cqw' : '0', background: '#ffd9bd', borderRadius: '2.6cqw', opacity: polish ? 1 : 0, transform: polish ? 'translate(1.4cqw,1.4cqw)' : 'none' }}
        />
        <div className="relative bg-white" style={{ borderRadius: '1.8cqw', padding: '2cqw', boxShadow: polish ? '0 0 0 1px rgba(20,10,5,.06), 0 3cqw 5cqw -2.4cqw rgba(80,30,5,.35)' : '0 0 0 1px rgba(20,10,5,.08)', transition: 'box-shadow .7s' }}>
          <div className="flex items-baseline justify-between" style={cq(1.2)}>
            <span className="opacity-60">Today</span>
            <span className="transition-opacity duration-700" style={{ opacity: polish ? 0.5 : 0 }}>
              Edited 2m ago
            </span>
          </div>
          <p className="mt-[0.6cqw] font-semibold" style={{ ...cq(2.2), letterSpacing: '-0.03em' }}>
            Deep work · 24:12
          </p>
          <span className="mt-[1.2cqw] block h-[0.7cqw] overflow-hidden rounded-full" style={{ background: 'rgba(20,10,5,.08)' }}>
            <span className="block h-full w-[62%] rounded-full" style={{ background: '#e8500e' }} />
          </span>
          <ul className="mt-[1.6cqw] space-y-[0.9cqw]" style={cq(1.35)}>
            {rows.map((row, i) => (
              <li key={row} className="flex items-center gap-[1cqw]">
                <span className="grid place-items-center rounded-[0.4cqw]" style={{ width: '1.5cqw', height: '1.5cqw', background: i < 2 ? '#1a0e08' : 'transparent', boxShadow: i < 2 ? undefined : 'inset 0 0 0 1px rgba(20,10,5,.3)' }}>
                  {i < 2 && (
                    <svg viewBox="0 0 12 12" style={{ width: '1cqw' }} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                      <path d="m2.5 6.2 2.2 2.2 4.8-5" />
                    </svg>
                  )}
                </span>
                <span style={{ textDecoration: i < 2 ? 'line-through' : undefined, opacity: i < 2 ? 0.5 : 1 }}>{row}</span>
              </li>
            ))}
          </ul>
          <p className="mt-[1.6cqw] flex gap-[0.8cqw] transition-opacity duration-700" style={{ ...cq(1.1), opacity: polish ? 1 : 0 }}>
            {['#writing', '#deep'].map((tag) => (
              <span key={tag} className="rounded-full px-[1cqw] py-[0.3cqw]" style={{ background: '#f3eee7' }}>
                {tag}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

// A pinned scene that redesigns one page as you scroll, in five steps: from
// the default everyone ships to something that looks like someone decided.
export default function BeforeAfter({
  eyebrow = 'Before and after',
  title = ['From default', 'to designed.'],
  steps = defaultSteps,
  hold = 3,
  autoPlay = false,
  accent = '#e8500e',
  className = '',
}: BeforeAfterProps) {
  const section = useRef<HTMLElement>(null)
  const { p, vh, tick } = useSceneProgress(section, autoPlay, steps.length)
  const last = steps.length - 1
  const step = autoPlay ? tick % steps.length : Math.min(last, Math.floor(p * steps.length * 0.99))

  return (
    <section
      ref={section}
      className={`relative w-full bg-[#f8f4ee] text-[#1a0e08] ${className}`}
      style={{ height: autoPlay ? '100%' : `${vh * (1 + hold)}px`, minHeight: autoPlay ? 300 : undefined }}
    >
      <style>{`@keyframes before-after-chip { from { opacity: 0; transform: translateY(0.5em) } }`}</style>
      <div className="flex items-center overflow-hidden px-[5vw]" style={{ position: autoPlay ? 'relative' : 'sticky', top: 0, height: autoPlay ? '100%' : vh }}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-12">
          <div className={autoPlay ? "hidden" : "hidden md:block"}>
            <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#c2410c]">
              <svg viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden>
                <rect x="1.5" y="3" width="8" height="14" rx="2" opacity=".45" />
                <rect x="10.5" y="3" width="8" height="14" rx="2" />
              </svg>
              {eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <ol className="mt-7">
              {steps.map((s, i) => (
                <li key={s.title} className="border-l-2 pl-4 transition-colors duration-500" style={{ borderColor: i <= step ? accent : 'rgba(20,10,5,.1)' }}>
                  <p className="py-1.5 text-[15px] font-semibold transition-opacity duration-500" style={{ opacity: i === step ? 1 : 0.5 }}>
                    {s.title}
                  </p>
                  <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: i === step ? '1fr' : '0fr' }}>
                    <p className="overflow-hidden text-[14px] leading-snug text-[#1a0e08]/60">
                      <span className="block pb-2">{s.text}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative">
            <div className="@container overflow-hidden rounded-[24px] bg-white shadow-[0_0_0_1px_rgba(20,10,5,.05),0_1px_2px_rgba(20,10,5,.04),0_18px_40px_-28px_rgba(80,30,5,.25)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Centered slop real={false} />
                <div className="absolute inset-0 transition-[clip-path] duration-1000 ease-[cubic-bezier(.65,0,.35,1)]" style={{ clipPath: `circle(${step >= 1 ? 150 : 0}% at 52% 72%)` }}>
                  <Centered slop={false} real={false} />
                </div>
                <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: step >= 2 ? 1 : 0 }}>
                  <Centered slop={false} real />
                </div>
                <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: step >= 3 ? 1 : 0 }}>
                  <Split polish={step >= 4} />
                </div>
              </div>
            </div>
            <span key={step} className="absolute -bottom-4 right-4 rounded-full bg-[#2a1309] px-3.5 py-1.5 text-[13px] font-medium text-white shadow-lg" style={{ animation: 'before-after-chip 0.4s ease-out' }}>
              {step === 0 ? 'Before' : `Step ${step} of ${last}`}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
