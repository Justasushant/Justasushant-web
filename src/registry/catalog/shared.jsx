// Small helpers shared by the Lab demos (not part of any component's source)
import { indent, jsx } from '../controls.js'

// slug -> PascalCase component name, e.g. "shimmer-button" -> "ShimmerButton"
export const pascal = (slug) => slug.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())

// A JSX tag where the `children` prop becomes the tag's content
export const tag = (name, { children, ...props }) => jsx(name, props, children)

export const BgTitle = ({ children, sub }) => (
  <div className="pointer-events-none relative z-10 px-6 text-center">
    <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{children}</p>
    {sub && <p className="mt-3 font-mono text-xs text-zinc-400">{sub}</p>}
  </div>
)

export const bgUsage = (element) => `<div className="relative h-96 overflow-hidden rounded-2xl bg-zinc-950">
${indent(element, 2)}
  <h1 className="relative z-10 text-5xl text-white">Your content</h1>
</div>`

export const CardContent = ({ title, text }) => (
  <>
    <p className="font-mono text-xs text-zinc-500">CONEIZ / LAB</p>
    <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p>
  </>
)

// Four full-size demo pages for the Transitions category.
// Sizes use container units so they look right in a small card or full screen.
const pageThemes = [
  {
    background: '#c6f432',
    color: '#09090b',
    title: 'Scroll down',
    note: 'Use the wheel, a trackpad, the arrow keys or swipe.',
  },
  {
    background: '#18181b',
    color: '#fafafa',
    title: 'Keep going',
    note: 'A page can hold anything: text, images, whole sections of a site.',
  },
  {
    background: 'linear-gradient(135deg, #7c3aed, #db2777)',
    color: '#ffffff',
    title: 'Almost there',
    note: 'Everything runs on transforms, so it stays smooth.',
  },
  {
    background: 'linear-gradient(135deg, #0891b2, #1e3a8a)',
    color: '#ffffff',
    title: 'That’s all',
    note: 'Scroll back up to rewind.',
  },
]

export const demoPages = (label) =>
  pageThemes.map((page, i) => (
    <section
      key={i}
      className="@container size-full"
      style={{ background: page.background, color: page.color }}
    >
      <div className="relative flex size-full flex-col justify-between overflow-hidden" style={{ padding: '6cqw' }}>
        <div
          className="relative flex justify-between font-mono uppercase tracking-widest opacity-70"
          style={{ fontSize: 'max(10px, 1.4cqw)' }}
        >
          <span>{label}</span>
          <span>
            {String(i + 1).padStart(2, '0')} / {String(pageThemes.length).padStart(2, '0')}
          </span>
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 font-semibold leading-none tracking-tighter opacity-15"
          style={{ fontSize: '46cqw', right: '-2cqw' }}
        >
          {i + 1}
        </span>
        <h2 className="relative font-semibold leading-[0.9] tracking-tighter" style={{ fontSize: '12cqw' }}>
          {page.title}
        </h2>
        <p className="relative opacity-75" style={{ fontSize: 'max(11px, 1.7cqw)', maxWidth: '55cqw' }}>
          {page.note}
        </p>
      </div>
    </section>
  ))

const pageSections = `<section className="h-full bg-lime-300">Page one</section>
<section className="h-full bg-zinc-900 text-white">Page two</section>
<section className="h-full bg-violet-600 text-white">Page three</section>
<section className="h-full bg-cyan-700 text-white">Page four</section>`

export const pagesUsage = (name, props) => `<div className="h-screen">
${indent(jsx(name, props, pageSections), 2)}
</div>`
