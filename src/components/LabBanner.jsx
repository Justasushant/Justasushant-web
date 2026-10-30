import { Link } from 'react-router'
import Reveal from './Reveal.jsx'
import { categories, components } from '../registry/index.jsx'

// A plain call to action that sends people to the Lab
export default function LabBanner() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 2xl:px-16">
      <Reveal>
        <div className="panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="font-display text-3xl uppercase leading-none tracking-tight sm:text-5xl">The Lab</h2>
            <p className="mt-3 text-zinc-400">
              {components.length} components across {categories.length} categories. Copy any of them in TSX or JSX.
            </p>
          </div>
          <Link to="/lab" className="ink-btn shrink-0 text-sm">
            Open the Lab →
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
