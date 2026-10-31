import { Link } from 'react-router'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { projects } from '../data/site.js'

const shipped = projects.filter((p) => p.status === 'live')
const planned = projects.filter((p) => p.status !== 'live')

function ProjectCard({ project }) {
  return (
    <article className="panel flex h-full flex-col overflow-hidden">
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        className="aspect-[16/10] w-full border-b-2 border-ink object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl uppercase tracking-tight">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.description}</p>
        <p className="mt-4 text-sm text-zinc-500">{project.tags.join(', ')}</p>
        <div className="mt-auto flex gap-4 pt-5 text-sm font-semibold underline underline-offset-4">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live demo
            </a>
          )}
          {project.code && (
            <a href={project.code} target="_blank" rel="noreferrer">
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <Section
      id="work"
      title="Projects"
      intro={
        shipped.length
          ? undefined
          : 'Nothing has shipped yet. These are what I am working on. The Lab is the finished work for now.'
      }
    >
      {shipped.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shipped.map((project, i) => (
            <Reveal key={project.title} delay={i * 80} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}

      {planned.length > 0 && (
        <ul className="divide-y-2 divide-ink border-b-2 border-ink">
          {planned.map((project, i) => (
            <li key={project.title} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4">
              <span className="w-8 font-mono text-sm text-zinc-500">{String(i + 1).padStart(2, '0')}</span>
              <span className="min-w-40 font-display text-lg uppercase tracking-tight">{project.title}</span>
              <span className="flex-1 text-zinc-400">{project.hint}</span>
              <span className="text-sm text-zinc-500">In progress</span>
            </li>
          ))}
        </ul>
      )}

      {shipped.length === 0 && (
        <p className="mt-8 text-sm">
          <Link to="/lab" className="font-semibold underline underline-offset-4">
            Browse the Lab
          </Link>
        </p>
      )}
    </Section>
  )
}
