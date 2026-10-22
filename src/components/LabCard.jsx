import { Link, useNavigate } from 'react-router'
import { LazyMount, Stage } from './Preview.jsx'

// A live preview tile. Controls inside the preview stay usable;
// clicking anywhere else opens the component in the Lab.
// `compact` is for narrow two-column grids: on phones the demo renders at
// double size and is scaled down, and the description is hidden.
export default function LabCard({ item, height = 'h-56', compact = false }) {
  const navigate = useNavigate()
  const href = `/lab/${item.slug}`

  const onPreviewClick = (e) => {
    if (e.target.closest('button:not([data-open]), a, input, [role="switch"], [role="tab"]')) return
    navigate(href)
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 transition-colors hover:border-white/25">
      <LazyMount className={`relative cursor-pointer overflow-hidden ${height}`}>
        <div onClick={onPreviewClick} className="size-full">
          <div
            className={
              compact
                ? 'absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 sm:static sm:size-full sm:scale-100'
                : 'size-full'
            }
          >
            <Stage item={item} preview />
          </div>
          {/* Scroll-driven demos auto-play here and open full screen to try */}
          {item.capturesScroll && (
            <button
              data-open
              aria-label={`Open ${item.name}`}
              className="absolute inset-0 z-30 flex items-end justify-start p-3"
            >
              <span className="rounded-full border border-white/15 bg-zinc-950/70 px-2.5 py-1 font-mono text-[10px] text-zinc-300 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                Open to scroll it yourself ↗
              </span>
            </button>
          )}
        </div>
      </LazyMount>
      <Link
        to={href}
        className={`flex flex-1 items-start justify-between gap-2 border-t border-white/10 sm:gap-4 ${
          compact ? 'p-3 sm:p-4' : 'p-4'
        }`}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className={`font-medium text-white ${compact ? 'text-sm sm:text-base' : ''}`}>{item.name}</h3>
            <span
              className={`rounded-full border border-white/10 px-2 font-mono text-[10px] leading-5 text-zinc-500 ${
                compact ? 'hidden sm:inline' : ''
              }`}
            >
              {item.category}
            </span>
          </div>
          <p className={`mt-1 text-sm text-zinc-400 ${compact ? 'hidden sm:block' : ''}`}>
            {item.description}
          </p>
        </div>
        <span className="mt-0.5 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
          ↗
        </span>
      </Link>
    </div>
  )
}
