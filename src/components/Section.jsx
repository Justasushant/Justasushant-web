import Reveal from './Reveal.jsx'

// A section opens with its title, a rule and, if it needs one, a line of intro
export default function Section({ id, title, intro, action, className = '', children }) {
  return (
    <section id={id} className={`mx-auto px-4 py-12 sm:px-6 sm:py-20 lg:px-10 2xl:px-16 ${className}`}>
      <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
        <div>
          <h2 className="font-display text-3xl uppercase leading-none tracking-tight sm:text-5xl">{title}</h2>
          {intro && <p className="mt-4 max-w-xl text-zinc-400">{intro}</p>}
        </div>
        {action}
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  )
}
