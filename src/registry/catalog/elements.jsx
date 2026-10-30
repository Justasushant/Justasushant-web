import { useState } from 'react'
import MangaNavbar from '../components/manga-navbar.tsx'
import CheckList from '../components/check-list.tsx'
import Dock from '../components/dock.tsx'
import AnimatedTabs from '../components/animated-tabs.tsx'
import Accordion from '../components/accordion.tsx'
import ToastStack, { toast } from '../components/toast-stack.tsx'
import CommandPalette from '../components/command-palette.tsx'
import CompareSlider from '../components/compare-slider.tsx'
import Rating from '../components/rating.tsx'
import AvatarStack from '../components/avatar-stack.tsx'
import { bool, color, indent, jsx, num, text } from '../controls.js'
import { Icon } from './icons.jsx'

const dockItems = [
  { label: 'Home', icon: <Icon name="home" />, color: '#3b82f6', active: true },
  { label: 'Projects', icon: <Icon name="folder" />, color: '#0ea5e9' },
  { label: 'Design', icon: <Icon name="pen" />, color: '#ec4899', active: true },
  { label: 'Music', icon: <Icon name="music" />, color: '#f43f5e' },
  { label: 'Messages', icon: <Icon name="chat" />, color: '#22c55e', active: true },
  { label: 'Code', icon: <Icon name="code" />, color: '#8b5cf6' },
  { label: 'Settings', icon: <Icon name="settings" />, color: '#52525b' },
]

const tabs = ['Overview', 'Components', 'Pricing', 'Docs']

const faq = [
  { title: 'Is everything here free?', content: 'Yes. Copy any component in TSX or JSX and use it however you like.' },
  { title: 'Do I need any libraries?', content: 'Just React and Tailwind CSS. No animation libraries, no extra packages.' },
  { title: 'Did you invent all of these?', content: 'Nope. Most are inspired by the best of the internet, then rebuilt and fine-tuned.' },
]

const commands = [
  { label: 'Open the Lab', group: 'Navigate', icon: <Icon name="flask" size={16} />, shortcut: 'G L' },
  { label: 'Go home', group: 'Navigate', icon: <Icon name="home" size={16} />, shortcut: 'G H' },
  { label: 'Copy component code', group: 'Actions', icon: <Icon name="copy" size={16} />, shortcut: '⌘C' },
  { label: 'Toggle fullscreen', group: 'Actions', icon: <Icon name="expand" size={16} />, shortcut: 'F' },
  { label: 'Send me an email', group: 'Contact', icon: <Icon name="mail" size={16} /> },
  { label: 'Message on WhatsApp', group: 'Contact', icon: <Icon name="phone" size={16} /> },
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

// The same landing page twice: as a wireframe and as the finished design
const Wireframe = () => {
  const box = 'rounded border border-dashed border-zinc-500'
  return (
    <div className="flex size-full flex-col gap-[4%] bg-zinc-200 p-[5%]">
      <div className="flex items-center justify-between">
        <span className={`h-3 w-16 ${box}`} />
        <div className="flex gap-2">
          <span className={`h-2.5 w-8 ${box}`} />
          <span className={`h-2.5 w-8 ${box}`} />
          <span className={`h-2.5 w-8 ${box}`} />
        </div>
      </div>
      <div className="mt-[4%] space-y-2">
        <span className={`block h-5 w-3/4 ${box}`} />
        <span className={`block h-5 w-1/2 ${box}`} />
        <span className={`block h-2.5 w-2/3 ${box}`} />
      </div>
      <span className="h-7 w-24 rounded-full border border-dashed border-zinc-500" />
      <div className="mt-auto grid flex-1 grid-cols-3 gap-[3%]">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`relative ${box}`}>
            <span className="absolute inset-0 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),#71717a,transparent_calc(50%+0.5px))]" />
          </span>
        ))}
      </div>
    </div>
  )
}

const Designed = () => (
  <div className="flex size-full flex-col gap-[4%] bg-[radial-gradient(circle_at_80%_0%,#3b0764,#09090b_60%)] p-[5%] text-white">
    <div className="flex items-center justify-between text-[10px]">
      <span className="font-black tracking-tight">ACME</span>
      <div className="flex gap-3 text-zinc-400">
        <span>Work</span>
        <span>Lab</span>
        <span>Contact</span>
      </div>
    </div>
    <div className="mt-[4%]">
      <p className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
        Interfaces that <span className="text-[#c6f432]">feel alive.</span>
      </p>
      <p className="mt-1 text-[10px] text-zinc-400">Motion, detail and craft, shipped weekly.</p>
    </div>
    <span className="w-fit rounded-full bg-[#c6f432] px-3 py-1 text-[10px] font-semibold text-zinc-950">
      Get started →
    </span>
    <div className="mt-auto grid flex-1 grid-cols-3 gap-[3%]">
      {['from-fuchsia-500 to-violet-700', 'from-cyan-400 to-blue-700', 'from-lime-300 to-emerald-600'].map((g) => (
        <span key={g} className={`rounded-lg bg-gradient-to-br shadow-lg ${g}`} />
      ))}
    </div>
  </div>
)

