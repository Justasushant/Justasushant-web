import { useSearchParams } from 'react-router'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import LabCard from '../components/LabCard.jsx'
import LabSidebar from '../components/LabSidebar.jsx'
import TemplatesSoon from '../components/TemplatesSoon.jsx'
import { allCategories, comingSoon, components } from '../registry/index.jsx'
import { site } from '../data/site.js'

export default function LabIndex() {
  // The category lives in the URL (/lab?category=Templates) so the sidebar can link to it
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'All'
  // The search text lives in the URL too, so the sidebar's search box drives this page
  const query = params.get('q') || ''
  const setQuery = (value) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set('q', value)
        else next.delete('q')
        return next
      },
      { replace: true },
    )

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
          <h1 className="text-[clamp(2.6rem,7vw,4.5rem)] leading-none tracking-[-0.04em]">The Lab</h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-400">
            Page transitions, buttons, backgrounds, text effects, cards, loaders and more. Built
            with React and Tailwind CSS, no extra libraries. Open any component to grab its code.
          </p>

          <div className="mt-8 max-w-2xl">
            <p className="leading-relaxed text-zinc-300">{site.labNote}</p>
            <p className="mt-3 text-sm text-zinc-500">
              Inspired by the work of {site.inspirations.slice(0, -1).join(', ')} and{' '}
              {site.inspirations.at(-1)}. Go check them out.
            </p>
          </div>

          {/* On phones the sidebar is hidden, so the search lives here */}
          <label className="relative mt-8 block lg:hidden">
            <span className="sr-only">Search components</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components…"
              className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-4 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-accent/60"
            />
          </label>

          {comingSoon.includes(category) ? (
            <TemplatesSoon />
          ) : (
            <>
              {groups.length === 0 && (
                <p className="py-24 text-center text-zinc-500">Nothing matches “{query}”.</p>
              )}

              {groups.map(({ cat, items, soon }) => (
                <section key={cat} className="pt-12">
                  <h2 className="flex items-baseline gap-3 pb-1 text-2xl tracking-tight">
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
