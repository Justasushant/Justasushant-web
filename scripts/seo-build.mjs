// Runs after `vite build`. Writes one HTML file per page with that page's own
// <head> (title, description, canonical, social tags, structured data), so
// search engines and link previews get the right tags without running any
// JavaScript. Also writes sitemap.xml, robots.txt, llms.txt and 404.html.
//
// The page data comes from src/seo/meta.js, the same file the app uses.
import { execSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { createServer } from 'vite'

const dist = path.resolve('dist')

// Load the app's SEO modules through Vite, so JSX/TSX imports just work
const vite = await createServer({
  configFile: false,
  plugins: [react()],
  appType: 'custom',
  server: { middlewareMode: true },
  logLevel: 'error',
})

try {
  const { SITE_URL, absoluteUrl, allPages, notFoundMeta } = await vite.ssrLoadModule('/src/seo/meta.js')
  const { renderHead, renderNoscript } = await vite.ssrLoadModule('/src/seo/head.js')

  const template = await readFile(path.join(dist, 'index.html'), 'utf8')
  if (!template.includes('<!-- seo -->') || !template.includes('<!-- seo:noscript -->')) {
    throw new Error('dist/index.html is missing the <!-- seo --> markers from index.html')
  }

  const pageHtml = (meta) =>
    template
      .replace(/<!-- seo -->[\s\S]*?<!-- \/seo -->/, renderHead(meta))
      .replace('<!-- seo:noscript -->', renderNoscript(meta))

  const pages = allPages()
  const warnings = []

  for (const meta of pages) {
    if (meta.title.length > 70) warnings.push(`title is ${meta.title.length} chars: ${meta.path}`)
    if (meta.description.length > 160) warnings.push(`description is ${meta.description.length} chars: ${meta.path}`)
    // /lab/flow-field -> dist/lab/flow-field/index.html
    const file = meta.path === '/' ? path.join(dist, 'index.html') : path.join(dist, meta.path, 'index.html')
    await mkdir(path.dirname(file), { recursive: true })
    await writeFile(file, pageHtml(meta))
  }

  await writeFile(path.join(dist, '404.html'), pageHtml(notFoundMeta('/404')))

  // Last commit date, so search engines only re-crawl when something changed
  let lastmod = new Date().toISOString().slice(0, 10)
  try {
    lastmod = execSync('git log -1 --format=%cs', { encoding: 'utf8' }).trim() || lastmod
  } catch {}

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${absoluteUrl(p.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap)

  await writeFile(
    path.join(dist, 'robots.txt'),
    `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
  )

  // A plain-text map of the site for AI assistants and LLM crawlers
  const [home, lab, ...rest] = pages
  const componentPages = rest.filter((p) => p.path.startsWith('/lab/'))
  const others = rest.filter((p) => !p.path.startsWith('/lab/'))
  await writeFile(
    path.join(dist, 'llms.txt'),
    `# ${home.title}

> ${home.description}

## Main pages

- [Home](${absoluteUrl(home.path)}): ${home.description}
- [Lab](${absoluteUrl(lab.path)}): ${lab.description}
${others.map((p) => `- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`).join('\n')}

## UI components

${componentPages.map((p) => `- [${p.title.split(':')[0]}](${absoluteUrl(p.path)}): ${p.description}`).join('\n')}
`,
  )

  console.log(`SEO: wrote ${pages.length} pages, 404.html, sitemap.xml, robots.txt and llms.txt for ${SITE_URL}`)
  if (warnings.length) console.warn(`SEO warnings:\n  ${warnings.join('\n  ')}`)
} finally {
  await vite.close()
}
