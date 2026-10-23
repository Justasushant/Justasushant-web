import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
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
          <div className="!mt-8 inline-block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-sm font-medium text-white">{site.company}</p>
            <p className="text-xs text-zinc-500">{site.companyRole}</p>
          </div>
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
