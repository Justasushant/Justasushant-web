import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { site } from '../data/site.js'

export default function Contact() {
  const socials = site.socials.filter((s) => s.url)

  return (
    <Section
      id="contact"
      title="Contact"
      intro="Email is best for anything detailed. WhatsApp is fine for a quick hello, but messages only."
    >
      <Reveal>
        <dl className="divide-y-2 divide-ink border-b-2 border-ink">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5">
            <dt className="text-zinc-400">Email</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="font-display text-xl underline decoration-2 underline-offset-4 sm:text-3xl">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5">
            <dt className="text-zinc-400">WhatsApp</dt>
            <dd className="text-right">
              <a
                href={site.whatsapp.link}
                target="_blank"
                rel="noreferrer"
                className="font-display text-xl underline decoration-2 underline-offset-4 sm:text-3xl"
              >
                {site.whatsapp.display}
              </a>
              <span className="block text-sm text-zinc-400">Text only, no calls please.</span>
            </dd>
          </div>
        </dl>
      </Reveal>

      {socials.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold underline underline-offset-4">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      )}
    </Section>
  )
}
