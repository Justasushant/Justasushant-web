import { badgeFor } from '../data/changelog.js'

// A small "New" or "Updated" tag for Lab components that changed recently
export default function Badge({ slug, className = '' }) {
  const badge = badgeFor(slug)
  if (!badge) return null
  return badge === 'new' ? (
    <span
      className={`rounded-full bg-accent px-2 font-mono text-[10px] font-bold uppercase leading-5 tracking-wider text-zinc-950 ${className}`}
    >
      New
    </span>
  ) : (
    <span
      className={`rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2 font-mono text-[10px] font-semibold uppercase leading-5 tracking-wider text-cyan-300 ${className}`}
    >
      Updated
    </span>
  )
}
