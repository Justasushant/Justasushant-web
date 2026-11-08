import { Link } from 'react-router'
import ConeizLogo from './ConeizLogo.jsx'
import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="bg-[#140a05] text-[#fff6ef]/60">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          © {new Date().getFullYear()} {site.name} · {site.companyRole},
          <a href={site.companyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#fff6ef]">
            <ConeizLogo className="size-4" />
            {site.company}
          </a>
        </p>
        <div className="flex gap-5">
          <Link to="/lab" className="transition-colors hover:text-[#fff6ef]">
            Lab
          </Link>
          <Link to="/open-source" className="transition-colors hover:text-[#fff6ef]">
            Open source
          </Link>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-[#fff6ef]">
            Email
          </a>
          <a href={site.whatsapp.link} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#fff6ef]">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
