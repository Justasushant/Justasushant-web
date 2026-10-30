import { Link } from 'react-router'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { projects } from '../data/site.js'

// While nothing has shipped, the whole section is taped off like a crime scene
const underConstruction = projects.every((p) => p.status !== 'live')

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
            'linear-gradient(rgb(34 33 31 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(34 33 31 / 0.06) 1px, transparent 1px)',
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
    <article className="panel group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-ink bg-zinc-900">
        {live ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <Wireframe index={index} />
            <span className="absolute right-3 top-3 -rotate-6 border-[3px] border-ink bg-paper px-2 py-1 font-display text-xs uppercase shadow-[3px_3px_0_var(--color-ink)]">
              In progress
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs text-zinc-500">
          {String(index + 1).padStart(2, '0')} · {project.hint}
        </p>
        <h3 className="mt-2 font-display text-xl uppercase tracking-tight">{project.title}</h3>
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
      <div className="relative">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 100}
              className="h-full"
            >
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
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
