import Reveal from './Reveal.jsx'

export default function Section({ id, index, label, title, intro, action, className = '', children }) {
  return (
    <section id={id} className={`mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:px-10 2xl:px-16 ${className}`}>
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            {index} / {label}
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h2>
          {intro && <p className="mt-4 max-w-xl text-zinc-400">{intro}</p>}
        </div>
        {action}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}
