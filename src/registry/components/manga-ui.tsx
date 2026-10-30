import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

// Manga UI: a complete black-and-white landing page drawn like a manga.
// Ink panels, screentone, focus lines, ASCII art, paper grain, speech bubbles
// and a book you can flip through. Change the copy below and ship it.

const INK = '#22211f'
const PAPER = '#f2efe6'

const brand = 'INKPANEL'
const nav = ['Chapters', 'Features', 'Pricing', 'Contact']

const bolt = String.raw`          ,/
        ,'/
      ,' /
    ,'  /_____,
  .'____    ,'
       /  ,'
      / ,'
     /,'
    /'`

const face = String.raw`   .-"""-.
  /  _ _  \
 |  (o)(o) |
 |    <    |
  \  '-'  /
   '-...-'`

const features = [
  { no: '01', title: 'Panels, not boxes', text: 'Every section is a panel with ink borders and hard shadows. Layouts read like a page.', art: '[#][#]\n[##][ ]' },
  { no: '02', title: 'Screentone shading', text: 'Dot patterns and focus lines instead of gradients. Crisp at every size.', art: '. : . :\n: . : .' },
  { no: '03', title: 'Flip to read', text: 'A real page-flip book for case studies, stories or docs. Click a page to turn it.', art: ' __ __\n|  |  |' },
]

const pages = [
  { title: 'The Blank Page', lines: ['A new project.', 'Nothing on the canvas yet.'], sfx: 'シーン', art: '+-------+\n|       |\n|   ?   |\n|       |\n+-------+' },
  { title: 'First Stroke', lines: ['One line of code.', 'Then another.'], sfx: 'カキカキ', art: '  ____\n /    \\\n| >_   |\n \\____/' },
  { title: 'The Rival', lines: ['A wild bug appears!', 'It will not go quietly.'], sfx: 'ゴゴゴ', art: ' /\\_/\\\n( x.x )\n > ^ <' },
  { title: 'Launch Day', lines: ['It ships.', 'To be continued...'], sfx: 'ドン!', art: '   /\\\n  |  |\n  |  |\n /____\\\n  /||\\' },
]

const plans = [
  { name: 'Rookie', price: '$0', perks: ['1 site', 'All panels', 'Community help'] },
  { name: 'Hero', price: '$12', perks: ['10 sites', 'Page-flip books', 'Priority help'], featured: true },
  { name: 'Legend', price: '$49', perks: ['Unlimited sites', 'Custom inking', 'A cameo in chapter 5'] },
]

// ─── Small building blocks ──────────────────────────────────────────────

const Panel = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) => (
  <div className={`relative overflow-hidden border-[3px] border-[#22211f] bg-[#f2efe6] shadow-[6px_6px_0_#22211f] ${className}`} style={style}>
    {children}
  </div>
)

const tone = (size = 7, dot = 1.1): CSSProperties => ({
  backgroundImage: `radial-gradient(${INK} ${dot}px, transparent ${dot + 0.2}px)`,
  backgroundSize: `${size}px ${size}px`,
})

const focusLines = (x = '50%', y = '50%'): CSSProperties => ({
  background: `repeating-conic-gradient(from 0deg at ${x} ${y}, ${INK} 0deg 0.8deg, transparent 0.8deg 4deg, ${INK} 4deg 4.4deg, transparent 4.4deg 9deg)`,
  maskImage: `radial-gradient(circle at ${x} ${y}, transparent 28%, black 75%)`,
  WebkitMaskImage: `radial-gradient(circle at ${x} ${y}, transparent 28%, black 75%)`,
})

