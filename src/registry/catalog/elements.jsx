import Dock from '../components/dock.tsx'
import AnimatedTabs from '../components/animated-tabs.tsx'
import OrbitingCircles from '../components/orbiting-circles.tsx'
import Accordion from '../components/accordion.tsx'
import Tooltip from '../components/tooltip.tsx'
import ToastStack, { toast } from '../components/toast-stack.tsx'
import CommandPalette from '../components/command-palette.tsx'
import CompareSlider from '../components/compare-slider.tsx'
import Rating from '../components/rating.tsx'
import AvatarStack from '../components/avatar-stack.tsx'
import { bool, color, indent, jsx, num, select, text } from '../controls.js'

const Bubble = ({ children }) => (
  <div className="grid size-10 place-items-center rounded-full border border-white/15 bg-zinc-900 text-lg">
    {children}
  </div>
)

const dockItems = [
  { label: 'Home', icon: '🏠' },
  { label: 'Projects', icon: '📁' },
  { label: 'Design', icon: '🎨' },
  { label: 'Music', icon: '🎧' },
  { label: 'Messages', icon: '💬' },
  { label: 'Settings', icon: '⚙️' },
]

const tabs = ['Overview', 'Components', 'Pricing', 'Docs']

const faq = [
  { title: 'Is everything here free?', content: 'Yes. Copy any component in TSX or JSX and use it however you like.' },
  { title: 'Do I need any libraries?', content: 'Just React and Tailwind CSS. No animation libraries, no extra packages.' },
  { title: 'Did you invent all of these?', content: 'Nope. Most are inspired by the best of the internet, then rebuilt and fine-tuned.' },
]

const commands = [
  { label: 'Open the Lab', group: 'Navigate', icon: '🧪', shortcut: 'G L' },
  { label: 'Go home', group: 'Navigate', icon: '🏠', shortcut: 'G H' },
  { label: 'Copy component code', group: 'Actions', icon: '📋', shortcut: '⌘C' },
  { label: 'Toggle fullscreen', group: 'Actions', icon: '⤢', shortcut: 'F' },
  { label: 'Send me an email', group: 'Contact', icon: '✉️' },
  { label: 'Message on WhatsApp', group: 'Contact', icon: '💬' },
]

const toastMessages = [
  ['Changes saved', 'Your component is safe and sound.'],
  ['Copied to clipboard', 'Paste it wherever you like.'],
  ['Deployed!', 'It is live on the internet now.'],
  ['New follower', 'Someone likes your buttons.'],
  ['Coffee break', 'You have earned it.'],
]

const people = [
  { name: 'Aarav Mehta', color: '#c6f432' },
  { name: 'Diya Kapoor', color: '#22d3ee' },
  { name: 'Kabir Singh', color: '#f472b6' },
  { name: 'Meera Iyer', color: '#a78bfa' },
  { name: 'Rohan Das', color: '#facc15' },
  { name: 'Ishita Rao' },
  { name: 'Vihaan Shah' },
]

