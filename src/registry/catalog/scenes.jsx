import ScrollDrum from '../components/scroll-drum.tsx'
import ClosingScene from '../components/closing-scene.tsx'
import { color, num, text } from '../controls.js'

// A page's worth of rows for the drum demo
const directions = [
  ['Type on its *own*', 'Only words and colour'],
  ['One huge number', 'A single figure, set large'],
  ['The calm grid', 'Even tiles, edge to edge'],
  ['Colour *blocks*', 'A colour for every section'],
  ['The poster', 'One thing stays put'],
  ['Soft *shadows*', 'Depth without borders'],
  ['Sharp *edges*', 'Square corners, hard lines'],
  ['Editorial columns', 'Set like a magazine'],
  ['The product, *large*', 'The interface is the hero'],
  ['A single *motif*', 'One shape runs through it'],
  ['Dark and *glowing*', 'Lit things in the dark'],
  ['Paper and *ink*', 'Warm neutrals, one accent'],
  ['Loud and flat', 'Like a street poster'],
  ['Big *numbers*', 'Stats as the headline'],
  ['Split *screen*', 'One half never moves'],
  ['The contact *sheet*', 'All the work, small'],
  ['Round *everything*', 'Soft, friendly shapes'],
].map(([name, caption]) => ({ name, caption }))

// Scenes are as tall as a few screens and pin their content while you scroll.
// In small cards they play by themselves; on their own page they follow the
// scroll of the preview, so scroll inside it to try them.
const scene = (slug, name, description, controls, render, usage) => ({
  slug,
  name,
  category: 'Scenes',
  fill: true,
  description,
  controls,
  demo: ({ preview, props }) =>
    preview ? (
      <div className="absolute inset-0">{render({ ...props, autoPlay: true })}</div>
    ) : (
      <div className="scroll-thin absolute inset-0 overflow-y-auto">
        {render(props)}
        <div className="grid h-40 place-items-center bg-[#140a05] font-mono text-xs text-[#fff6ef]/50">end of the scene</div>
      </div>
    ),
  usage,
})

export default [
  scene(
    'scroll-drum',
    'Scroll Drum',
    'A slot-machine drum for your scroll. Rows sit on a 3D cylinder that turns as you scroll, the middle one lights up, a counter rolls and a few cards are dealt at the end.',
    {
      eyebrow: text('Label', 'The draw'),
      title1: text('Heading, line 1', 'Twenty directions.'),
      title2: text('Heading, line 2', 'Three dealt per page.'),
      closing: text('Closing line', 'Pick the one that fits.'),
      buttonLabel: text('Button', 'See how it works'),
      hold: num('Scroll distance (screens)', 2.8, 1, 6, 0.1),
      accent: color('Accent colour', '#e8500e'),
    },
    ({ title1, title2, ...rest }) => <ScrollDrum {...rest} title={[title1, title2]} items={directions} />,
    (p) => `<ScrollDrum
  eyebrow="${p.eyebrow}"
  title={['${p.title1}', '${p.title2}']}
  closing="${p.closing}"
  buttonLabel="${p.buttonLabel}"
  hold={${p.hold}}
  accent="${p.accent}"
  items={[
    { name: 'Type on its *own*', caption: 'Only words and colour' },
    { name: 'The calm grid', caption: 'Even tiles, edge to edge' },
    // ...one entry per row. *Stars* make a word italic.
  ]}
/>`,
  ),
  scene(
    'closing-scene',
    'Closing Scene',
    'A closing line on a pinned screen. Both lines fade in on orange, night slides down, the first line melts away and the second is lit from below like a sunrise.',
    {
      lead: text('First line', 'Stop guessing,'),
      emphasis: text('Second line', 'start deciding.'),
      buttonLabel: text('Button', 'Get started'),
      hold: num('Scroll distance (screens)', 2.3, 1, 5, 0.1),
    },
    (p) => <ClosingScene {...p} />,
    (p) => `<ClosingScene
  lead="${p.lead}"
  emphasis="${p.emphasis}"
  buttonLabel="${p.buttonLabel}"
  buttonHref="/signup"
  hold={${p.hold}}
/>`,
  ),
]
