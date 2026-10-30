// Renders the social preview image (og-image.png) and the PNG app icons into
// public/. Run it again after changing the name, the domain or the favicon:
//   node scripts/make-images.mjs
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const host = (process.env.VITE_SITE_URL || 'https://sushant.coneiz.com').replace(/^https?:\/\//, '').replace(/\/+$/, '')

// The site's manga palette: ink on paper
const ink = '#22211f'
const paper = '#f2efe6'
const heavy = "'Arial Black', 'Segoe UI Black', Impact, sans-serif"
const sans = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
const mono = "Consolas, 'Courier New', monospace"

// No numbers on the card, so it never goes out of date
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="tone" width="9" height="9" patternUnits="userSpaceOnUse">
      <circle cx="4.5" cy="4.5" r="1.5" fill="${ink}" />
    </pattern>
    <linearGradient id="fade" x1="1" y1="0" x2="0.35" y2="0.6">
      <stop offset="0" stop-color="#fff" stop-opacity="0.55" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </linearGradient>
    <mask id="toneMask"><rect width="1200" height="630" fill="url(#fade)" /></mask>
  </defs>

  <rect width="1200" height="630" fill="${paper}" />
  <rect width="1200" height="630" fill="url(#tone)" mask="url(#toneMask)" />
  <rect x="30" y="30" width="1140" height="570" fill="none" stroke="${ink}" stroke-width="6" />

  <rect x="80" y="82" width="440" height="40" fill="${ink}" />
  <text x="98" y="109" font-family="${mono}" font-weight="700" font-size="20" letter-spacing="2" fill="${paper}">CO-FOUNDER, CONEIZ ENTERPRISES</text>

  <text x="76" y="300" font-family="${heavy}" font-size="128" letter-spacing="-3" fill="${ink}">SUSHANT</text>
  <text x="76" y="428" font-family="${heavy}" font-size="128" letter-spacing="-3" fill="none" stroke="${ink}" stroke-width="3">SHARMA.</text>

  <text x="80" y="494" font-family="${sans}" font-size="32" fill="${ink}">Frontend developer · Free React UI components</text>
  <text x="80" y="550" font-family="${mono}" font-weight="700" font-size="24" fill="${ink}">${host}</text>

  <!-- Speech bubble -->
  <path d="M940 222 L912 268 L978 226 Z" fill="${paper}" stroke="${ink}" stroke-width="5" stroke-linejoin="round" />
  <ellipse cx="962" cy="160" rx="182" ry="70" fill="${paper}" stroke="${ink}" stroke-width="5" />
  <path d="M935 222 L976 226" stroke="${paper}" stroke-width="8" />
  <text x="962" y="172" text-anchor="middle" font-family="${heavy}" font-size="27" fill="${ink}">Copy. Paste. Ship.</text>

  <!-- The Lab, as a black panel with a hard shadow -->
  <rect x="840" y="338" width="300" height="168" fill="${ink}" fill-opacity="0.35" />
  <rect x="830" y="328" width="300" height="168" fill="${ink}" />
  <text x="856" y="400" font-family="${heavy}" font-size="40" fill="${paper}">THE LAB</text>
  <text x="856" y="452" font-family="${mono}" font-size="18" fill="${paper}">React + Tailwind CSS</text>
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
