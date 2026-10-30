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
      intro="Email is best for anything detailed. WhatsApp works for a quick hello, messages only."
    >
      <Reveal className="grid gap-5 md:grid-cols-2">
        <div className="panel h-full p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Email</p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-4 inline-flex flex-wrap items-center gap-2 break-all font-display text-2xl tracking-tight text-white underline decoration-4 underline-offset-4 sm:text-3xl"
          >
            {site.email}
            <span className="text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </a>
          <p className="mt-6 text-sm text-zinc-400">Best for project details, briefs and anything long.</p>
        </div>

        <div className="panel tone relative h-full p-6 sm:p-8">
          <div className="relative border-[3px] border-ink bg-paper p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            WhatsApp <span className="text-white">· messages only</span>
          </p>
          <p className="mt-4 font-display text-2xl tracking-tight text-white sm:text-3xl">
            {site.whatsapp.display}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={site.whatsapp.link}
              target="_blank"
              rel="noreferrer"
              className="ink-btn text-sm"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
              </svg>
              Message on WhatsApp
            </a>
            <span className="text-sm text-zinc-500">Text only, no calls please.</span>
          </div>
        </div>
          </div>
      </Reveal>

      {socials.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="ink-btn ghost text-xs"
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </Section>
  )
}
