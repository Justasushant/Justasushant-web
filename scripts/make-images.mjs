// Renders the social preview image (og-image.png) and the PNG app icons into
// public/. Run it again after changing the name, the domain or the favicon:
//   node scripts/make-images.mjs
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const host = (process.env.VITE_SITE_URL || 'https://sushant.coneiz.com').replace(/^https?:\/\//, '').replace(/\/+$/, '')

const cream = '#fff6ef'
const sans = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

// Dark, with a glow rising from the bottom, like the site's hero. No numbers,
// so the card never goes out of date.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ff5b14" />
      <stop offset="0.38" stop-color="#e0480c" stop-opacity="0.9" />
      <stop offset="0.7" stop-color="#c2410c" stop-opacity="0.3" />
      <stop offset="1" stop-color="#c2410c" stop-opacity="0" />
    </radialGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.09 0" />
    </filter>
  </defs>
  <rect width="1200" height="630" fill="#140a05" />
  <ellipse cx="600" cy="700" rx="820" ry="360" fill="url(#glow)" />
  <rect width="1200" height="630" filter="url(#grain)" />

  <rect x="450" y="78" width="300" height="38" rx="19" fill="#ffffff" fill-opacity="0.1" stroke="#ffffff" stroke-opacity="0.15" />
  <text x="600" y="103" text-anchor="middle" font-family="${sans}" font-size="18" fill="${cream}" fill-opacity="0.9">Co-founder, CONEIZ Enterprises</text>

  <text x="600" y="262" text-anchor="middle" font-family="${sans}" font-weight="700" font-size="140" letter-spacing="-6" fill="${cream}">Sushant</text>
  <text x="600" y="394" text-anchor="middle" font-family="${sans}" font-weight="700" font-size="140" letter-spacing="-6" fill="${cream}">Sharma</text>

  <text x="600" y="462" text-anchor="middle" font-family="${sans}" font-size="30" fill="${cream}" fill-opacity="0.75">Frontend developer. Free React components, ready to copy.</text>
  <text x="600" y="580" text-anchor="middle" font-family="${sans}" font-weight="600" font-size="24" fill="${cream}">${host}</text>
</svg>`

await writeFile('public/og-image.png', await sharp(Buffer.from(og)).png().toBuffer())

const favicon = await readFile('public/favicon.svg')
for (const [file, size] of [
  ['public/apple-touch-icon.png', 180],
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
]) {
  await writeFile(file, await sharp(favicon, { density: 600 }).resize(size, size).png().toBuffer())
}

console.log(`Wrote og-image.png and icons for ${host}`)
