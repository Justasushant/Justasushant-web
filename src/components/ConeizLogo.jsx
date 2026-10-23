import { site } from '../data/site.js'

// The CONEIZ mark, shown next to the company name
export default function ConeizLogo({ className = 'size-4' }) {
  return (
    <img
      src={site.companyLogo}
      alt=""
      aria-hidden
      width="128"
      height="128"
      loading="lazy"
      decoding="async"
      className={`inline-block shrink-0 object-contain ${className}`}
    />
  )
}
