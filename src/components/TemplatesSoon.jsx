import { useState } from 'react'
import ExcuseGenerator from './ExcuseGenerator.jsx'
import GlitchText from '../registry/components/glitch-text.tsx'
import { remindReplies, templateExcuses } from '../data/opensource.js'

// What you see when you open the Lab's "Templates" category
export default function TemplatesSoon() {
  const [presses, setPresses] = useState(0)
  const reply = presses > 0 ? remindReplies[(presses - 1) % remindReplies.length] : null

  return (
    <section className="pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-xs text-amber-300">
            <span className="size-1.5 animate-pulse rounded-full bg-amber-400" />
            Coming soon
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-tight sm:text-6xl">
            Templates <span className="font-mono text-2xl text-zinc-500 sm:text-3xl">(0 / 0)</span>
          </h2>
          <p className="mt-3 max-w-xl text-zinc-400">
            Full page templates built from the Lab: landing pages, portfolios, dashboards. That is the
            plan. Here is how the plan is going:
          </p>
        </div>
        <p className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-none tracking-tighter text-zinc-800">
          <GlitchText text="0 / 0" speed={3} />
        </p>
      </div>

      <div className="mt-10">
        <ExcuseGenerator
          excuses={templateExcuses}
          label="Template excuse generator"
          buttonLabel="Generate excuse"
          actions={
            <button
              onClick={() => setPresses((n) => n + 1)}
              className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-200 transition-colors hover:bg-amber-400/20"
            >
              Remind me
            </button>
          }
        >
          {reply && (
            <p
              key={presses}
              role="status"
              className="mt-5 inline-flex max-w-2xl items-start gap-2 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-sm text-amber-100"
              style={{ animation: 'excuse-land 0.45s cubic-bezier(.2,.8,.2,1)' }}
            >
              <span>
                {reply}
                {presses > 1 && <span className="ml-2 font-mono text-xs text-amber-300/60">×{presses}</span>}
              </span>
            </p>
          )}
        </ExcuseGenerator>
      </div>
    </section>
  )
}