// The navbar over a page that changes with the selected link
const navLinks = ['Chapters', 'Characters', 'Studio', 'Contact']
function NavbarDemo({ props }) {
  const [page, setPage] = useState(0)
  return (
    <div className="absolute inset-0 flex flex-col bg-[#f2efe6] text-[#22211f]">
      <MangaNavbar {...props} links={navLinks} onSelect={setPage} />
      <div className="relative grid flex-1 place-items-center overflow-hidden p-6">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{
            background: 'repeating-conic-gradient(from 0deg at 50% 50%, #22211f 0deg 0.8deg, transparent 0.8deg 5deg)',
            maskImage: 'radial-gradient(circle, transparent 25%, black 75%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 25%, black 75%)',
          }}
        />
        <div key={page} className="relative text-center" style={{ animation: 'manga-navbar-pop 0.35s ease-out' }}>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]">Page {String(page + 1).padStart(2, '0')}</p>
          <p className="mt-2 text-6xl font-black uppercase tracking-tight sm:text-7xl">{navLinks[page]}</p>
        </div>
      </div>
    </div>
  )
}

export default [
  {
    slug: 'dock',
    name: 'Dock',
    category: 'Elements',
    description: 'macOS-style dock: icons swell smoothly near the cursor and bounce when clicked.',
    controls: {
      size: num('Icon size (px)', 44, 24, 72),
      magnification: num('Magnification', 1.8, 1, 3, 0.1),
      distance: num('Reach (px)', 120, 40, 300, 5),
    },
    demo: ({ props }) => <Dock {...props} items={dockItems} />,
    usage: (p) => `<Dock
  size={${p.size}}
  magnification={${p.magnification}}
  distance={${p.distance}}
  items={[
    { label: 'Home', icon: <HomeIcon />, color: '#3b82f6', active: true },
    { label: 'Music', icon: <MusicIcon />, color: '#f43f5e' },
    { label: 'Settings', icon: <SettingsIcon />, color: '#52525b' },
  ]}
/>`,
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
    slug: 'accordion',
    name: 'Accordion',
    category: 'Elements',
    description: 'Smooth auto-height accordion with a plus that turns into a cross.',
    controls: { accent: color('Accent colour', '#c6f432') },
    demo: ({ props }) => <Accordion {...props} className="mx-6" items={faq} />,
    usage: (p) => jsx('Accordion', { ...p, items: faq.slice(0, 2) }),
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
    usage: (p) => `<CommandPalette
  placeholder="${p.placeholder}"
  commands={[
    { label: 'Open the Lab', group: 'Navigate', icon: <FlaskIcon />, shortcut: 'G L' },
    { label: 'Go home', group: 'Navigate', icon: <HomeIcon />, shortcut: 'G H' },
    { label: 'Copy component code', group: 'Actions', icon: <CopyIcon />, shortcut: '⌘C' },
  ]}
/>`,
  },
  {
    slug: 'compare-slider',
    name: 'Compare Slider',
    category: 'Elements',
    description: 'Drag the glowing handle to compare a before and an after. It sweeps once to show it moves.',
    controls: {
      defaultPosition: num('Starting position (%)', 50, 0, 100),
      hover: bool('Follow the cursor', false),
      hint: bool('Hint sweep on load', true),
      accent: color('Handle colour', '#c6f432'),
    },
    demo: ({ props }) => (
      <div className="w-full max-w-md px-6">
        <CompareSlider
          {...props}
          beforeLabel="Wireframe"
          afterLabel="Shipped"
          before={<Wireframe />}
          after={<Designed />}
        />
      </div>
    ),
    usage: (p) => `<CompareSlider
  defaultPosition={${p.defaultPosition}}${p.hover ? '\n  hover' : ''}${p.hint ? '' : '\n  hint={false}'}
  accent="${p.accent}"
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
  {
    slug: 'check-list',
    name: 'Check List',
    category: 'Elements',
    description: 'A crisp to-do list: the tick draws itself, the label strikes through and the progress bar snaps forward.',
    controls: {
      title: text('Title', 'Today'),
      color: color('Accent colour', '#c6f432'),
    },
    demo: ({ props }) => <CheckList {...props} />,
    usage: (p) => jsx('CheckList', { ...p, items: ['Sketch the idea', 'Build it', 'Ship it'] }),
  },
  {
    slug: 'manga-navbar',
    name: 'Manga Navbar',
    category: 'Elements',
    fill: true,
    description: 'A navbar ruled like a strip of manga panels: screentone on hover, the current page inked in, and a panel-stack menu on small screens.',
    controls: {
      brand: text('Brand', 'Inkpanel'),
      mark: text('Mark', '漫'),
      cta: text('Button', 'Read now'),
    },
    demo: NavbarDemo,
    usage: (p) => jsx('MangaNavbar', { ...p, links: ['Chapters', 'Characters', 'Studio', 'Contact'] }),
  },
]
