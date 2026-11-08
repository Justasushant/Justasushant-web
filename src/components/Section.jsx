import Reveal from './Reveal.jsx'

// An orange label, a rounded headline and a muted line of intro
export default function Section({ id, label, title, intro, action, className = '', children }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1080px] px-5 py-20 sm:py-28 ${className}`}>
      <Reveal className="flex flex-wrap items-end justify-between gap-5">
        <div>
          {label && <p className="text-[15px] font-semibold text-accent">{label}</p>}
          <h2 className="mt-2 text-[clamp(2rem,4.4vw,2.9rem)] leading-[1.05] tracking-[-0.035em]">{title}</h2>
          {intro && <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-400">{intro}</p>}
        </div>
        {action}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}
