// SEO for every page lives here. The app uses it to update the <head> as you
// navigate, and the build (scripts/seo-build.mjs) uses the same data to write
// a static HTML file per page, plus the sitemap, robots.txt and llms.txt.
import { site } from '../data/site.js'
import { categories, components, getComponent } from '../registry/index.jsx'

// Set VITE_SITE_URL (e.g. in .env) if the site moves to another domain
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://sushant.coneiz.com').replace(/\/+$/, '')
export const SITE_NAME = `${site.name} · UI Lab`
export const OG_IMAGE = '/og-image.png'

const count = components.length

// How each Lab category reads in a sentence ("a free React loader")
const categoryNoun = {
  Backgrounds: 'background',
  Buttons: 'button',
  Cards: 'card',
  Elements: 'UI element',
  Footers: 'footer',
  'Hero Sections': 'hero section',
  Templates: 'website template',
  Loaders: 'loader',
  Text: 'text effect',
  Transitions: 'page transition',
}

const baseKeywords = [
  'Sushant Sharma',
  'frontend developer',
  'React developer',
  'UI engineer',
  'CONEIZ Enterprises',
  'React UI components',
  'Tailwind CSS components',
  'free UI components',
  'copy paste components',
  'TSX components',
  'JSX components',
]

export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '/' : path}`

// Search snippets cut off around 155-160 characters, so stop at a word before that
const clip = (text, max = 158) => {
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[\s,.;:]+$/, '')}…`
}

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: absoluteUrl('/'),
  worksFor: { '@id': `${SITE_URL}/#organization` },
  knowsAbout: ['React', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'UI design', 'Web animation'],
  sameAs: site.socials.filter((s) => s.url).map((s) => s.url),
}

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: site.company,
  founder: { '@id': `${SITE_URL}/#person` },
}

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: absoluteUrl('/'),
  name: SITE_NAME,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#person` },
}

const breadcrumbs = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: absoluteUrl(path),
  })),
})

const homeMeta = () => ({
  path: '/',
  title: `${site.name}: Frontend Developer & React UI Component Lab`,
  description: clip(
    `${site.name}, frontend developer and co-founder of ${site.company}. Browse ${count} free React and Tailwind CSS UI components with live demos and TSX/JSX code.`,
  ),
  keywords: [...baseKeywords, 'portfolio', 'React portfolio', 'web developer India'],
  type: 'profile',
  priority: 1,
  changefreq: 'weekly',
  jsonLd: [website, person, organization, { '@type': 'ProfilePage', url: absoluteUrl('/'), mainEntity: { '@id': person['@id'] } }],
  noscript: {
    heading: `${site.name}, frontend developer`,
    text: site.tagline,
    links: [
      ['UI component Lab', '/lab'],
      ['Open source', '/open-source'],
    ],
  },
})

const labMeta = () => ({
  path: '/lab',
  title: `${count} Free React & Tailwind UI Components | ${site.name}`,
  description: clip(
    `${count} free React + Tailwind components: buttons, backgrounds, cards, loaders, text effects and page transitions. Live demos, editable props, TSX and JSX code.`,
  ),
  keywords: [
    ...baseKeywords,
    'React component library',
    'Tailwind UI components free',
    'animated React components',
    'React animation components',
    'shadcn alternative',
    ...categories.map((c) => `React ${categoryNoun[c]} components`),
  ],
  type: 'website',
  priority: 0.9,
  changefreq: 'weekly',
  jsonLd: [
    {
      '@type': 'CollectionPage',
      url: absoluteUrl('/lab'),
      name: `${site.name}'s UI Lab`,
      description: `${count} free React and Tailwind CSS UI components.`,
      isPartOf: { '@id': website['@id'] },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: count,
        itemListElement: components.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          url: absoluteUrl(`/lab/${c.slug}`),
        })),
      },
    },
    breadcrumbs([
      ['Home', '/'],
      ['Lab', '/lab'],
    ]),
  ],
  noscript: {
    heading: `${count} free React UI components`,
    text: 'Buttons, backgrounds, cards, loaders, text effects and page transitions, each with TSX and JSX code.',
    links: components.map((c) => [`${c.name} (${c.category})`, `/lab/${c.slug}`]),
  },
})

