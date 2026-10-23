import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import ConeizLogo from './ConeizLogo.jsx'
import { site } from '../data/site.js'

export default function About() {
  return (
    <Section
      id="about"
      label="About"
      title="Details are the design."
    >
      <div className="grid gap-12 md:grid-cols-5">
        <Reveal className="space-y-5 md:col-span-3">
          {site.about.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-zinc-400 sm:text-lg">
              {paragraph}
            </p>
          ))}
          <a
            href={site.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="group !mt-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25 hover:bg-white/[0.05] sm:gap-5 sm:p-5"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white p-2 shadow-lg shadow-black/40 sm:size-16">
              <ConeizLogo className="size-full" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                {site.companyRole}
              </span>
              <span className="block text-lg font-semibold tracking-tight text-white sm:text-xl">
                {site.company}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-zinc-400">{site.companyBlurb}</span>
            </span>
            <span className="self-start text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
              ↗
            </span>
          </a>
        </Reveal>

        <Reveal delay={100} className="space-y-10 md:col-span-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">Now</h3>
            <ul className="mt-4 space-y-3">
              {site.now.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-zinc-200">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">Stack</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.stack.map((tool) => (
                <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
