import MangaPanel from '../components/manga-panel.tsx'
import WebCard from '../components/web-card.tsx'
import { Icon } from './icons.jsx'
import SpotlightCard from '../components/spotlight-card.tsx'
import TiltCard from '../components/tilt-card.tsx'
import GlassCard from '../components/glass-card.tsx'
import BorderBeamCard from '../components/border-beam-card.tsx'
import FlipCard from '../components/flip-card.tsx'
import ExpandPanels from '../components/expand-panels.tsx'
import StackCards from '../components/stack-cards.tsx'
import FocusCards from '../components/focus-cards.tsx'
import FolderCard from '../components/folder-card.tsx'
import MusicCard from '../components/music-card.tsx'
import TerminalLoop from '../components/terminal-loop.tsx'
import ChatLoop from '../components/chat-loop.tsx'
import DeployLoop from '../components/deploy-loop.tsx'
import { ossTerminalLines as terminalLines } from '../../data/opensource.js'

const chatMessages = [
  { from: 'them', text: 'Hey, is the open-source page live yet?' },
  { from: 'me', text: 'Almost! Just polishing one more button.' },
  { from: 'them', text: 'You said that last week.' },
  { from: 'me', text: 'It was a different button.' },
  { from: 'them', text: 'Fair enough, haha.' },
]

const deploySteps = [
  { label: 'Cloning repository', detail: 'github.com/Justasushant/Justasushant-web' },
  { label: 'Installing dependencies', detail: '214 packages in 6.2s' },
  { label: 'Building', detail: '86 pages generated' },
  { label: 'Running checks', detail: 'all passed' },
  { label: 'Assigning domain', detail: 'sushant.coneiz.com' },
]
import { bool, color, colors, jsx, lines, num, select, text } from '../controls.js'

const IconTile = ({ children }) => (
  <div className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#c6f432]">
    {children}
  </div>
)

// A card tag wrapping some placeholder content in the usage snippet
const wrap = (name, props, content) => jsx(name, props, content)

const deck = [
  ['#c6f432', '#14532d', 'Lime', 'Drag me sideways'],
  ['#22d3ee', '#1e3a8a', 'Ocean', 'Throw me away'],
  ['#f472b6', '#7c2d12', 'Dusk', 'I go to the back'],
  ['#a855f7', '#1e1b4b', 'Night', 'Last one, promise'],
]

const focusCards = [
  { title: 'Forest', background: 'linear-gradient(160deg, #4d7c0f, #052e16)' },
  { title: 'Sunset', background: 'linear-gradient(160deg, #fb923c, #9f1239)' },
  { title: 'Glacier', background: 'linear-gradient(160deg, #a5f3fc, #1e40af)' },
  { title: 'Dune', background: 'linear-gradient(160deg, #fde68a, #92400e)' },
  { title: 'Nebula', background: 'linear-gradient(160deg, #e879f9, #312e81)' },
  { title: 'Lime', background: 'linear-gradient(160deg, #c6f432, #166534)' },
]

const panels = [
  { title: 'Lime', subtitle: 'Fresh & loud', background: 'linear-gradient(160deg, #c6f432, #166534)' },
  { title: 'Ocean', subtitle: 'Deep & calm', background: 'linear-gradient(160deg, #22d3ee, #1e3a8a)' },
  { title: 'Dusk', subtitle: 'Warm & soft', background: 'linear-gradient(160deg, #f472b6, #7c2d12)' },
  { title: 'Night', subtitle: 'Dark & quiet', background: 'linear-gradient(160deg, #a855f7, #1e1b4b)' },
]