const Button = ({ children, ghost = false, onClick }: { children: ReactNode; ghost?: boolean; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 border-[3px] border-[#22211f] px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide shadow-[4px_4px_0_#22211f] transition-[transform,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#22211f] active:translate-x-1 active:translate-y-1 active:shadow-none ${
      ghost ? 'bg-[#f2efe6] text-[#22211f]' : 'bg-[#22211f] text-[#f2efe6]'
    }`}
  >
    {children}
  </button>
)

const Bubble = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`relative rounded-[50%] border-[3px] border-[#22211f] bg-[#f2efe6] px-6 py-4 text-center font-extrabold uppercase leading-tight ${className}`}>
    {children}
    <span className="absolute -bottom-[16px] left-1/3 size-0 border-x-[9px] border-t-[16px] border-x-transparent border-t-[#22211f]" />
    <span className="absolute -bottom-[10px] left-[calc(33.3%+3px)] size-0 border-x-[6px] border-t-[11px] border-x-transparent border-t-[#f2efe6]" />
  </div>
)

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="inline-block bg-[#22211f] px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-[#f2efe6]">
    {children}
  </span>
)

// Panels pop in when they scroll into view
function Pop({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(24px) rotate(-1deg) scale(0.97)',
        transition: `opacity 0.5s ${delay}ms, transform 0.6s cubic-bezier(.2,1.4,.4,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// A book of manga pages. Click a page (or the buttons) to flip it over.
function FlipBook() {
  const [page, setPage] = useState(0)
  const go = (next: number) => setPage(Math.max(0, Math.min(pages.length, next)))
  return (
    <div>
      <div className="relative mx-auto aspect-[3/4] w-full max-w-sm [perspective:1600px]">
        {/* The back cover, seen once every page is turned */}
        <Panel className="absolute inset-0 grid place-items-center !bg-[#22211f] text-center">
          <div className="text-[#f2efe6]">
            <p className="font-mono text-xs uppercase tracking-[0.3em]">The end?</p>
            <p className="mt-2 text-5xl font-black">続く</p>
            <button onClick={() => go(0)} className="mt-6 border-2 border-[#f2efe6] px-4 py-1.5 font-mono text-xs uppercase">
              Read again
            </button>
          </div>
        </Panel>
        {pages.map((p, i) => {
          const turned = i < page
          return (
            <div
              key={p.title}
              onClick={() => go(turned ? i : i + 1)}
              className="absolute inset-0 cursor-pointer [transform-style:preserve-3d]"
              style={{
                zIndex: turned ? i : pages.length - i,
                transformOrigin: 'left center',
                transform: turned ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.9s cubic-bezier(.6,.05,.3,1)',
              }}
            >
              <Panel className="absolute inset-0 flex flex-col gap-2 p-3 [backface-visibility:hidden]">
                <div className="flex items-center justify-between">
                  <Tag>Ch. {i + 1}</Tag>
                  <span className="font-mono text-[10px] font-bold">p.{i + 1}</span>
                </div>
                <p className="text-2xl font-black uppercase leading-none">{p.title}</p>
                <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-2">
                  <div className="relative col-span-2 grid place-items-center border-[3px] border-[#22211f]">
                    <div className="absolute inset-0 opacity-25" style={focusLines('50%', '55%')} />
                    <pre className="relative font-mono text-[10px] font-bold leading-tight">{p.art}</pre>
                    <span className="absolute right-2 top-1 text-2xl font-black [-webkit-text-stroke:1px_#22211f] text-[#f2efe6]">{p.sfx}</span>
                  </div>
                  <div className="relative grid place-items-center border-[3px] border-[#22211f] p-2" style={tone(6)}>
                    <p className="relative border-2 border-[#22211f] bg-[#f2efe6] px-2 py-1 text-[11px] font-bold">{p.lines[0]}</p>
                  </div>
                  <div className="grid place-items-center border-[3px] border-[#22211f] bg-[#22211f] p-2">
                    <p className="text-center text-[11px] font-bold uppercase text-[#f2efe6]">{p.lines[1]}</p>
                  </div>
                </div>
                <p className="text-right font-mono text-[10px] uppercase">Click to turn →</p>
              </Panel>
              {/* The back of the page */}
              <div className="absolute inset-0 border-[3px] border-[#22211f] [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ ...tone(5, 0.9), backgroundColor: PAPER }} />
            </div>
          )
        })}
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button ghost onClick={() => go(page - 1)}>← Prev</Button>
        <span className="min-w-16 text-center font-mono text-xs font-bold">
          {Math.min(page + 1, pages.length)} / {pages.length}
        </span>
        <Button onClick={() => go(page + 1)}>Next →</Button>
      </div>
    </div>
  )
}

// ─── The page ────────────────────────────────────────────────────────────

export default function MangaUI({ className = '' }: { className?: string }) {
  return (
    <div className={`relative isolate min-h-full bg-[#f2efe6] font-sans text-[#22211f] ${className}`}>
      {/* Paper grain over everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-50 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <style>{`@keyframes manga-ui-marquee { to { transform: translateX(-50%) } }`}</style>
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b-[3px] border-[#22211f] bg-[#f2efe6]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <span className="flex items-center gap-2 text-xl font-black tracking-tight">
            <span className="grid size-8 place-items-center bg-[#22211f] font-mono text-sm text-[#f2efe6]">墨</span>
            {brand}
          </span>
          <div className="hidden gap-6 text-sm font-bold uppercase md:flex">
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="underline-offset-4 hover:underline">
                {item}
              </a>
            ))}
          </div>
          <Button>Start reading</Button>
        </nav>
      </header>
      {/* Hero: a full manga page */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
          <Pop className="md:col-span-4 md:row-span-2">
            <Panel className="h-full p-6 sm:p-10">
              <div aria-hidden className="absolute inset-0 opacity-[0.14]" style={focusLines('80%', '35%')} />
              <div className="relative">
                <Tag>Vol. 01 · Chapter 01</Tag>
                <h1 className="mt-6 text-[clamp(2.8rem,9vw,6.5rem)] font-black uppercase leading-[0.85] tracking-tighter">
                  Draw your
                  <span className="block text-transparent [-webkit-text-stroke:3px_#22211f]">story.</span>
                </h1>
                <p className="mt-6 max-w-md border-l-[6px] border-[#22211f] pl-4 text-lg font-medium">
                  A website template inked like a manga. Panels, screentone and speech bubbles, ready to fill with your plot.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button>Get the template →</Button>
                  <Button ghost>Read chapter 1</Button>
                </div>
              </div>
            </Panel>
          </Pop>
          <Pop delay={120} className="md:col-span-2">
            <Panel className="grid h-full min-h-56 place-items-center !bg-[#22211f] p-4">
              <pre aria-hidden className="font-mono text-xs font-bold leading-tight text-[#f2efe6]">{bolt}</pre>
              <span className="absolute bottom-2 right-3 text-4xl font-black text-[#f2efe6]">ドン!</span>
            </Panel>
          </Pop>
          <Pop delay={220} className="md:col-span-2">
            <Panel className="flex h-full min-h-48 items-end p-4" style={tone()}>
              <Bubble className="mb-4 w-full text-sm">Wait... it's all black and white?!</Bubble>
            </Panel>
          </Pop>
        </div>
      </section>
      {/* Ink marquee */}
      <div className="overflow-hidden border-y-[3px] border-[#22211f] bg-[#22211f] py-3 text-[#f2efe6]">
        <div className="flex w-max gap-8 whitespace-nowrap text-2xl font-black uppercase" style={{ animation: 'manga-ui-marquee 22s linear infinite' }}>
          {Array.from({ length: 2 }, (_, k) =>
            ['Panels', '✦', 'Screentone', '✦', 'Speed lines', '✦', 'ASCII art', '✦', 'Page flips', '✦', 'Speech bubbles', '✦'].map((w, i) => (
              <span key={`${k}-${i}`}>{w}</span>
            )),
          )}
        </div>
      </div>
      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-16">
        <Tag>Features</Tag>
        <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">Every panel, inked.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <Pop key={f.no} delay={i * 120}>
              <Panel className="group h-full p-5 transition-transform hover:-rotate-1">
                <div className="flex items-start justify-between">
                  <span className="text-5xl font-black leading-none text-transparent [-webkit-text-stroke:2px_#22211f]">{f.no}</span>
                  <pre aria-hidden className="font-mono text-[10px] font-bold leading-tight">{f.art}</pre>
                </div>
                <p className="mt-6 text-xl font-black uppercase">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed">{f.text}</p>
                <div aria-hidden className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-20" style={focusLines('85%', '15%')} />
              </Panel>
            </Pop>
          ))}
        </div>
      </section>
      {/* The book */}
      <section id="chapters" className="border-y-[3px] border-[#22211f] px-5 py-16" style={tone(9, 0.9)}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="inline-block border-[3px] border-[#22211f] bg-[#f2efe6] px-4 py-2 text-3xl font-black uppercase shadow-[5px_5px_0_#22211f] sm:text-4xl">
              Read the chapters
            </span>
          </div>
          <FlipBook />
        </div>
      </section>
      {/* Reviews as speech bubbles */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Tag>Readers say</Tag>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {['Best page I have ever scrolled.', 'My site finally has a plot twist.', 'Ten out of ten. Would flip again.'].map((quote, i) => (
            <Pop key={quote} delay={i * 120} className="flex flex-col items-start gap-6">
              <Bubble className="text-sm">{quote}</Bubble>
              <div className="flex items-center gap-3 pl-4">
                <pre aria-hidden className="font-mono text-[8px] font-bold leading-[1.1]">{face}</pre>
                <span className="font-mono text-xs font-bold uppercase">Reader #{i + 1}</span>
              </div>
            </Pop>
          ))}
        </div>
      </section>
      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-5 pb-16">
        <Tag>Pricing</Tag>
        <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">Pick your power level.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Pop key={plan.name} delay={i * 120}>
              <Panel className={`h-full p-6 ${plan.featured ? '!bg-[#22211f] text-[#f2efe6] md:-translate-y-3' : ''}`}>
                {plan.featured && (
                  <span className="absolute right-3 top-3 border-2 border-[#f2efe6] px-2 py-0.5 font-mono text-[10px] font-bold uppercase">Most read</span>
                )}
                <p className="text-sm font-black uppercase tracking-widest">{plan.name}</p>
                <p className="mt-3 text-6xl font-black leading-none">
                  {plan.price}
                  <span className="text-base font-bold">/mo</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm font-medium">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <span className="font-mono font-black">&gt;</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Pop>
          ))}
        </div>
      </section>
      {/* The final panel */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-16">
        <Panel className="!bg-[#22211f] p-8 text-[#f2efe6] sm:p-14">
          <div aria-hidden className="absolute inset-0 opacity-25" style={{ ...focusLines('50%', '50%'), filter: 'invert(1)' }} />
          <div className="relative text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]">Final chapter</p>
            <p className="mt-4 text-[clamp(2.5rem,8vw,5.5rem)] font-black uppercase leading-[0.9]">Your turn to draw.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button className="border-[3px] border-[#f2efe6] bg-[#f2efe6] px-6 py-3 text-sm font-extrabold uppercase text-[#22211f] shadow-[4px_4px_0_#f2efe6] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none">
                Start for free
              </button>
              <button className="border-[3px] border-[#f2efe6] px-6 py-3 text-sm font-extrabold uppercase">Talk to us</button>
            </div>
          </div>
        </Panel>
      </section>
      <footer className="border-t-[3px] border-[#22211f] px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 font-mono text-xs font-bold uppercase">
          <span>© {new Date().getFullYear()} {brand} · Inked with React and Tailwind</span>
          <span className="text-base">— to be continued —</span>
        </div>
      </footer>
    </div>
  )
}
