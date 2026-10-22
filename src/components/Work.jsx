import { Link } from 'react-router'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { projects } from '../data/site.js'

// While nothing has shipped, the whole section is taped off like a crime scene
const underConstruction = projects.every((p) => p.status !== 'live')

// One strip of police tape, wider than the screen, scrolling along its length
function Tape({ top, angle, reverse = false }) {
  return (
    <div
      className="absolute left-1/2 w-[160vw] border-y-[3px] border-zinc-950 bg-gradient-to-b from-[#fef08a] via-[#fde047] to-[#facc15] py-2 shadow-[0_14px_40px_rgba(0,0,0,0.65)] sm:py-3"
      style={{ top, transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
    >
      <div
        className="flex w-max whitespace-nowrap text-sm font-black uppercase tracking-tight text-zinc-950 sm:text-lg"
        style={{ animation: `tape-scroll 40s linear infinite${reverse ? ' reverse' : ''}` }}
      >
        {Array.from({ length: 16 }, (_, i) => (
          <span key={i} className="flex items-center gap-4 px-4">
            Under construction
            <span className="text-xs sm:text-sm">✕</span>
            Do not cross
            <span className="text-xs sm:text-sm">✕</span>
          </span>
        ))}
      </div>
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
          {String(index + 1).padStart(2, '0')} — {project.hint}
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
      index="02"
      label="Work"
      className="overflow-x-clip"
      title={
        <>
          Selected <span className="font-serif font-normal italic">projects</span>
        </>
      }
      intro="Bigger things I'm building right now. Each one ships with a live demo, the code and a write-up of how it was made."
      action={
        underConstruction && (
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-amber-300">
            <span className="size-2 animate-pulse rounded-full bg-amber-400" />
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
            <Tape top="46%" angle={-7} />
            <Tape top="52%" angle={5} reverse />
          </div>
        )}
      </div>

      {underConstruction && (
        <p className="mt-12 text-center text-sm text-zinc-400">
          These are still being built. Nothing to see here yet, officer.{' '}
          <Link to="/lab" className="font-medium text-accent hover:underline">
            The Lab is open though →
          </Link>
        </p>
      )}
    </Section>
  )
}
