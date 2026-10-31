import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import ConeizLogo from './ConeizLogo.jsx'
import { site } from '../data/site.js'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 md:grid-cols-5">
        <Reveal className="space-y-5 md:col-span-3">
          {site.about.map((paragraph) => (
            <p key={paragraph} className="max-w-prose text-base leading-relaxed sm:text-lg">
              {paragraph}
            </p>
          ))}
          <a
            href={site.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="!mt-10 flex items-center gap-4 border-2 border-ink p-4 transition-colors hover:bg-ink hover:text-paper"
          >
            <span className="grid size-12 shrink-0 place-items-center border-2 border-ink bg-paper p-1.5">
              <ConeizLogo className="size-full" />
            </span>
            <span>
              <span className="block font-semibold">{site.company}</span>
              <span className="block text-sm opacity-70">{site.companyBlurb}</span>
            </span>
          </a>
        </Reveal>

        <Reveal delay={100} className="space-y-8 md:col-span-2">
          <div>
            <h3 className="font-semibold">Now</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {site.now.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Stack</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{site.stack.join(', ')}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
