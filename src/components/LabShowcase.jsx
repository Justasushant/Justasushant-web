import { Link } from 'react-router'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import LabCard from './LabCard.jsx'
import { featured } from '../data/site.js'
import { getComponent } from '../registry/index.jsx'

export default function LabShowcase() {
  return (
    <Section
      id="lab"
      label="From the Lab"
      title="Live components, ready to copy."
      intro="They are live, so try them here, or open one for the code."
      action={
        <Link to="/lab" className="ink-btn ghost">
          All components
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
