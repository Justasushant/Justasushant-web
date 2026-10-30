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

const pageSections = `<section className="h-full bg-lime-300">Page one</section>
<section className="h-full bg-zinc-900 text-white">Page two</section>
<section className="h-full bg-violet-600 text-white">Page three</section>
<section className="h-full bg-cyan-700 text-white">Page four</section>`

export const pagesUsage = (name, props) => `<div className="h-screen">
${indent(jsx(name, props, pageSections), 2)}
</div>`
