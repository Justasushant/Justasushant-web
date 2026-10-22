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
import { bool, color, num } from '../controls.js'
import { demoPages, pagesUsage, pascal } from './shared.jsx'

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
      {demoPages(name)}
    </Component>
  ),
  usage: (p) => pagesUsage(pascal(slug), { ...p, autoPlay: p.autoPlay || undefined }),
})

export default [
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
]
