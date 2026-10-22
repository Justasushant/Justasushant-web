import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import SpotlightCard from '../registry/components/spotlight-card.tsx'
import { site } from '../data/site.js'

export default function Contact() {
  const socials = site.socials.filter((s) => s.url)

  return (
    <Section
      id="contact"
      index="04"
      label="Contact"
      title={
        <>
          Let’s build <span className="font-serif font-normal italic text-accent">something</span>
        </>
      }
      intro="Have an idea, a project or an opportunity? Drop me an email or a WhatsApp message."
    >
      <Reveal className="grid gap-5 md:grid-cols-2">
        <SpotlightCard className="h-full">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Email</p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-4 inline-flex flex-wrap items-center gap-2 break-all text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            {site.email}
            <span className="text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </a>
          <p className="mt-6 text-sm text-zinc-400">Best for project details, briefs and anything long.</p>
        </SpotlightCard>

        <SpotlightCard glowColor="#25d366" className="h-full">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            WhatsApp <span className="text-[#25d366]">· messages only</span>
          </p>
          <p className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {site.whatsapp.display}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={site.whatsapp.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-transform hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
              </svg>
              Message on WhatsApp
            </a>
            <span className="text-sm text-zinc-500">Text only, no calls please.</span>
          </div>
        </SpotlightCard>
      </Reveal>

      {socials.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-white"
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </Section>
  )
}
