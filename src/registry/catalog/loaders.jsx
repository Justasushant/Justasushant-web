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
  loader('dots-loader', 'Dots Loader', DotsLoader, 'Three dots hopping one after another.', {
    size: size(14, 4, 40),
  }),
  loader('bars-loader', 'Bars Loader', BarsLoader, 'An equaliser of bars pulsing in a wave.', {
    bars: num('Bars', 5, 2, 14),
  }),
  loader('ring-loader', 'Ring Loader', RingLoader, 'A spinning ring that fades into its own tail.', {
    size: size(52, 16, 160),
    thickness: num('Thickness (px)', 4, 1, 20),
  }),
  loader('orbit-loader', 'Orbit Loader', OrbitLoader, 'Dots orbiting together, bunching up and spreading out.', {
    size: size(56, 24, 140),
  }),
  loader('pulse-loader', 'Pulse Loader', PulseLoader, 'Radar rings pulsing out from a dot.', {
    size: size(72, 24, 180),
  }),
  loader('grid-loader', 'Grid Loader', GridLoader, 'A 3×3 grid of squares shrinking in a diagonal wave.', {
    size: size(14, 4, 32),
  }),
  loader('infinity-loader', 'Infinity Loader', InfinityLoader, 'A dash racing around a figure eight.', {
    size: size(96, 32, 240),
  }),
  loader('text-loader', 'Text Loader', TextLoader, 'Letters lighting up one by one.', {
    text: text('Text', 'Loading'),
  }),
  loader('cube-loader', 'Cube Loader', CubeLoader, 'A wireframe cube tumbling in 3D.', {
    size: size(44, 16, 120),
  }),
  {
    ...loader('morph-loader', 'Morph Loader', MorphLoader, 'A gradient blob that morphs between a circle and a square.', {}),
    controls: {
      colors: colors('Gradient colours', ['#c6f432', '#22d3ee']),
      size: size(56, 16, 160),
    },
  },
]