export default [
  {
    slug: 'spotlight-card',
    name: 'Spotlight Card',
    category: 'Cards',
    description: 'A glow follows the cursor along the border and the surface.',
    controls: { glowColor: color('Glow colour', '#c6f432') },
    demo: ({ props }) => (
      <SpotlightCard {...props} className="w-80">
        <IconTile><Icon name="bolt" size={22} /></IconTile>
        <h3 className="mt-5 text-xl font-semibold text-white">Lightning fast</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Built on transforms and opacity only, so every animation stays at 60fps.
        </p>
        <div className="mt-6 flex items-baseline gap-2 border-t border-white/10 pt-4">
          <span className="text-3xl font-semibold text-white">60</span>
          <span className="font-mono text-xs text-zinc-500">fps, always</span>
        </div>
      </SpotlightCard>
    ),
    usage: (p) =>
      wrap('SpotlightCard', { ...p, className: 'w-80' }, '<h3>Lightning fast</h3>\n<p>Built on transforms and opacity only.</p>'),
  },
  {
    slug: 'tilt-card',
    name: 'Tilt Card',
    category: 'Cards',
    description: '3D tilt toward the cursor with a moving glare. The content floats above the card.',
    controls: {
      maxTilt: num('Max tilt (deg)', 14, 0, 45),
      depth: num('Content depth (px)', 50, 0, 150, 5),
    },
    demo: ({ props }) => (
      <TiltCard {...props} className="w-72">
        <p className="font-mono text-xs text-zinc-500">MEMBERSHIP</p>
        <p className="mt-10 text-4xl font-black tracking-tight text-white">
          PRO<span className="text-[#c6f432]">.</span>
        </p>
        <div className="mt-8 flex items-end justify-between">
          <p className="font-mono text-sm tracking-widest text-zinc-400">•••• 2026</p>
          <span className="rounded-full bg-[#c6f432] px-2.5 py-0.5 text-xs font-bold text-zinc-950">ACTIVE</span>
        </div>
      </TiltCard>
    ),
    usage: (p) => wrap('TiltCard', { ...p, className: 'w-72' }, '<p>MEMBERSHIP</p>\n<p className="text-4xl font-black">PRO.</p>'),
  },
  {
    slug: 'glass-card',
    name: 'Glass Card',
    category: 'Cards',
    description: 'Frosted glass panel floating over drifting colour orbs.',
    controls: {
      blur: num('Frost (px)', 24, 0, 60),
      showOrbs: bool('Colour orbs', true),
    },
    demo: ({ props }) => (
      <GlassCard {...props} className="w-72">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs text-white/60">BALANCE</p>
          <p className="text-sm font-bold italic text-white/80">VISA</p>
        </div>
        <p className="mt-3 text-3xl font-semibold text-white">₹ 2,48,500</p>
        <p className="mt-1 text-xs text-[#c6f432]">+12.4% this month</p>
        <p className="mt-8 font-mono text-sm tracking-widest text-white/70">•••• •••• •••• 4021</p>
      </GlassCard>
    ),
    usage: (p) => wrap('GlassCard', { ...p, className: 'w-72' }, '<p>BALANCE</p>\n<p className="text-3xl">₹ 2,48,500</p>'),
  },
  {
    slug: 'border-beam-card',
    name: 'Border Beam Card',
    category: 'Cards',
    description: 'Two beams of light chase each other around the edge of the card.',
    controls: {
      colors: colors('Beam colours', ['#c6f432', '#22d3ee']),
      duration: num('Seconds per lap', 5, 1, 15, 0.5),
    },
    demo: ({ props }) => (
      <BorderBeamCard {...props} className="w-80">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs text-zinc-500">PLAN</p>
          <span className="rounded-full border border-[#c6f432]/40 px-2 py-0.5 font-mono text-[10px] text-[#c6f432]">
            POPULAR
          </span>
        </div>
        <p className="mt-4 text-4xl font-semibold text-white">
          $19<span className="text-base font-normal text-zinc-500">/month</span>
        </p>
        <ul className="mt-5 space-y-2 text-sm text-zinc-300">
          <li>✓ Unlimited components</li>
          <li>✓ TSX and JSX</li>
          <li>✓ Zero dependencies</li>
        </ul>
      </BorderBeamCard>
    ),
    usage: (p) => wrap('BorderBeamCard', { ...p, className: 'w-80' }, '<p className="text-4xl">$19/month</p>'),
  },
  {
    slug: 'terminal-loop',
    name: 'Terminal Loop',
    category: 'Cards',
    description: 'A terminal that types your commands and answers on a loop. Write your own lines and copy the code.',
    controls: {
      lines: lines('Lines (command + response)', terminalLines),
      title: text('Window title', '~/sushant/open-source'),
      prompt: text('Prompt symbol', '❯'),
      typingSpeed: num('Typing speed (ms per letter)', 55, 10, 200, 5),
      pause: num('Pause before looping (ms)', 3500, 500, 10000, 250),
      accent: color('Accent colour', '#c6f432'),
    },
    demo: ({ props }) => <TerminalLoop {...props} className="mx-6" />,
    usage: (p) => jsx('TerminalLoop', p),
  },
  {
    slug: 'chat-loop',
    name: 'Chat Loop',
    category: 'Cards',
    description: 'A chat that plays itself, typing dots and all. Write the conversation and copy the code.',
    controls: {
      messages: lines('Messages', chatMessages, {
        main: ['text', 'Message'],
        sub: null,
        toneKey: 'from',
        tones: ['them', 'me'],
        blank: { from: 'them', text: 'Hey!' },
      }),
      contact: text('Contact name', 'Sushant'),
      status: text('Status', 'online'),
      typingTime: num('Typing time (ms)', 1100, 200, 4000, 100),
      pause: num('Pause before looping (ms)', 3500, 500, 10000, 250),
      accent: color('Your bubble colour', '#c6f432'),
    },
    demo: ({ props }) => <ChatLoop {...props} className="mx-6" />,
    usage: (p) => jsx('ChatLoop', p),
  },
  {
    slug: 'deploy-loop',
    name: 'Deploy Loop',
    category: 'Cards',
    description: 'A deploy log that ticks through its steps to "Ready", then starts again. Write your own steps.',
    controls: {
      steps: lines('Steps', deploySteps, {
        main: ['label', 'Step'],
        sub: ['detail', 'Detail when done (optional)'],
        tones: null,
        blank: { label: 'Running tests', detail: '42 passed' },
      }),
      project: text('Project', 'portfolio'),
      url: text('URL when ready', 'sushant.coneiz.com'),
      stepTime: num('Time per step (ms)', 1200, 200, 5000, 100),
      pause: num('Pause before looping (ms)', 3500, 500, 10000, 250),
      accent: color('Accent colour', '#c6f432'),
    },
    demo: ({ props }) => <DeployLoop {...props} className="mx-6" />,
    usage: (p) => jsx('DeployLoop', p),
  },
  {
    slug: 'stack-cards',
    name: 'Stack Cards',
    category: 'Cards',
    description: 'A deck of cards you swipe away with a drag. Each one goes to the back.',
    controls: { threshold: num('Drag distance to throw (px)', 100, 20, 250, 5) },
    demo: ({ props }) => (
      <StackCards
        {...props}
        cards={deck.map(([from, to, title, note]) => (
          <div
            key={title}
            className="flex size-full flex-col justify-between p-6"
            style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}
          >
            <p className="font-mono text-xs text-black/60">DRAG ←→</p>
            <div>
              <p className="text-4xl font-black tracking-tight text-white drop-shadow">{title}</p>
              <p className="mt-1 text-sm text-white/80">{note}</p>
            </div>
          </div>
        ))}
      />
    ),
    usage: (p) => `<StackCards
  threshold={${p.threshold}}
  cards={[
    <div className="size-full bg-lime-300 p-6">One</div>,
    <div className="size-full bg-cyan-400 p-6">Two</div>,
    <div className="size-full bg-pink-400 p-6">Three</div>,
  ]}
/>`,
  },
  {
    slug: 'focus-cards',
    name: 'Focus Cards',
    category: 'Cards',
    description: 'Hover one card and the rest blur out of focus.',
    controls: { blur: num('Blur on the others (px)', 4, 0, 16) },
    demo: ({ props }) => <FocusCards {...props} className="px-6" cards={focusCards} />,
    usage: (p) => jsx('FocusCards', { ...p, cards: focusCards.slice(0, 3) }),
  },
  {
    slug: 'folder-card',
    name: 'Folder Card',
    category: 'Cards',
    description: 'A folder that opens on hover as the papers inside fan out.',
    controls: {
      title: text('Title', 'Projects'),
      subtitle: text('Subtitle', '12 files'),
      color: color('Colour', '#c6f432'),
    },
    demo: ({ preview, props }) =>
      preview ? (
        <FolderCard {...props} />
      ) : (
        <div className="flex gap-10">
          <FolderCard {...props} />
          <FolderCard title="Designs" subtitle="48 files" color="#22d3ee" />
        </div>
      ),
    usage: (p) => jsx('FolderCard', p),
  },
  {
    slug: 'music-card',
    name: 'Music Card',
    category: 'Cards',
    description: 'A mini music player: spinning record, live equaliser and a working timeline.',
    controls: {
      title: text('Title', 'Midnight Components'),
      artist: text('Artist', 'The Lab Sessions'),
      length: num('Track length (s)', 214, 30, 600),
    },
    demo: ({ props }) => <MusicCard {...props} />,
    usage: (p) => jsx('MusicCard', p),
  },
  {
    slug: 'flip-card',
    name: 'Flip Card',
    category: 'Cards',
    description: 'Flips in 3D on hover (or tap) to reveal the back.',
    controls: {
      direction: select('Direction', 'horizontal', ['horizontal', 'vertical']),
      duration: num('Flip time (ms)', 700, 150, 2000, 50),
    },
    demo: ({ props }) => (
      <FlipCard
        {...props}
        front={
          <div className="flex size-full flex-col justify-between bg-gradient-to-br from-[#c6f432] to-emerald-600 p-5">
            <p className="font-mono text-xs text-zinc-900/60">CARD 01</p>
            <div>
              <p className="text-3xl font-black text-zinc-950">Hover me</p>
              <p className="text-sm text-zinc-900/70">There is more on the back</p>
            </div>
          </div>
        }
        back={
          <div className="flex size-full flex-col justify-between bg-zinc-900 p-5">
            <p className="font-mono text-xs text-zinc-500">CARD 01 / BACK</p>
            <div>
              <p className="text-lg font-semibold text-white">Hello there</p>
              <p className="mt-2 text-sm text-zinc-400">Put details, links or a call to action here.</p>
            </div>
            <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-950">
              Learn more →
            </span>
          </div>
        }
      />
    ),
    usage: (p) => `<FlipCard
  direction="${p.direction}"
  duration={${p.duration}}
  front={<div className="size-full bg-lime-300 p-5">Hover me</div>}
  back={<div className="size-full bg-zinc-900 p-5">The back side</div>}
/>`,
  },
  {
    slug: 'expand-panels',
    name: 'Expand Panels',
    category: 'Cards',
    description: 'Gallery panels that stretch open on hover.',
    controls: { grow: num('Open panel width (× others)', 5, 1.5, 10, 0.5) },
    demo: ({ props }) => <ExpandPanels {...props} className="px-6" panels={panels} />,
    usage: (p) => jsx('ExpandPanels', { ...p, panels: panels.slice(0, 3) }),
  },
  {
    slug: 'web-card',
    name: 'Web Card',
    category: 'Cards',
    description: 'A cobweb spins itself into the corner on hover and a spider drops down on its thread.',
    controls: {
      webColor: color('Web colour', '#d4d4d8'),
      spiderColor: color('Spider colour', '#e11d48'),
    },
    demo: ({ props }) => (
      <WebCard {...props}>
        <p className="font-mono text-xs text-zinc-500">NEIGHBOURHOOD WATCH</p>
        <h3 className="mt-3 text-xl font-semibold text-white">Friendly, local, quick.</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Hover the card. Somebody has been hanging around in the corner.
        </p>
        <span className="mt-6 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-zinc-950">Say hi</span>
      </WebCard>
    ),
    usage: (p) => wrap('WebCard', p, '<h3>Friendly, local, quick.</h3>'),
  },
  {
    slug: 'manga-panel',
    name: 'Manga Panel',
    category: 'Cards',
    fill: true,
    description: 'A manga page layout: ink panels with white gutters, screentone and focus lines. Hover a panel and the camera pushes in.',
    controls: {},
    demo: () => (
      <div className="grid size-full place-items-center bg-[#f2efe6] p-5">
        <MangaPanel
          className="h-full max-h-[420px] w-full max-w-lg"
          areas={['a a b', 'c d d']}
          panels={[
            {
              caption: 'Ch. 1',
              lines: true,
              content: <p className="text-4xl font-black uppercase leading-none tracking-tight">The plan.</p>,
            },
            {
              dark: true,
              content: (
                <svg viewBox="0 0 60 40" className="w-20">
                  <path d="M4 22 Q16 10 28 20 Q16 28 4 22Z" fill="#f2efe6" />
                  <circle cx="17" cy="20" r="5" fill="#22211f" />
                  <path d="M56 22 Q44 10 32 20 Q44 28 56 22Z" fill="#f2efe6" />
                  <circle cx="43" cy="20" r="5" fill="#22211f" />
                  <path d="M3 9 L27 13 M57 9 L33 13" stroke="#f2efe6" strokeWidth="3" />
                </svg>
              ),
            },
            {
              tone: true,
              content: (
                <p className="rounded-[50%] border-[3px] border-[#22211f] bg-[#f2efe6] px-4 py-2 text-xs font-black uppercase">Ship it?</p>
              ),
            },
            {
              lines: true,
              content: <p className="text-5xl font-black text-[#f2efe6] [-webkit-text-stroke:2px_#22211f] [paint-order:stroke_fill]">ドン!</p>,
            },
          ]}
        />
      </div>
    ),
    usage: `<MangaPanel
  areas={['a a b', 'c d d']}
  panels={[
    { content: <h3>The plan.</h3>, lines: true, caption: 'Ch. 1' },
    { content: <img src="/eyes.png" />, dark: true },
    { content: <p>Ship it?</p>, tone: true },
    { content: <p>ドン!</p>, lines: true },
  ]}
/>`,
  },
]
