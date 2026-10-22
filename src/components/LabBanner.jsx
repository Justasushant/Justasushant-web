import { Link } from 'react-router'
import Reveal from './Reveal.jsx'
import { categories, components } from '../registry/index.jsx'

// A full-width call to action that sends people to the Lab
export default function LabBanner() {
  const names = components.map((c) => c.name)

  return (
    <div className="px-4 sm:px-6 lg:px-10 2xl:px-16">
      <Reveal>
        <Link
          to="/lab"
          className="group relative block overflow-hidden rounded-3xl bg-accent text-zinc-950"
        >
          <style>{`@keyframes lab-banner-scroll { to { transform: translateX(-50%) } }`}</style>
          {/* Faint hazard stripes that slide on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07] transition-[background-position] duration-700 group-hover:[background-position:80px_0]"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, #000 0 14px, transparent 14px 28px)',
            }}
          />
          <div className="relative flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-12">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-950/60">
                The Lab · {components.length} components · {categories.length} categories
              </p>
              <p className="mt-3 text-4xl font-black leading-none tracking-tighter sm:text-6xl lg:text-7xl">
                Explore the Lab
              </p>
            </div>
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-zinc-950 text-3xl text-accent transition-transform duration-500 group-hover:-rotate-45 sm:size-24 sm:text-4xl">
              →
            </span>
          </div>
          {/* Every component name, scrolling past along the bottom */}
          <div className="relative overflow-hidden border-t border-zinc-950/15 py-3">
            <div
              className="flex w-max gap-6 whitespace-nowrap font-mono text-xs font-semibold uppercase text-zinc-950/70"
              style={{ animation: 'lab-banner-scroll 60s linear infinite' }}
            >
              {[...names, ...names].map((name, i) => (
                <span key={i}>
                  {name} <span className="ml-6 text-zinc-950/30">✦</span>
                </span>
              ))}
            </div>
          </div>
        </Link>
      </Reveal>
    </div>
  )
}
