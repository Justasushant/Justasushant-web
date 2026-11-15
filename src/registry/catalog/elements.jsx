import CheckList from '../components/check-list.tsx'
import Dock from '../components/dock.tsx'
import AnimatedTabs from '../components/animated-tabs.tsx'
import Accordion from '../components/accordion.tsx'
import ToastStack, { toast } from '../components/toast-stack.tsx'
import CommandPalette from '../components/command-palette.tsx'
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
]
