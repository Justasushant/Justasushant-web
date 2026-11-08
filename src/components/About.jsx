import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import ConeizLogo from './ConeizLogo.jsx'
import { site } from '../data/site.js'

export default function About() {
  return (
    <Section id="about" label="About" title="A frontend developer who keeps a Lab.">
      <div className="grid gap-12 md:grid-cols-5">
        <Reveal className="space-y-5 md:col-span-3">
          {site.about.map((paragraph) => (
            <p key={paragraph} className="max-w-prose text-lg leading-relaxed text-zinc-300">
              {paragraph}
            </p>
          ))}
          <a href={site.companyUrl} target="_blank" rel="noreferrer" className="panel !mt-10 flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#f3eee7] p-2">
              <ConeizLogo className="size-full" />
            </span>
            <span>
              <span className="block font-semibold">{site.company}</span>
              <span className="block text-sm text-zinc-400">{site.companyBlurb}</span>
            </span>
          </a>
        </Reveal>
        <Reveal delay={100} className="space-y-9 md:col-span-2">
          <div>
            <h3 className="text-base">Now</h3>
            <ul className="mt-3 space-y-2 text-zinc-400">
              {site.now.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base">Stack</h3>
            <p className="mt-3 flex flex-wrap gap-2">
              {site.stack.map((tool) => (
                <span key={tool} className="rounded-full bg-[#fff] px-3 py-1 text-sm shadow-[0_0_0_1px_rgba(20,10,5,0.07)]">
                  {tool}
                </span>
              ))}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