const componentMeta = (item) => {
  const noun = categoryNoun[item.category] ?? 'component'
  const lower = item.name.toLowerCase()
  const long = `${item.name}: Free React ${noun[0].toUpperCase()}${noun.slice(1)} Component | ${site.name}`
  return {
    path: `/lab/${item.slug}`,
    title: long.length <= 70 ? long : `${item.name}: Free React ${noun} component`,
    // Use the longest second sentence that still fits in a search snippet
    description: clip(
      [
        `A free React + Tailwind CSS ${noun} with a live demo, editable props and copy-paste TSX or JSX code.`,
        `Free React + Tailwind ${noun} with a live demo and TSX/JSX code.`,
        `Free React ${noun}, TSX and JSX.`,
      ]
        .map((suffix) => `${item.description} ${suffix}`)
        .find((text) => text.length <= 158) ?? item.description,
    ),
    keywords: [
      item.name,
      `React ${lower}`,
      `${lower} component`,
      `Tailwind ${lower}`,
      `React ${noun} component`,
      `Tailwind CSS ${noun}`,
      `animated ${noun} React`,
      `${lower} TSX`,
      `${lower} JSX`,
      'free React components',
      'copy paste UI components',
      site.name,
    ],
    type: 'article',
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: [
      {
        '@type': 'SoftwareSourceCode',
        name: item.name,
        description: item.description,
        url: absoluteUrl(`/lab/${item.slug}`),
        programmingLanguage: ['TypeScript', 'JavaScript'],
        runtimePlatform: 'React',
        keywords: `${item.category}, React, Tailwind CSS, TSX, JSX`,
        isAccessibleForFree: true,
        author: { '@id': person['@id'] },
        isPartOf: { '@id': website['@id'] },
      },
      breadcrumbs([
        ['Home', '/'],
        ['Lab', '/lab'],
        [item.category, `/lab?category=${encodeURIComponent(item.category)}`],
        [item.name, `/lab/${item.slug}`],
      ]),
    ],
    noscript: {
      heading: `${item.name}, a React ${noun}`,
      text: item.description,
      links: [['All components', '/lab']],
    },
  }
}

const openSourceMeta = () => ({
  path: '/open-source',
  title: `Open Source (Coming Soon) | ${site.name}`,
  description: clip(
    `${site.name}'s open-source projects are coming soon. He is busy remixing other people's components. Try the terminal mode, or grab free React components from the Lab.`,
  ),
  keywords: [...baseKeywords, 'open source', 'GitHub projects', 'React open source'],
  type: 'website',
  priority: 0.4,
  changefreq: 'monthly',
  jsonLd: [
    {
      '@type': 'WebPage',
      url: absoluteUrl('/open-source'),
      name: 'Open source',
      isPartOf: { '@id': website['@id'] },
    },
    breadcrumbs([
      ['Home', '/'],
      ['Open source', '/open-source'],
    ]),
  ],
  noscript: {
    heading: 'Open source: coming soon',
    text: 'Too busy building other things. The Lab is open, though.',
    links: [['UI component Lab', '/lab']],
  },
})

export const notFoundMeta = (path = '/404') => ({
  path,
  title: `Page not found | ${site.name}`,
  description: 'This page does not exist. Head back to the home page or browse the UI component Lab.',
  keywords: baseKeywords,
  type: 'website',
  noindex: true,
  jsonLd: [],
  noscript: { heading: 'Page not found', text: '', links: [['Home', '/'], ['Lab', '/lab']] },
})

// The metadata for whatever page is at `pathname`
export function metaFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return homeMeta()
  if (path === '/lab') return labMeta()
  if (path === '/open-source') return openSourceMeta()
  // A template's full-page view shares its Lab page's metadata (and canonical URL)
  const match = path.match(/^\/lab\/([\w-]+)$/) || path.match(/^\/templates\/([\w-]+)$/)
  const item = match && getComponent(match[1])
  return item ? componentMeta(item) : notFoundMeta(path)
}

// Every page that should be in the sitemap
export function allPages() {
  return [homeMeta(), labMeta(), ...components.map(componentMeta), openSourceMeta()]
}
