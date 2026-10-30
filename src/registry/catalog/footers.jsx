import RevealFooter from '../components/reveal-footer.tsx'
import MarqueeFooter from '../components/marquee-footer.tsx'
import ColumnsFooter from '../components/columns-footer.tsx'
import { color, jsx, num, text } from '../controls.js'
import { site } from '../../data/site.js'

// Footers sit at the bottom of the stage, like they would on a real page
const footer = (slug, name, Component, description, controls, extra = {}) => ({
  slug,
  name,
  category: 'Footers',
  fill: true,
  description,
  controls,
  // In small cards the footer is shrunk to fit; on its own page it scrolls
  demo: ({ preview, props }) => (
    <div className="scroll-thin flex size-full flex-col overflow-y-auto">
      <div className="mt-auto w-full" style={{ zoom: preview ? 0.5 : 1 }}>
        <Component {...props} {...extra} />
      </div>
    </div>
  ),
  usage: (p) => jsx(name.replace(/ /g, ''), p),
})

export default [
  footer(
    'reveal-footer',
    'Reveal Footer',
    RevealFooter,
    'Your name in giant letters that rise one by one as the footer scrolls in, plus a live local clock.',
    {
      brand: text('Name', 'SUSHANT'),
      location: text('Location', 'India'),
      timeZone: text('Time zone', 'Asia/Kolkata'),
      accent: color('Accent colour', '#c6f432'),
    },
  ),
  footer(
    'marquee-footer',
    'Marquee Footer',
    MarqueeFooter,
    'A loud "let’s talk" footer: huge scrolling words, a copy-on-click email and social pills.',
    {
      email: text('Email', site.email),
      speed: num('Seconds per loop', 18, 4, 60),
      accent: color('Background colour', '#c6f432'),
    },
  ),
  footer(
    'columns-footer',
    'Columns Footer',
    ColumnsFooter,
    'Link columns and a newsletter form, with a glow and grid that follow your cursor.',
    {
      brand: text('Brand', 'Acme Lab'),
      tagline: text('Tagline', 'Interfaces that feel alive. Free to copy, built with React and Tailwind.'),
      status: text('Status text', 'All systems normal'),
      glowColor: color('Glow colour', '#c6f432'),
    },
  ),
]
