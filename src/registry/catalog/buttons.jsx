import MangaButton from '../components/manga-button.tsx'
import PixelButton from '../components/pixel-button.tsx'
import ComicButton from '../components/comic-button.tsx'
import ShimmerButton from '../components/shimmer-button.tsx'
import HoldButton from '../components/hold-button.tsx'
import SparkleButton from '../components/sparkle-button.tsx'
import MagneticButton from '../components/magnetic-button.tsx'
import GlowBorderButton from '../components/glow-border-button.tsx'
import RippleButton from '../components/ripple-button.tsx'
import TextRollButton from '../components/text-roll-button.tsx'
import SlideFillButton from '../components/slide-fill-button.tsx'
import BrutalButton from '../components/brutal-button.tsx'
import ConfettiButton from '../components/confetti-button.tsx'
import CopyButton from '../components/copy-button.tsx'
import SpringToggle from '../components/spring-toggle.tsx'
import FireworksButton from '../components/fireworks-button.tsx'
import LiquidButton from '../components/liquid-button.tsx'
import RocketButton from '../components/rocket-button.tsx'
import HeartButton from '../components/heart-button.tsx'
import { bool, color, colors, jsx, num, select, text } from '../controls.js'
import { pascal, tag } from './shared.jsx'

// Most buttons: the demo renders the component with the live props,
// and the usage is the same element written out as JSX
const button = (slug, name, Component, description, controls) => ({
  slug,
  name,
  category: 'Buttons',
  description,
  controls,
  demo: ({ props }) => <Component {...props} />,
  usage: (p) => tag(pascal(slug), p),
})

const label = (value) => text('Label', value)

