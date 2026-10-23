import { Link } from 'react-router'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { projects } from '../data/site.js'

// While nothing has shipped, the whole section is taped off like a crime scene
const underConstruction = projects.every((p) => p.status !== 'live')

const tapeWords = ['Under construction', 'Do not cross', 'Work in progress', 'Coming soon']

function TapeText({ reverse }) {
  return (
    <div
      className="flex w-max whitespace-nowrap text-base font-black uppercase tracking-tight text-zinc-950 sm:text-2xl"
      style={{ animation: `tape-scroll 45s linear infinite${reverse ? ' reverse' : ''}` }}
    >
      {Array.from({ length: 6 }, (_, i) =>
        tapeWords.map((word) => (
          <span key={`${i}-${word}`} className="flex items-center gap-6 px-6 sm:gap-8 sm:px-8">
            {word}
            <span className="text-sm text-zinc-950/35 sm:text-lg">✦</span>
          </span>
        )),
      )}
    </div>
  )
}

// One broad strip of tape folded in the middle: two halves pinned at the
// centre at opposite angles. A positive angle makes a V, a negative one a Λ.
function FoldedTape({ angle, reverse = false, layer }) {
  const half = (left) => (
    <div
      className="absolute top-0 w-[78vw] overflow-hidden bg-gradient-to-b from-[#fef08a] via-[#fde047] to-[#eab308] py-3 shadow-[0_18px_40px_rgba(0,0,0,0.6)] sm:py-4"
      style={{
        [left ? 'right' : 'left']: '50%',
        transformOrigin: left ? 'right center' : 'left center',
        transform: `translateY(-50%) rotate(${left ? angle : -angle}deg)`,
      }}
    >
      <TapeText reverse={reverse} />
      {/* A soft shadow where the tape bends */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-32"
        style={{
          [left ? 'right' : 'left']: 0,
          background: `linear-gradient(to ${left ? 'left' : 'right'}, rgba(0, 0, 0, 0.22), transparent)`,
        }}
      />
    </div>
  )
  return (
    <div className="absolute inset-x-0 top-1/2" style={{ zIndex: layer }}>
      {half(true)}
      {half(false)}
    </div>
  )
}

// A rough wireframe sketch of the project, so the card shows "planned", not "loading"
function Wireframe({ index }) {
  const line = 'rounded border border-dashed border-white/15'
  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-900 p-5">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.035) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className={`relative flex h-full flex-col gap-3 p-4 ${line}`}>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full border border-dashed border-white/20" />
          <span className="size-2 rounded-full border border-dashed border-white/20" />
          <span className="size-2 rounded-full border border-dashed border-white/20" />
          <span className={`ml-3 h-2.5 flex-1 ${line}`} />
        </div>
        <span className={`h-3 w-1/2 ${line}`} />
        <div className="grid flex-1 grid-cols-3 gap-3">
          <span className={`col-span-2 ${line}`} />
          <span className={line} />
        </div>
      </div>
      <span
        aria-hidden
        className="absolute bottom-1 right-4 font-black leading-none tracking-tighter text-white/[0.05]"
        style={{ fontSize: '8rem' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const live = project.status === 'live'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-900">
        {live ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <Wireframe index={index} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs text-zinc-500">
          {String(index + 1).padStart(2, '0')} · {project.hint}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-400">
              {tag}
            </span>
          ))}
        </div>

        {live && (
          <div className="mt-5 flex gap-4 text-sm font-medium">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="hover:text-accent">
                Live demo ↗
              </a>
            )}
            {project.code && (
              <a href={project.code} target="_blank" rel="noreferrer" className="hover:text-accent">
                Code ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <Section
      id="work"
      label="Work"
      className="overflow-x-clip"
      title="Projects"
      intro="What I'm building next. Each one will ship with a live demo, the code and a short write-up."
      action={
        underConstruction && (
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-amber-300">
            Under construction
          </span>
        )
      }
    >
      <style>{`@keyframes tape-scroll { to { transform: translateX(-50%) } }`}</style>
      <div className="relative">
        {/* Behind the tape: the planned projects, dimmed and out of reach */}
        <div
          aria-hidden={underConstruction}
          inert={underConstruction}
          className={
            underConstruction
              ? // On phones the cards peek out in a row, so the tape covers the whole section
                'flex select-none gap-4 overflow-hidden opacity-70 blur-[1px] grayscale-[0.4] sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3'
              : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
          }
        >
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 100}
              className={`h-full ${underConstruction ? 'w-[82%] shrink-0 sm:w-auto' : ''}`}
            >
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>

        {underConstruction && (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <FoldedTape angle={-4} reverse layer={1} />
            <FoldedTape angle={4} layer={2} />
          </div>
        )}
      </div>

      {underConstruction && (
        <p className="mt-12 text-center text-sm text-zinc-400">
          These are still being built.{' '}
          <Link to="/lab" className="font-medium text-accent hover:underline">
            The Lab is open though →
          </Link>
        </p>
      )}
    </Section>
  )
}
