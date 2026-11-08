import MangaHero from '../components/manga-hero.tsx'
import { color, jsx, text } from '../controls.js'

const hero = (slug, name, Component, description, controls) => ({
  slug,
  name,
  category: 'Hero Sections',
  fill: true,
  description,
  controls,
  demo: ({ preview, props }) => (
    <div className="scroll-thin absolute inset-0 overflow-y-auto">
      <div style={{ zoom: preview ? 0.5 : 1, height: preview ? '200%' : '100%' }}>
        <Component {...props} className="min-h-full" />
      </div>
    </div>
  ),
  usage: (p) => jsx(name.replace(/ /g, ''), p),
})

export default [
  hero('manga-hero', 'Manga Hero', MangaHero, 'A hero laid out as a manga page: slanted gutters, a title panel, a close-up of intense eyes and a narration panel.', {
    title: text('Title', 'Every page tells a story.'),
    speech: text('Speech bubble', 'This is only the first chapter!'),
    sfx: text('Sound effect', 'ゴゴゴ'),
    cta: text('Button', 'Start reading'),
  }),
]
