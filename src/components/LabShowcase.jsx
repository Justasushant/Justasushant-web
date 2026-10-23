import { Link } from 'react-router'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import LabCard from './LabCard.jsx'
import { featured } from '../data/site.js'
import { components, getComponent } from '../registry/index.jsx'

export default function LabShowcase() {
  return (
    <Section
      id="lab"
      label="Lab"
      title="From the Lab"
      intro="A few favourites. They're live, so play with them here, or open one to get the code."
      action={
        <Link
          to="/lab"
          className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Browse all {components.length} components
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {featured.map((slug, i) => (
          <Reveal key={slug} delay={(i % 2) * 100} className="h-full">
            <LabCard item={getComponent(slug)} height="h-40 sm:h-72" compact />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
