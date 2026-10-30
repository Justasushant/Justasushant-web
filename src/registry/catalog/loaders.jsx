import MangaLoader from '../components/manga-loader.tsx'
import SpiderLoader from '../components/spider-loader.tsx'
import DotsLoader from '../components/dots-loader.tsx'
import BarsLoader from '../components/bars-loader.tsx'
import RingLoader from '../components/ring-loader.tsx'
import OrbitLoader from '../components/orbit-loader.tsx'
import PulseLoader from '../components/pulse-loader.tsx'
import GridLoader from '../components/grid-loader.tsx'
import InfinityLoader from '../components/infinity-loader.tsx'
import TextLoader from '../components/text-loader.tsx'
import CubeLoader from '../components/cube-loader.tsx'
import MorphLoader from '../components/morph-loader.tsx'
import { color, colors, jsx, num, text } from '../controls.js'
import { pascal } from './shared.jsx'

const loader = (slug, name, Component, description, controls) => ({
  slug,
  name,
  category: 'Loaders',
  description,
  controls: { color: color('Colour', '#c6f432'), ...controls },
  demo: ({ props }) => <Component {...props} />,
  usage: (p) => jsx(pascal(slug), p),
})

const size = (value, min, max) => num('Size (px)', value, min, max)

export default [
  loader('dots-loader', 'Dots Loader', DotsLoader, 'Three balls bouncing in turn, squashing as they land, with shadows on the floor.', {
    size: size(14, 4, 40),
  }),
  loader('bars-loader', 'Bars Loader', BarsLoader, 'An equaliser of bars pulsing in a wave.', {
    bars: num('Bars', 5, 2, 14),
  }),
  loader('ring-loader', 'Ring Loader', RingLoader, 'A glowing arc that stretches and shrinks as it spins, like Material Design.', {
    size: size(52, 16, 160),
    thickness: num('Thickness (px)', 4, 1, 20),
  }),
  loader('orbit-loader', 'Orbit Loader', OrbitLoader, 'An atom: three tilted orbits with electrons racing around a pulsing core.', {
    size: size(84, 24, 180),
  }),
  loader('pulse-loader', 'Pulse Loader', PulseLoader, 'A heartbeat line tracing across a monitor.', {
    size: num('Width (px)', 120, 48, 320),
  }),
  loader('grid-loader', 'Grid Loader', GridLoader, 'A 3×3 grid of squares shrinking in a diagonal wave.', {
    size: size(14, 4, 32),
  }),
  loader('infinity-loader', 'Infinity Loader', InfinityLoader, 'A glowing comet with a fading tail racing around a figure eight.', {
    size: size(140, 32, 280),
  }),
  loader('text-loader', 'Text Loader', TextLoader, 'Letters lighting up one by one.', {
    text: text('Text', 'Loading'),
  }),
  loader('cube-loader', 'Cube Loader', CubeLoader, 'A shaded 3D cube that hops and turns, with its shadow on the floor.', {
    size: size(44, 16, 120),
  }),
  {
    ...loader('morph-loader', 'Morph Loader', MorphLoader, 'Gooey gradient blobs that melt into each other and pull apart.', {}),
    controls: {
      colors: colors('Gradient colours', ['#c6f432', '#22d3ee']),
      size: size(56, 16, 160),
    },
  },
  {
    ...loader('spider-loader', 'Spider Loader', SpiderLoader, 'A spider spins an orb web: spokes first, then it walks the spiral laying silk. The web fades and it starts again.', {}),
    controls: {
      color: color('Spider colour', '#e11d48'),
      webColor: color('Web colour', '#d4d4d8'),
      size: num('Size (px)', 140, 40, 260),
      speed: num('Seconds per web', 3.6, 1.5, 10, 0.1),
    },
  },
  {
    slug: 'manga-loader',
    name: 'Manga Loader',
    category: 'Loaders',
    fill: true,
    description: 'A loading manga page: panels ink themselves in one at a time, the last one shouts "!", then the page wipes clean.',
    controls: {
      label: text('Label', 'Loading'),
      size: num('Width (px)', 120, 60, 260),
      speed: num('Seconds per page', 2.4, 1, 6, 0.1),
    },
    demo: ({ props }) => (
      <div className="grid size-full place-items-center bg-[#f2efe6]">
        <MangaLoader {...props} />
      </div>
    ),
    usage: (p) => jsx('MangaLoader', p),
  },
]
