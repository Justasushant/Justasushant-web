import { useState } from 'react'
import { useSearchParams } from 'react-router'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import LabCard from '../components/LabCard.jsx'
import LabSidebar from '../components/LabSidebar.jsx'
import TemplatesSoon from '../components/TemplatesSoon.jsx'
import { allCategories, comingSoon, components } from '../registry/index.jsx'
import { site } from '../data/site.js'

export default function LabIndex() {
  const [query, setQuery] = useState('')
  // The category lives in the URL (/lab?category=Templates) so the sidebar can link to it
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'All'
  const setCategory = (next) => setParams(next === 'All' ? {} : { category: next }, { replace: true })

  const q = query.trim().toLowerCase()
  const matches = components.filter(
    (c) =>
      (category === 'All' || c.category === category) &&
      (!q || `${c.name} ${c.description} ${c.category}`.toLowerCase().includes(q)),
  )
  const groups = allCategories
    .map((cat) => ({ cat, items: matches.filter((c) => c.category === cat), soon: comingSoon.includes(cat) }))
    .filter((g) => g.items.length || (g.soon && category === 'All' && !q))

  return (
    <>
      <Nav />
      <div className="mx-auto px-4 pt-16 sm:px-6 lg:px-10 2xl:px-16 lg:grid lg:grid-cols-[210px_1fr] lg:gap-10">
        <aside className="scroll-thin sticky top-16 hidden h-[calc(100dvh-4rem)] overflow-y-auto py-10 lg:block">
          <LabSidebar />
        </aside>

        <main className="min-w-0 pb-24 pt-10 sm:pt-14">
          <p className="inline-flex items-center gap-2 border-2 border-ink px-3 py-1 font-mono text-xs font-bold text-zinc-300">
            <span className="size-1.5 rounded-full bg-accent" />
            {components.length} components · TSX + JSX · copy & paste
          </p>
          <h1 className="mt-6 font-display text-6xl uppercase leading-none tracking-tight sm:text-8xl">
            The <span className="text-transparent [-webkit-text-stroke:2px_#22211f]">Lab</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-400">
            Page transitions, buttons, backgrounds, text effects, cards, loaders and more. Built
            with React and Tailwind CSS, no extra libraries. Open any component to grab its code.
          </p>

          <div className="panel mt-8 max-w-2xl p-5">
            <p className="inline-block bg-ink px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-paper">
              A quick, honest note
            </p>
            <p className="mt-2 leading-relaxed text-zinc-300">{site.labNote}</p>
            <p className="mt-3 text-sm text-zinc-500">
              Inspired by the work of {site.inspirations.slice(0, -1).join(', ')} and{' '}
              {site.inspirations.at(-1)}. Go check them out.
            </p>
          </div>

          <div className="sticky top-16 z-20 -mx-4 mt-10 flex flex-col gap-3 border-b-[3px] border-ink bg-paper/95 px-4 py-4 backdrop-blur sm:mx-0 sm:flex-row sm:items-center sm:px-0">
            <label className="relative sm:w-60 sm:shrink-0">
              <span className="sr-only">Search components</span>
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components…"
                className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-accent/60"
              />
            </label>
            <div className="scroll-thin flex min-w-0 gap-1.5 overflow-x-auto">
              {['All', ...allCategories].map((cat) => {
                const soon = comingSoon.includes(cat)
                const count =
                  cat === 'All' ? components.length : components.filter((c) => c.category === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors ${
                      category === cat
                        ? 'bg-white text-zinc-950'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {cat}{' '}
                    {soon ? (
                      <span className="rounded-full bg-amber-400/15 px-1.5 font-mono text-[10px] text-amber-300">
                        soon
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] opacity-60">{count}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {comingSoon.includes(category) ? (
            <TemplatesSoon />
          ) : (
            <>
              {groups.length === 0 && (
                <p className="py-24 text-center text-zinc-500">Nothing matches “{query}”.</p>
              )}

              {groups.map(({ cat, items, soon }) => (
                <section key={cat} className="pt-12">
                  <h2 className="flex items-baseline gap-3 border-b-[3px] border-ink pb-2 font-display text-2xl uppercase tracking-tight">
                    {cat}
                    <span className="font-mono text-xs font-normal text-zinc-500">
                      {soon ? '0 / 0 · coming soon' : items.length}
                    </span>
                  </h2>
                  {soon ? (
                    <button
                      onClick={() => setCategory(cat)}
                      className="group mt-6 flex w-full items-center justify-between gap-4 rounded-2xl border border-dashed border-white/15 p-6 text-left transition-colors hover:border-amber-400/50"
                    >
                      <span>
                        <span className="block text-lg font-medium text-white">Nothing here yet.</span>
                        <span className="text-sm text-zinc-400">
                          There is a very good reason. Several, actually.
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-amber-400/15 px-3 py-1.5 text-sm text-amber-300 transition-transform group-hover:translate-x-1">
                        Hear the excuses →
                      </span>
                    </button>
                  ) : (
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                      {items.map((item) => (
                        <LabCard key={item.slug} item={item} height={cat === 'Cards' || cat === 'Templates' ? 'h-96' : 'h-56'} />
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  )
}
