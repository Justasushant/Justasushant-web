import MangaUI from '../components/manga-ui.tsx'

// Whole pages. In cards they're shrunk to fit; on their own Lab page they
// scroll inside the preview, and each has a full-page version too.
export default [
  {
    slug: 'manga-ui',
    name: 'Manga UI',
    category: 'Templates',
    fill: true,
    fullPage: '/templates/manga-ui',
    description:
      'A full landing page inked like a manga: panels, screentone, focus lines, ASCII art, paper grain and a flip-through book.',
    controls: {},
    demo: ({ preview }) => (
      <div className="scroll-thin absolute inset-0 overflow-y-auto">
        <div style={{ zoom: preview ? 0.42 : 0.8 }}>
          <MangaUI />
        </div>
      </div>
    ),
    page: MangaUI,
    usage: `<MangaUI />`,
  },
]
