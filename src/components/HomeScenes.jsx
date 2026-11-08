import { useNavigate } from 'react-router'
import { getComponent } from '../registry/index.jsx'
import ScrollDrum from '../registry/components/scroll-drum.tsx'
import ClosingScene from '../registry/components/closing-scene.tsx'

// The pieces of the Lab worth a closer look, in the order the drum turns
const picks = [
  'flow-field', 'blur-switch', 'web-shooter', 'dock', 'glitch-text', 'hover-grid', 'split-flap',
  'spotlight-card', 'matrix-rain', 'starfield-warp', 'fireworks-button', 'tear-reveal', 'music-card',
  'number-ticker', 'glass-card', 'terminal-loop', 'compare-slider', 'flashlight-text', 'depth-zoom', 'cube-rotate',
]

// Every third name gets an italic last word, like the original
const italic = (name, i) => (i % 3 === 1 ? name.replace(/(\S+)$/, '*$1*') : name)

const items = picks
  .map(getComponent)
  .filter(Boolean)
  .map((c, i) => ({ name: italic(c.name, i), caption: c.category, href: `/lab/${c.slug}` }))

// The Lab as a drum: scroll to spin through components
export function DrumSection() {
  const navigate = useNavigate()
  return (
    <div className="ink-stage">
    <ScrollDrum
      items={items}
      eyebrow="The Lab"
      title={['Pick a component.', 'Copy it. Ship it.']}
      lede="Scroll to spin through some of what is in the Lab. Every one is live, in TSX and JSX."
      dealt={0}
      closing=""
      buttonLabel=""
      onLink={navigate}
    />
    </div>
  )
}

// The last screen before the footer
export function ClosingSection() {
  const navigate = useNavigate()
  return (
    <div className="ink-stage">
      <ClosingScene lead="Stop rebuilding," emphasis="start copying." buttonLabel="Open the Lab" buttonHref="/lab" onLink={navigate} />
    </div>
  )
}
