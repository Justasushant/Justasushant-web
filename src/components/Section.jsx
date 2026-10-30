import Reveal from './Reveal.jsx'

// Every section opens like a new chapter: a black tab with the label,
// a heavy title, and a narration box for the intro
export default function Section({ id, label, title, intro, action, className = '', children }) {
  return (
    <section id={id} className={`mx-auto px-4 py-20 sm:px-6 sm:py-28 lg:px-10 2xl:px-16 ${className}`}>
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="inline-block bg-ink px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-widest text-paper">
            {label}
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">{title}</h2>
          {intro && <p className="mt-5 max-w-xl border-l-4 border-ink pl-4 text-zinc-400">{intro}</p>}
        </div>
        {action}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}