export default [
  button('shimmer-button', 'Shimmer Button', ShimmerButton, 'A dark pill with a light sweep that glides across it on a loop.', {
    children: label('Get started →'),
    shimmerColor: color('Shimmer colour', '#ffffff'),
    background: color('Background', '#09090b'),
  }),
  button('magnetic-button', 'Magnetic Button', MagneticButton, 'Leans toward your cursor as it gets close, then snaps back.', {
    children: label('Hover near me'),
    strength: num('Pull strength', 0.35, 0, 1, 0.05),
  }),
  button('glow-border-button', 'Glow Border Button', GlowBorderButton, 'A rotating conic gradient that travels around the border.', {
    children: label('✦ Launch project'),
    colors: colors('Border colours', ['#c6f432', '#22d3ee', '#a855f7', '#c6f432']),
    duration: num('Seconds per turn', 3, 0.5, 12, 0.5),
  }),
  button('ripple-button', 'Ripple Button', RippleButton, 'Material-style ink ripple that spreads from where you click.', {
    children: label('Click me'),
    rippleColor: color('Ripple colour', '#ffffff'),
  }),
  button('text-roll-button', 'Text Roll Button', TextRollButton, 'Each letter rolls up on hover with a staggered delay.', {
    text: text('Text', 'View the work'),
    stagger: num('Delay between letters (ms)', 25, 0, 120),
  }),
  button('slide-fill-button', 'Slide Fill Button', SlideFillButton, 'A curved fill rises from below and flips the text colour.', {
    children: label('Let’s talk'),
    fillColor: color('Fill colour', '#c6f432'),
  }),
  button('brutal-button', 'Brutal Button', BrutalButton, 'Neo-brutalist button with a hard shadow that presses flat.', {
    children: label('Press me'),
    color: color('Colour', '#ffde59'),
    shadowColor: color('Shadow colour', '#fafafa'),
  }),
  button('confetti-button', 'Confetti Button', ConfettiButton, 'Bursts a ring of confetti on every click. Zero dependencies.', {
    children: label('Celebrate'),
    count: num('Pieces', 28, 4, 120),
    colors: colors('Confetti colours', ['#c6f432', '#22d3ee', '#f472b6', '#facc15', '#a78bfa']),
  }),
  button('copy-button', 'Copy Button', CopyButton, 'Copies a command to the clipboard with an icon morph.', {
    value: text('Text to copy', 'npm create vite@latest'),
  }),
  button('spring-toggle', 'Spring Toggle', SpringToggle, 'An accessible switch whose knob overshoots like a spring.', {
    label: text('Accessible label', 'Notifications'),
    defaultChecked: bool('Starts on', false),
  }),
  button('hold-button', 'Hold Button', HoldButton, 'Press and hold to confirm. Let go early and the fill drains away.', {
    label: label('Hold to delete'),
    doneLabel: text('Done label', 'Deleted ✓'),
    duration: num('Hold time (ms)', 1500, 200, 6000, 100),
    color: color('Colour', '#f43f5e'),
  }),
  button('sparkle-button', 'Sparkle Button', SparkleButton, 'A gradient button that sprinkles twinkling stars while you hover it.', {
    children: label('Make it magic'),
    colors: colors('Star colours', ['#fde047', '#c6f432', '#f0abfc', '#ffffff']),
  }),
  button('fireworks-button', 'Fireworks Button', FireworksButton, 'Every click launches rockets that burst into fireworks above the button.', {
    children: label('Light it up'),
    rockets: num('Rockets per click', 3, 1, 8),
    colors: colors('Firework colours', ['#c6f432', '#22d3ee', '#f472b6', '#facc15', '#ffffff']),
  }),
  button('liquid-button', 'Liquid Button', LiquidButton, 'Liquid rises inside on hover, with a rolling wave on top.', {
    children: label('Dive in'),
    color: color('Liquid colour', '#22d3ee'),
    fillTextColor: color('Text colour when full', '#09090b'),
  }),
  {
    ...button('rocket-button', 'Rocket Button', RocketButton, 'The rocket shakes, blasts off in a puff of smoke, and the label rolls to done.', {}),
    controls: {
      label: text('Label', 'Launch'),
      doneLabel: text('Done label', 'Launched'),
      color: color('Colour', '#f97316'),
    },
    usage: (p) => jsx('RocketButton', p),
  },
  {
    ...button('heart-button', 'Heart Button', HeartButton, 'A like button: the heart pops, sparks fly out and the counter rolls up.', {}),
    controls: {
      count: num('Starting likes', 128, 0, 9999),
      color: color('Heart colour', '#f43f5e'),
      burstColors: colors('Burst colours', ['#f43f5e', '#fb923c', '#facc15', '#a78bfa', '#22d3ee']),
    },
    usage: (p) => jsx('HeartButton', p),
  },
  button('comic-button', 'Comic Button', ComicButton, 'A chunky comic-book button. Every hit throws out a POW, BAM or ZAP starburst.', {
    children: label('Hit me'),
    color: color('Button colour', '#facc15'),
    burstColor: color('Burst colour', '#ef4444'),
  }),
  button('pixel-button', 'Pixel Button', PixelButton, 'A crisp 8-bit button with stepped corners. It clicks down in hard steps and spits out pixels.', {
    children: label('Press start'),
    color: color('Colour', '#22c55e'),
    shadowColor: color('Shadow colour', '#052e16'),
  }),
  {
    ...button('manga-button', 'Manga Button', MangaButton, 'Manga-style buttons with a hard ink shadow and sliding screentone. Hit one for a starburst sound effect.', {}),
    controls: {
      children: label('Read now'),
      variant: select('Style', 'ink', ['ink', 'paper', 'outline']),
      sfx: text('Sound effect', 'ドン!'),
    },
    demo: ({ preview, props }) => (
      <div className="grid size-full place-items-center bg-[#f2efe6]">
        {preview ? (
          <div className="flex flex-wrap items-center justify-center gap-5">
            <MangaButton>Read now</MangaButton>
            <MangaButton variant="paper" sfx="バン!">Subscribe</MangaButton>
          </div>
        ) : (
          <MangaButton {...props} />
        )}
      </div>
    ),
  },
]
