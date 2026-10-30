import MangaText from '../components/manga-text.tsx'
import SplitFlap from '../components/split-flap.tsx'
import SpiderSenseText from '../components/spider-sense-text.tsx'
import ScrambleText from '../components/scramble-text.tsx'
import HighlightText from '../components/highlight-text.tsx'
import FlashlightText from '../components/flashlight-text.tsx'
import ShinyText from '../components/shiny-text.tsx'
import Typewriter from '../components/typewriter.tsx'
import WordRotate from '../components/word-rotate.tsx'
import BlurInText from '../components/blur-in-text.tsx'
import GradientText from '../components/gradient-text.tsx'
import WavyText from '../components/wavy-text.tsx'
import GlitchText from '../components/glitch-text.tsx'
import NumberTicker from '../components/number-ticker.tsx'
import MarqueeText from '../components/marquee-text.tsx'
import { bool, color, colors, indent, jsx, num, text } from '../controls.js'
import { tag } from './shared.jsx'

const typewriterWords = ['interfaces.', 'experiments.', 'products.']
const rotateWords = ['faster', 'smoother', 'bolder', 'yours']
const marqueeItems = ['React', 'Motion', 'Interfaces', 'Tailwind', 'Details']

export default [
  {
    slug: 'scramble-text',
    name: 'Scramble Text',
    category: 'Text',
    description: 'Decodes from random characters. Hover to scramble again.',
    controls: {
      text: text('Text', 'HOVER TO DECODE'),
      duration: num('Decode time (ms)', 900, 100, 4000, 50),
      scrambleOnHover: bool('Scramble on hover', true),
    },
    demo: ({ props }) => (
      <ScrambleText {...props} className="font-mono text-3xl font-semibold text-white" />
    ),
    usage: (p) => jsx('ScrambleText', { ...p, className: 'font-mono text-3xl' }),
  },
  {
    slug: 'shiny-text',
    name: 'Shiny Text',
    category: 'Text',
    description: 'A highlight that sweeps across the letters like light on metal.',
    controls: {
      children: text('Text', 'Shiny new thing'),
      baseColor: color('Base colour', '#71717a'),
      shineColor: color('Shine colour', '#ffffff'),
      speed: num('Seconds per sweep', 3, 0.5, 10, 0.5),
    },
    demo: ({ props }) => <ShinyText {...props} className="text-4xl font-semibold" />,
    usage: (p) => tag('ShinyText', { ...p, className: 'text-4xl font-semibold' }),
  },
  {
    slug: 'typewriter',
    name: 'Typewriter',
    category: 'Text',
    description: 'Types, pauses, deletes and moves on to the next word.',
    controls: {
      typeSpeed: num('Typing speed (ms per letter)', 70, 10, 300, 5),
      deleteSpeed: num('Delete speed (ms per letter)', 40, 5, 300, 5),
      pause: num('Pause on full word (ms)', 1400, 0, 5000, 100),
    },
    demo: ({ props }) => (
      <p className="text-3xl font-semibold text-white">
        I build <Typewriter {...props} words={typewriterWords} className="text-[#c6f432]" />
      </p>
    ),
    usage: (p) => `<p className="text-3xl">
  I build{' '}
${indent(jsx('Typewriter', { words: typewriterWords, ...p }), 2)}
</p>`,
  },
  {
    slug: 'word-rotate',
    name: 'Word Rotate',
    category: 'Text',
    description: 'Swaps words in place with a blurred slide-up.',
    controls: {
      interval: num('Time per word (ms)', 2200, 400, 6000, 100),
    },
    demo: ({ props }) => (
      <p className="text-3xl font-semibold text-white">
        Make it <WordRotate {...props} words={rotateWords} className="text-[#c6f432]" />
      </p>
    ),
    usage: (p) => `<p className="text-3xl">
  Make it{' '}
${indent(jsx('WordRotate', { words: rotateWords, ...p }), 2)}
</p>`,
  },
  {
    slug: 'blur-in-text',
    name: 'Blur In Text',
    category: 'Text',
    description: 'Words fade in from a blur one by one when scrolled into view.',
    controls: {
      text: text('Text', 'Details are not details. They make the design.'),
      stagger: num('Delay between words (s)', 0.08, 0, 0.5, 0.01),
    },
    demo: ({ props }) => (
      <BlurInText {...props} className="max-w-md px-6 text-center text-3xl font-semibold text-white" />
    ),
    usage: (p) => jsx('BlurInText', { ...p, className: 'text-3xl' }),
  },
  {
    slug: 'gradient-text',
    name: 'Gradient Text',
    category: 'Text',
    description: 'A colourful gradient that keeps flowing through the text.',
    controls: {
      children: text('Text', 'Gradient'),
      colors: colors('Colours', ['#c6f432', '#22d3ee', '#a855f7', '#f472b6']),
      speed: num('Seconds per loop', 5, 1, 20, 0.5),
    },
    demo: ({ props }) => <GradientText {...props} className="text-5xl font-bold" />,
    usage: (p) => tag('GradientText', { ...p, className: 'text-5xl font-bold' }),
  },
  {
    slug: 'wavy-text',
    name: 'Wavy Text',
    category: 'Text',
    description: 'Letters bob up and down in a travelling wave.',
    controls: {
      text: text('Text', 'Making waves'),
      height: num('Wave height (em)', 0.25, 0, 1, 0.05),
      speed: num('Seconds per wave', 1.6, 0.3, 5, 0.1),
    },
    demo: ({ props }) => <WavyText {...props} className="text-4xl font-semibold text-white" />,
    usage: (p) => jsx('WavyText', { ...p, className: 'text-4xl' }),
  },
  {
    slug: 'glitch-text',
    name: 'Glitch Text',
    category: 'Text',
    description: 'RGB-split glitch bursts on a loop. Pure CSS.',
    controls: {
      text: text('Text', 'SYSTEM ERROR'),
      speed: num('Seconds between bursts', 2.5, 0.5, 8, 0.5),
    },
    demo: ({ props }) => (
      <GlitchText {...props} className="text-5xl font-black tracking-tight text-white" />
    ),
    usage: (p) => jsx('GlitchText', { ...p, className: 'text-5xl font-black' }),
  },
  {
    slug: 'number-ticker',
    name: 'Number Ticker',
    category: 'Text',
    description: 'Counts up to a value with easing when it comes into view.',
    controls: {
      value: num('Value', 12840, 0, 1000000, 10),
      duration: num('Duration (ms)', 2000, 200, 6000, 100),
      decimals: num('Decimals', 0, 0, 3),
      prefix: text('Prefix', '$'),
      suffix: text('Suffix', ''),
    },
    demo: ({ props }) => (
      <div className="text-center">
        <NumberTicker {...props} className="text-5xl font-semibold text-white" />
        <p className="mt-2 text-sm text-zinc-500">revenue this month</p>
      </div>
    ),
    usage: (p) => jsx('NumberTicker', { ...p, className: 'text-5xl font-semibold' }),
  },
  {
    slug: 'marquee-text',
    name: 'Marquee Text',
    category: 'Text',
    description: 'Endless scrolling headline with alternating outlined words.',
    controls: {
      speed: num('Seconds per loop', 20, 4, 80),
      reverse: bool('Reverse', false),
      outlineColor: color('Outline colour', '#fafafa'),
      separator: text('Separator', '✦'),
    },
    demo: ({ props }) => (
      <MarqueeText
        {...props}
        items={marqueeItems}
        className="w-full text-5xl font-bold uppercase text-white"
      />
    ),
    usage: (p) =>
      jsx('MarqueeText', { items: marqueeItems, ...p, className: 'text-5xl font-bold uppercase' }),
  },
  {
    slug: 'highlight-text',
    name: 'Highlight Text',
    category: 'Text',
    description: 'A marker highlight that sweeps in behind words when they scroll into view.',
    controls: {
      children: text('Highlighted words', 'as little design'),
      color: color('Marker colour', '#c6f432'),
      delay: num('Delay (ms)', 200, 0, 2000, 50),
    },
    demo: ({ props }) => (
      <p className="max-w-md px-6 text-center text-3xl font-semibold leading-snug text-white">
        Good design is <HighlightText {...props} className="text-zinc-950" /> as possible.
      </p>
    ),
    usage: (p) => `<p className="text-3xl">
  Good design is{' '}
${indent(tag('HighlightText', p), 2)}{' '}
  as possible.
</p>`,
  },
  {
    slug: 'flashlight-text',
    name: 'Flashlight Text',
    category: 'Text',
    description: 'Text hidden in the dark. Your cursor is a torch that lights up the words and the dust around them.',
    controls: {
      text: text('Text', 'FIND ME IN THE DARK'),
      radius: num('Light radius (px)', 140, 30, 400, 5),
      colors: colors('Colours', ['#ffffff']),
      wander: bool('Drift when idle', true),
    },
    demo: ({ props }) => (
      <FlashlightText
        {...props}
        className="w-full max-w-3xl text-center text-5xl font-black leading-none tracking-tight sm:text-6xl"
      />
    ),
    usage: (p) => jsx('FlashlightText', { ...p, className: 'text-6xl font-black' }),
  },
  {
    slug: 'spider-sense-text',
    name: 'Spider Sense Text',
    category: 'Text',
    description: 'Hover and zigzag tingle lines burst around the text while it shivers. Spider-Man knows.',
    controls: {
      text: text('Text', 'DANGER NEARBY'),
      color: color('Tingle colour', '#ef4444'),
      accent: color('Second colour', '#3b82f6'),
      lines: num('Tingle lines', 14, 4, 30),
      always: bool('Always on', false),
    },
    demo: ({ preview, props }) => (
      <SpiderSenseText {...props} always={preview || props.always} className={`whitespace-nowrap font-black tracking-tight text-white ${preview ? "text-3xl" : "text-5xl sm:text-6xl"}`} />
    ),
    usage: (p) => jsx('SpiderSenseText', { ...p, className: 'text-6xl font-black' }),
  },
  {
    slug: 'split-flap',
    name: 'Split Flap',
    category: 'Text',
    description: 'An airport departures board. Every letter clacks through the alphabet to spell the next word.',
    controls: {
      interval: num('Each word stays (ms)', 3500, 1500, 10000, 250),
      color: color('Letter colour', '#fde68a'),
      flapColor: color('Flap colour', '#18181b'),
    },
    demo: ({ preview, props }) => <SplitFlap {...props} className={preview ? "text-xl" : "text-3xl sm:text-5xl"} />,
    usage: (p) => jsx('SplitFlap', { ...p, words: ['DEPARTING', 'ON TIME', 'BOARDING'], className: 'text-5xl' }),
  },
  {
    slug: 'manga-text',
    name: 'Manga Text',
    category: 'Text',
    fill: true,
    description: 'Text that slams onto the page like a manga sound effect: letters drop in, land with a shake and focus lines burst out. Hover to slam it again.',
    controls: {
      text: text('Text', 'KABOOM!'),
      stagger: num('Delay between letters (ms)', 70, 20, 200, 5),
      tilt: num('Tilt (deg)', -6, -20, 20),
    },
    demo: ({ props }) => (
      <div className="grid size-full place-items-center overflow-hidden bg-[#f2efe6]">
        <MangaText {...props} className="text-6xl sm:text-8xl" />
      </div>
    ),
    usage: (p) => jsx('MangaText', { ...p, className: 'text-8xl' }),
  },
]
