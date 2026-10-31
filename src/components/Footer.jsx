import { Link } from 'react-router'
import ConeizLogo from './ConeizLogo.jsx'
import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-ink text-paper">
      <div className="mx-auto flex flex-col gap-3 px-4 py-8 text-sm text-zinc-800 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10 2xl:px-16">
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          © {new Date().getFullYear()} {site.name} · {site.companyRole},
          <a href={site.companyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-paper hover:underline">
            <ConeizLogo className="size-4" />
            {site.company}
          </a>
        </p>
        <div className="flex gap-5">
          <Link to="/lab" className="hover:text-paper hover:underline">
            Lab
          </Link>
          <Link to="/open-source" className="hover:text-paper hover:underline">
            Open source
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-paper hover:underline">
            Email
          </a>
          <a href={site.whatsapp.link} target="_blank" rel="noreferrer" className="hover:text-paper hover:underline">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
