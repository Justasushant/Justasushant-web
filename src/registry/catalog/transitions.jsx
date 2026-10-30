import PanelSwitch from '../components/panel-switch.tsx'
import DiagonalSwitch from '../components/diagonal-switch.tsx'
import TearSwitch from '../components/tear-switch.tsx'
import DepthZoom from '../components/depth-zoom.tsx'
import PortalSwitch from '../components/portal-switch.tsx'
import BlurSwitch from '../components/blur-switch.tsx'
import HorizontalScroll from '../components/horizontal-scroll.tsx'
import SnapScroll from '../components/snap-scroll.tsx'
import CubeRotate from '../components/cube-rotate.tsx'
import BookFlip from '../components/book-flip.tsx'
import StackScroll from '../components/stack-scroll.tsx'
import ZoomSwitch from '../components/zoom-switch.tsx'
import CircleReveal from '../components/circle-reveal.tsx'
import SplitReveal from '../components/split-reveal.tsx'
import MosaicSwitch from '../components/mosaic-switch.tsx'
import GlitchSwitch from '../components/glitch-switch.tsx'
import SwingSwitch from '../components/swing-switch.tsx'
import ParallaxScroll from '../components/parallax-scroll.tsx'
import TearReveal from '../components/tear-reveal.tsx'
import { bool, color, num } from '../controls.js'
import { pagesUsage, pascal } from './shared.jsx'
import { demoPagesFor } from './transition-pages.jsx'

const autoPlay = num('Auto-play every (ms, 0 = off)', 0, 0, 8000, 250)
const duration = (value) => num('Duration (ms)', value, 200, 3000, 50)

// Every transition takes full-size pages as children.
// In small preview cards they auto-play instead of grabbing the scroll wheel.
const transition = (slug, name, Component, description, controls) => ({
  slug,
  name,
  category: 'Transitions',
  fill: true,
  capturesScroll: true,
  description,
  controls: { ...controls, autoPlay },
  demo: ({ preview, props }) => (
    <Component {...props} autoPlay={preview ? 2600 : props.autoPlay || undefined}>
      {demoPagesFor(slug, name)}
    </Component>
  ),
  usage: (p) => pagesUsage(pascal(slug), { ...p, autoPlay: p.autoPlay || undefined }),
})

export default [
  transition(
    'tear-reveal',
    'Tear Reveal',
    TearReveal,
    'Scroll and the page tears into shifting ribbons and code, which fall away to reveal the next page.',
    {
      duration: num('Duration (ms)', 1800, 600, 4000, 100),
      intensity: num('Tear intensity', 0.6, 0.2, 1, 0.05),
      tint: color('Tint colour', '#9bbbc7'),
      showCode: bool('Code ribbons', true),
    },
  ),
  transition(
    'blur-switch',
    'Blur Switch',
    BlurSwitch,
    'Scroll and the screen melts into a blur, the page swaps underneath, then it sharpens again.',
    { duration: duration(900) },
  ),
  transition(
    'horizontal-scroll',
    'Horizontal Scroll',
    HorizontalScroll,
    'Scroll down, move sideways. Vertical scrolling drives a horizontal track of panels.',
    { snap: bool('Snap to panels', true) },
  ),
  transition(
    'snap-scroll',
    'Snap Scroll',
    SnapScroll,
    'Full-screen pages that snap into place and settle in with a zoom.',
    {},
  ),
  transition(
    'cube-rotate',
    'Cube Rotate',
    CubeRotate,
    'Pages live on the faces of a 3D cube that turns as you scroll.',
    { duration: duration(1100) },
  ),
  transition(
    'book-flip',
    'Book Flip',
    BookFlip,
    'Each page turns over its left edge like the page of a book.',
    { duration: duration(1100) },
  ),
  transition(
    'stack-scroll',
    'Stack Scroll',
    StackScroll,
    'The next page slides over the last one, which sinks back into the stack.',
    {},
  ),
  transition(
    'zoom-switch',
    'Zoom Switch',
    ZoomSwitch,
    'Fly through the page: it zooms past you while the next one rushes in from behind.',
    { duration: duration(1000) },
  ),
  transition(
    'circle-reveal',
    'Circle Reveal',
    CircleReveal,
    'The next page grows out of a circle right where your cursor is.',
    { duration: duration(1100) },
  ),
  transition(
    'split-reveal',
    'Split Reveal',
    SplitReveal,
    'The page tears in half and both halves slide away.',
    { duration: duration(1000) },
  ),
  transition(
    'mosaic-switch',
    'Mosaic Switch',
    MosaicSwitch,
    'A diagonal wave of tiles covers the screen, then peels away on the new page.',
    {
      tileColor: color('Tile colour', '#c6f432'),
      columns: num('Columns', 10, 2, 24),
      rows: num('Rows', 6, 2, 16),
    },
  ),
  transition(
    'glitch-switch',
    'Glitch Switch',
    GlitchSwitch,
    'A burst of RGB glitch and torn slices, and suddenly you are somewhere else.',
    { duration: duration(650) },
  ),
  transition(
    'swing-switch',
    'Swing Switch',
    SwingSwitch,
    'The page swings up off its corner while the next one rises underneath.',
    { duration: duration(1000) },
  ),
  transition(
    'parallax-scroll',
    'Parallax Scroll',
    ParallaxScroll,
    'Content drifts slower than the scroll while floating shapes move on their own layers.',
    { showShapes: bool('Floating shapes', true) },
  ),
  transition('diagonal-switch', 'Diagonal Switch', DiagonalSwitch, 'A bright slash cuts across the screen and the next page wipes in diagonally behind it.', {
    duration: duration(900),
    slashColor: color('Slash colour', '#f2efe6'),
  }),
  transition('tear-switch', 'Tear Switch', TearSwitch, 'The page rips in two from a random spot and the wind blows both halves away.', {
    duration: num('Duration (ms)', 1300, 600, 3000, 50),
    wind: num('Wind strength', 0.7, 0.2, 1, 0.05),
  }),
  transition('depth-zoom', 'Depth Zoom', DepthZoom, 'Pages hang one behind another in 3D. Scrolling flies you forward through them, like moving through a video.', {
    depth: num('Gap between pages (px)', 1400, 400, 3000, 50),
    smoothing: num('Smoothness', 0.08, 0.02, 0.3, 0.01),
  }),
  transition('portal-switch', 'Portal Switch', PortalSwitch, "A ring of spinning sparks opens like a sorcerer's portal, with the next page on the other side.", {
    duration: num('Duration (ms)', 1800, 800, 4000, 50),
    color: color('Spark colour', '#f97316'),
    hotColor: color('Hot spark colour', '#fde68a'),
  }),
  transition('panel-switch', 'Panel Switch', PanelSwitch, 'The next page arrives as manga panels: the screen turns to paper, panels slam in one by one, then the gutters close up.', {
    duration: num('Duration (ms)', 1400, 700, 3000, 50),
    ink: color('Ink colour', '#22211f'),
    paper: color('Gutter colour', '#f2efe6'),
  }),
]
