// Turns page metadata (see meta.js) into <head> tags. The same list is
// rendered to HTML at build time and applied to the live document at runtime.
import { site } from '../data/site.js'
import { OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from './meta.js'

export function headTags(meta) {
  const url = absoluteUrl(meta.path)
  const image = `${SITE_URL}${meta.image ?? OG_IMAGE}`
  const imageAlt = `${site.name}: frontend developer and React UI component Lab`

  return [
    ['meta', { name: 'description', content: meta.description }],
    ['meta', { name: 'keywords', content: meta.keywords.join(', ') }],
    ['meta', { name: 'author', content: site.name }],
    [
      'meta',
      {
        name: 'robots',
        content: meta.noindex
          ? 'noindex, follow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    ],
    ['link', { rel: 'canonical', href: url }],
    ['meta', { property: 'og:type', content: meta.type ?? 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:title', content: meta.title }],
    ['meta', { property: 'og:description', content: meta.description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: imageAlt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: meta.title }],
    ['meta', { name: 'twitter:description', content: meta.description }],
    ['meta', { name: 'twitter:image', content: image }],
    ['meta', { name: 'twitter:image:alt', content: imageAlt }],
  ]
}

export const jsonLd = (meta) =>
  meta.jsonLd.length ? { '@context': 'https://schema.org', '@graph': meta.jsonLd } : null

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Static HTML for the build
export function renderHead(meta) {
  const tags = headTags(meta).map(([tag, attrs]) => {
    const html = Object.entries(attrs)
      .map(([k, v]) => `${k}="${escapeHtml(v)}"`)
      .join(' ')
    return `<${tag} ${html} />`
  })
  const data = jsonLd(meta)
  if (data) {
    // "<" is escaped so a description can never close the script tag early
    const json = JSON.stringify(data).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json" data-seo="jsonld">${json}</script>`)
  }
  return [`<title>${escapeHtml(meta.title)}</title>`, ...tags].join('\n    ')
}

// Fallback content for crawlers and visitors without JavaScript
export function renderNoscript(meta) {
  const { heading, text, links } = meta.noscript ?? {}
  if (!heading) return ''
  const items = links
    .map(([label, path]) => `<li><a href="${escapeHtml(path)}">${escapeHtml(label)}</a></li>`)
    .join('')
  return `<noscript><main><h1>${escapeHtml(heading)}</h1>${
    text ? `<p>${escapeHtml(text)}</p>` : ''
  }<ul>${items}</ul></main></noscript>`
}

// Live updates in the browser: update tags in place, add missing ones
export function applyHead(meta) {
  document.title = meta.title

  for (const [tag, attrs] of headTags(meta)) {
    const key = attrs.name ? 'name' : attrs.property ? 'property' : 'rel'
    let el = document.head.querySelector(`${tag}[${key}="${attrs[key]}"]`)
    if (!el) {
      el = document.createElement(tag)
      document.head.appendChild(el)
    }
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
  }

  document.head.querySelectorAll('script[data-seo="jsonld"]').forEach((el) => el.remove())
  const data = jsonLd(meta)
  if (data) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seo = 'jsonld'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
}
