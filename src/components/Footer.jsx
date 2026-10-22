import { Link } from 'react-router'
import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex flex-col gap-3 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10 2xl:px-16">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.companyRole}, {site.company}
        </p>
        <div className="flex gap-5">
          <Link to="/lab" className="hover:text-white">
            Lab
          </Link>
          <Link to="/open-source" className="hover:text-white">
            Open source
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            Email
          </a>
          <a href={site.whatsapp.link} target="_blank" rel="noreferrer" className="hover:text-white">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
