// Renders the social preview image (og-image.png) and the PNG app icons into
// public/. Run it again after changing the name, the domain or the favicon:
//   node scripts/make-images.mjs
import { readFile, readdir, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const host = (process.env.VITE_SITE_URL || 'https://sushant.coneiz.com').replace(/^https?:\/\//, '').replace(/\/+$/, '')
const count = (await readdir('src/registry/components')).filter((f) => f.endsWith('.tsx')).length

const sans = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
const mono = "Consolas, 'Courier New', monospace"

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.05" />
    </pattern>
    <radialGradient id="glow" cx="88%" cy="18%" r="55%">
      <stop offset="0" stop-color="#c6f432" stop-opacity="0.16" />
      <stop offset="1" stop-color="#c6f432" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#09090b" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <text x="80" y="118" font-family="${mono}" font-size="22" letter-spacing="3" fill="#a1a1aa">CO-FOUNDER, CONEIZ ENTERPRISES</text>
  <text x="74" y="290" font-family="${sans}" font-weight="700" font-size="132" letter-spacing="-5" fill="#fafafa">Sushant</text>
  <text x="74" y="412" font-family="${sans}" font-weight="700" font-size="132" letter-spacing="-5" fill="none" stroke="#fafafa" stroke-opacity="0.6" stroke-width="2">Sharma</text>
  <circle cx="530" cy="402" r="14" fill="#c6f432" />
  <text x="80" y="492" font-family="${sans}" font-size="32" fill="#d4d4d8">Frontend developer. ${count} free React + Tailwind UI components.</text>
  <text x="80" y="556" font-family="${mono}" font-size="24" fill="#c6f432">${host}/lab</text>

  <!-- A few Lab pieces on the right -->
  <g transform="translate(820 150)">
    <rect width="300" height="88" rx="44" fill="#18181b" stroke="#ffffff" stroke-opacity="0.12" />
    <text x="150" y="55" text-anchor="middle" font-family="${sans}" font-weight="600" font-size="26" fill="#fafafa">Explore the Lab →</text>
  </g>
  <g transform="translate(820 270)">
    <rect width="300" height="150" rx="22" fill="#18181b" stroke="#ffffff" stroke-opacity="0.12" />
    <rect x="28" y="30" width="96" height="52" rx="26" fill="#c6f432" />
    <circle cx="98" cy="56" r="20" fill="#ffffff" />
    <circle cx="186" cy="56" r="11" fill="#c6f432" />
    <circle cx="222" cy="56" r="11" fill="#c6f432" fill-opacity="0.6" />
    <circle cx="258" cy="56" r="11" fill="#c6f432" fill-opacity="0.3" />
    <rect x="28" y="106" width="244" height="12" rx="6" fill="#ffffff" fill-opacity="0.08" />
    <rect x="28" y="106" width="150" height="12" rx="6" fill="#c6f432" />
  </g>
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

console.log(`Wrote og-image.png and icons for ${host} (${count} components)`)
