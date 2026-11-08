import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { site } from '../data/site.js'

export default function Contact() {
  const socials = site.socials.filter((s) => s.url)

  return (
    <Section
      id="contact"
      label="Contact"
      title="Let’s build something."
      intro="Email is best for anything detailed. WhatsApp is fine for a quick hello, but messages only."
    >
      <Reveal className="grid gap-4 md:grid-cols-2">
        <div className="panel p-7">
          <p className="text-sm text-zinc-500">Email</p>
          <a href={`mailto:${site.email}`} className="mt-3 block break-all text-2xl font-semibold tracking-tight hover:text-accent sm:text-3xl">
            {site.email}
          </a>
          <p className="mt-5 text-zinc-400">Best for project details, briefs and anything long.</p>
        </div>
        <div className="panel p-7">
          <p className="text-sm text-zinc-500">WhatsApp</p>
          <a href={site.whatsapp.link} target="_blank" rel="noreferrer" className="mt-3 block text-2xl font-semibold tracking-tight hover:text-accent sm:text-3xl">
            {site.whatsapp.display}
          </a>
          <p className="mt-5 text-zinc-400">Messages only, no calls please.</p>
        </div>
      </Reveal>
      {socials.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="ink-btn ghost !h-10 text-sm">
              {s.label}
            </a>
          ))}
        </div>
      )}
    </Section>
  )
}
