import { Link, useNavigate } from 'react-router'
import { LazyMount, Stage } from './Preview.jsx'
import Badge from './Badge.jsx'
import { inspirationFor } from '../data/inspirations.js'

// A live preview tile. Controls inside the preview stay usable;
// clicking anywhere else opens the component in the Lab.
// `compact` is for narrow two-column grids: on phones the demo renders at
// double size and is scaled down, and the description is hidden.
export default function LabCard({ item, height = 'h-56', compact = false }) {
  const navigate = useNavigate()
  const href = `/lab/${item.slug}`
  const credit = inspirationFor(item.slug)

  const onPreviewClick = (e) => {
    // Scroll-style demos have nothing to try in a card, so a click anywhere opens them
    if (!item.capturesScroll && e.target.closest('button:not([data-open]), a, input, [role="switch"], [role="tab"]')) return
    navigate(href)
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-[#fff] shadow-[0_0_0_1px_rgba(20,10,5,0.05),0_1px_2px_rgba(20,10,5,0.04),0_18px_40px_-28px_rgba(80,30,5,0.25)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(20,10,5,0.08),0_1px_2px_rgba(20,10,5,0.05),0_24px_44px_-26px_rgba(80,30,5,0.34)]">
      <LazyMount
        className={`relative cursor-pointer overflow-hidden border-b border-[#1a0e08]/[0.06] ${height}`}
      >
        {/* The page keeps scrolling over a card: its demo never grabs the wheel or a swipe */}
        <div
          onClick={onPreviewClick}
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchStartCapture={(e) => e.stopPropagation()}
          onTouchEndCapture={(e) => e.stopPropagation()}
          onKeyDownCapture={(e) => e.stopPropagation()}
          className="size-full"
        >
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
      {/* The whole footer opens the component; the credit link sits above that */}
      <div
        className={`relative flex flex-1 items-start justify-between gap-2 sm:gap-4 ${
          compact ? 'p-3 sm:p-4' : 'p-4'
        }`}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className={`font-medium text-white ${compact ? 'text-sm sm:text-base' : ''}`}>
              <Link to={href} className="after:absolute after:inset-0">
                {item.name}
              </Link>
            </h3>
            <span
              className={`rounded-full border border-white/10 px-2 font-mono text-[10px] leading-5 text-zinc-500 ${
                compact ? 'hidden sm:inline' : ''
              }`}
            >
              {item.category}
            </span>
            <Badge slug={item.slug} />
          </div>
          <p className={`mt-1 text-sm text-zinc-400 ${compact ? 'hidden sm:block' : ''}`}>
            {item.description}
          </p>
          <p className={`mt-2 text-xs text-zinc-500 ${compact ? 'hidden sm:block' : ''}`}>
            Inspired by{' '}
            {credit.url ? (
              <a
                href={credit.url}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 font-medium text-zinc-300 underline decoration-white/20 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
              >
                {credit.name}
              </a>
            ) : (
              credit.name
            )}
          </p>
        </div>
        <span className="mt-0.5 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
          ↗
        </span>
      </div>
    </div>
  )
}