export default [
  {
    slug: 'dock',
    name: 'Dock',
    category: 'Elements',
    description: 'macOS-style dock where icons magnify near the cursor.',
    controls: {
      size: num('Icon size (px)', 40, 24, 72),
      magnification: num('Magnification', 1.8, 1, 3, 0.1),
      distance: num('Reach (px)', 110, 40, 300, 5),
    },
    demo: ({ props }) => <Dock {...props} items={dockItems} />,
    usage: (p) => jsx('Dock', { ...p, items: dockItems.slice(0, 3) }),
  },
  {
    slug: 'animated-tabs',
    name: 'Animated Tabs',
    category: 'Elements',
    description: 'Segmented tabs with a springy pill that slides between them.',
    controls: {
      defaultIndex: num('Starting tab', 0, 0, 3),
      pillColor: color('Pill colour', '#ffffff'),
      activeTextColor: color('Active text colour', '#09090b'),
    },
    demo: ({ props }) => <AnimatedTabs {...props} tabs={tabs} />,
    usage: (p) => jsx('AnimatedTabs', { tabs, ...p }),
  },
  {
    slug: 'orbiting-circles',
    name: 'Orbiting Circles',
    category: 'Elements',
    fill: true,
    description: 'Items orbiting a centre point. Stack several for rings.',
    controls: {
      radius: num('Inner radius (px)', 80, 30, 200, 5),
      duration: num('Seconds per orbit', 14, 2, 60),
      reverse: bool('Reverse', false),
      showPath: bool('Show path', true),
    },
    demo: ({ props }) => (
      <>
        <div className="relative z-10 grid size-16 place-items-center rounded-full bg-[#c6f432] text-sm font-bold text-zinc-950">
          UI
        </div>
        <OrbitingCircles {...props}>
          <Bubble>⚛️</Bubble>
          <Bubble>🎨</Bubble>
          <Bubble>⚡</Bubble>
        </OrbitingCircles>
        <OrbitingCircles
          radius={props.radius + 60}
          duration={props.duration * 1.6}
          reverse={!props.reverse}
          showPath={props.showPath}
        >
          <Bubble>🧩</Bubble>
          <Bubble>✨</Bubble>
          <Bubble>🚀</Bubble>
          <Bubble>💡</Bubble>
        </OrbitingCircles>
      </>
    ),
    usage: (p) => `<div className="relative flex h-96 items-center justify-center">
  <div className="size-16 rounded-full bg-lime-300" />
${indent(jsx('OrbitingCircles', p, '<span>⚛️</span>\n<span>🎨</span>\n<span>⚡</span>'), 2)}
</div>`,
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Elements',
    description: 'Smooth auto-height accordion with a plus that turns into a cross.',
    controls: { accent: color('Accent colour', '#c6f432') },
    demo: ({ props }) => <Accordion {...props} className="mx-6" items={faq} />,
    usage: (p) => jsx('Accordion', { ...p, items: faq.slice(0, 2) }),
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Elements',
    description: 'A springy tooltip that pops from its trigger on hover or focus.',
    controls: {
      label: text('Label (last button)', 'Save for later'),
      side: select('Side', 'top', ['top', 'bottom']),
    },
    demo: ({ props }) => (
      <div className="flex gap-4">
        {[
          ['👍', 'Like'],
          ['💬', 'Comment'],
          ['🔁', 'Share'],
          ['🔖', props.label],
        ].map(([icon, label], i) => (
          <Tooltip key={i} label={label} side={props.side}>
            <button className="grid size-12 place-items-center rounded-xl border border-white/10 bg-zinc-900 text-xl transition-colors hover:bg-zinc-800">
              {icon}
            </button>
          </Tooltip>
        ))}
      </div>
    ),
    usage: (p) => jsx('Tooltip', p, '<button>🔖</button>'),
  },
  {
    slug: 'toast-stack',
    name: 'Toast Stack',
    category: 'Elements',
    description: 'Stacked notifications that fan out on hover. Call toast() from anywhere.',
    controls: { duration: num('Visible for (ms)', 4000, 1000, 15000, 250) },
    demo: ({ props }) => (
      <>
        <button
          onClick={() => {
            const [title, description] = toastMessages[Math.floor(Math.random() * toastMessages.length)]
            toast(title, description)
          }}
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-transform active:scale-95"
        >
          Show a toast
        </button>
        <ToastStack {...props} contained />
      </>
    ),
    importLine: "import ToastStack, { toast } from '@/components/ui/toast-stack'",
    usage: (p) => `<>
  <button onClick={() => toast('Changes saved', 'Your work is safe.')}>Save</button>
  {/* Render once, near the root of your app */}
  ${jsx('ToastStack', p)}
</>`,
  },
  {
    slug: 'command-palette',
    name: 'Command Palette',
    category: 'Elements',
    fill: true,
    description: 'A ⌘K command menu with search, groups and full keyboard control.',
    controls: { placeholder: text('Placeholder', 'Type a command or search…') },
    demo: ({ props }) => <CommandPalette {...props} contained commands={commands} />,
    usage: (p) => jsx('CommandPalette', { ...p, commands: commands.slice(0, 3) }),
  },
  {
    slug: 'compare-slider',
    name: 'Compare Slider',
    category: 'Elements',
    description: 'Drag the handle to compare a before and an after.',
    controls: { defaultPosition: num('Starting position (%)', 50, 0, 100) },
    demo: ({ props }) => (
      <CompareSlider
        {...props}
        className="mx-6"
        before={
          <div className="grid size-full place-items-center bg-zinc-800">
            <p className="font-mono text-sm text-zinc-500">before: plain grey box</p>
          </div>
        }
        after={
          <div className="grid size-full place-items-center bg-gradient-to-br from-[#c6f432] via-cyan-400 to-violet-500">
            <p className="text-2xl font-black text-zinc-950">after: ✨ designed</p>
          </div>
        }
      />
    ),
    usage: (p) => `<CompareSlider
  defaultPosition={${p.defaultPosition}}
  before={<img src="/before.jpg" className="size-full object-cover" />}
  after={<img src="/after.jpg" className="size-full object-cover" />}
/>`,
  },
  {
    slug: 'rating',
    name: 'Rating',
    category: 'Elements',
    description: 'Star rating with hover preview, labels and a little pop when you choose.',
    controls: {
      max: num('Stars', 5, 3, 10),
      defaultValue: num('Starting value', 0, 0, 10),
      color: color('Star colour', '#facc15'),
    },
    demo: ({ props }) => <Rating {...props} />,
    usage: (p) => jsx('Rating', p),
  },
  {
    slug: 'avatar-stack',
    name: 'Avatar Stack',
    category: 'Elements',
    description: 'Overlapping avatars that spread apart on hover, with name tags.',
    controls: {
      max: num('Visible avatars', 5, 1, 7),
      size: num('Size (px)', 44, 24, 80),
    },
    demo: ({ props }) => <AvatarStack {...props} people={people} />,
    usage: (p) => jsx('AvatarStack', { ...p, people: people.slice(0, 3) }),
  },
]
