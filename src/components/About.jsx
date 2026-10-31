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
            className="panel group !mt-10 flex items-center gap-4 p-4 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:gap-5 sm:p-5"
          >
            <span className="grid size-14 shrink-0 place-items-center border-[3px] border-ink bg-paper p-2 sm:size-16">
              <ConeizLogo className="size-full" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                {site.companyRole}
              </span>
              <span className="block font-display text-lg uppercase tracking-tight text-white sm:text-xl">
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
            <h3 className="inline-block bg-ink px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-paper">Now</h3>
            <ul className="mt-4 space-y-3">
              {site.now.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-zinc-200">
                  <span className="mt-1 size-2.5 shrink-0 rotate-45 bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="inline-block bg-ink px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-paper">Stack</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.stack.map((tool) => (
                <span key={tool} className="border-2 border-ink bg-paper px-3 py-1 font-mono text-xs font-bold uppercase shadow-[3px_3px_0_#22211f]">
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
