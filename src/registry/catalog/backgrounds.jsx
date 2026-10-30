import SpeedLines from '../components/speed-lines.tsx'
import DotGrid from '../components/dot-grid.tsx'
import Aurora from '../components/aurora.tsx'
import Particles from '../components/particles.tsx'
import HoverGrid from '../components/hover-grid.tsx'
import FlowField from '../components/flow-field.tsx'
import StarfieldWarp from '../components/starfield-warp.tsx'
import GradientFollow from '../components/gradient-follow.tsx'
import WarpLines from '../components/warp-lines.tsx'
import GridBeams from '../components/grid-beams.tsx'
import FlickeringGrid from '../components/flickering-grid.tsx'
import GrainGradient from '../components/grain-gradient.tsx'
import RetroGrid from '../components/retro-grid.tsx'
import Meteors from '../components/meteors.tsx'
import MatrixRain from '../components/matrix-rain.tsx'
import WebShooter from '../components/web-shooter.tsx'
import { bool, color, colors, jsx, num, select } from '../controls.js'
import { BgTitle, bgUsage, pascal } from './shared.jsx'

const background = (slug, name, Component, description, title, sub, controls) => ({
  slug,
  name,
  category: 'Backgrounds',
  fill: true,
  description,
  controls,
  demo: ({ props }) => (
    <>
      <Component {...props} />
      <BgTitle sub={sub}>{title}</BgTitle>
    </>
  ),
  usage: (p) => bgUsage(jsx(pascal(slug), p)),
})

export default [
  background(
    'dot-grid',
    'Dot Field',
    DotGrid,
    'A springy field of dots that scatters from your cursor. Click to send a shockwave.',
    'Dot Field',
    'move · click',
    {
      glowColor: color('Glow colour', '#c6f432'),
      gap: num('Gap (px)', 24, 10, 60),
      radius: num('Cursor radius (px)', 140, 40, 400, 10),
    },
  ),
  background(
    'aurora',
    'Aurora',
    Aurora,
    'Rippling bands of light drifting across the sky, like the northern lights.',
    'Aurora',
    null,
    {
      colors: colors('Colours', ['#3b82f6', '#a5b4fc', '#22d3ee', '#c4b5fd', '#c6f432']),
      speed: num('Seconds per drift', 60, 5, 180, 5),
      masked: bool('Fade into corner', true),
    },
  ),
  background(
    'particles',
    'Particles',
    Particles,
    'A connected particle network that scatters away from your cursor.',
    'Particles',
    'move your cursor',
    {
      color: color('Colour', '#c6f432'),
      density: num('Density (per 100×100 px)', 9, 1, 30, 0.5),
      linkDistance: num('Link distance (px)', 110, 30, 250, 5),
    },
  ),
  background(
    'hover-grid',
    'Hover Grid',
    HoverGrid,
    'Grid cells light up under the cursor and leave a fading trail.',
    'Hover Grid',
    'paint with your cursor',
    {
      color: color('Colour', '#c6f432'),
      cellSize: num('Cell size (px)', 44, 12, 120),
      trail: num('Trail length', 0.94, 0.8, 0.99, 0.01),
    },
  ),
  background(
    'flow-field',
    'Flow Field',
    FlowField,
    'Thousands of particles riding an invisible current. Your cursor makes a whirlpool.',
    'Flow Field',
    'stir it',
    {
      density: num('Quantity (per 100×100 px)', 110, 5, 300, 5),
      colors: colors('Colours', ['#c6f432', '#22d3ee', '#ffffff']),
      size: num('Line size (px)', 1.2, 0.3, 5, 0.1),
      speed: num('Speed', 1, 0.2, 5, 0.1),
      direction: select('Direction', 'flow', ['flow', 'random', 'spiral', 'up', 'down', 'left', 'right']),
      trail: num('Trail length', 0.92, 0.6, 0.99, 0.01),
    },
  ),
  background(
    'starfield-warp',
    'Starfield Warp',
    StarfieldWarp,
    'Fly through space. Hold the mouse down to jump to warp speed.',
    'Hold to warp',
    'press and hold',
    {
      color: color('Star colour', '#ffffff'),
      count: num('Stars', 500, 50, 2500, 50),
      speed: num('Cruise speed', 2, 0.2, 15, 0.1),
      warpSpeed: num('Warp speed', 45, 5, 120),
    },
  ),
  background(
    'gradient-follow',
    'Gradient Follow',
    GradientFollow,
    'Three glowing blobs chase your cursor at different speeds.',
    'Gradient Follow',
    'move your cursor',
    {
      colors: colors('Colours', ['#c6f432', '#22d3ee', '#a855f7']),
      size: num('Blob size', 0.45, 0.1, 1, 0.05),
    },
  ),
  background(
    'warp-lines',
    'Warp Lines',
    WarpLines,
    'A curtain of thin lines that bends around your cursor.',
    'Warp Lines',
    'move your cursor',
    {
      highlightColor: color('Highlight colour', '#c6f432'),
      spacing: num('Spacing (px)', 16, 4, 60),
      radius: num('Cursor radius (px)', 160, 40, 400, 10),
    },
  ),
  background(
    'grid-beams',
    'Grid Beams',
    GridBeams,
    'Light beams race along a grid. Moving the cursor fires more of them.',
    'Grid Beams',
    'move your cursor',
    {
      beamColor: color('Beam colour', '#c6f432'),
      cellSize: num('Cell size (px)', 56, 16, 140, 2),
      rate: num('Beams per second', 4, 0.5, 30, 0.5),
    },
  ),
  background(
    'flickering-grid',
    'Flickering Grid',
    FlickeringGrid,
    'A field of tiny squares twinkling at random.',
    'Flickering Grid',
    null,
    {
      color: color('Colour', '#c6f432'),
      squareSize: num('Square size (px)', 4, 1, 16),
      gap: num('Gap (px)', 6, 1, 20),
      flickerChance: num('Flicker chance', 0.08, 0.01, 0.6, 0.01),
      maxOpacity: num('Max opacity', 0.35, 0.05, 1, 0.05),
    },
  ),
  background(
    'grain-gradient',
    'Grain Gradient',
    GrainGradient,
    'A slowly shifting mesh gradient with film grain on top.',
    'Grain Gradient',
    null,
    {
      colors: colors('Base + 3 blobs', ['#0c0a1d', '#c6f432', '#0e7490', '#7e22ce']),
      grain: num('Grain', 0.3, 0, 1, 0.05),
    },
  ),
  background(
    'retro-grid',
    'Synthwave',
    RetroGrid,
    'A striped 80s sun over a glowing grid floor that rolls toward you.',
    'Synthwave',
    null,
    {
      lineColor: color('Grid colour', '#e879f9'),
      skyColor: color('Sky colour', '#12031f'),
      showSun: bool('Sun', true),
      speed: num('Seconds per cell', 0.6, 0.1, 3, 0.1),
    },
  ),
  background(
    'meteors',
    'Meteors',
    Meteors,
    'Shooting stars streaking diagonally across the night.',
    'Meteors',
    null,
    {
      color: color('Colour', '#ffffff'),
      count: num('Meteors', 26, 1, 100),
    },
  ),
  background(
    'matrix-rain',
    'Matrix Rain',
    MatrixRain,
    'Falling glyph columns. Works on top of any background colour.',
    'Wake up, Neo',
    null,
    {
      color: color('Colour', '#c6f432'),
      fontSize: num('Font size (px)', 14, 6, 32),
      fps: num('Frames per second', 24, 4, 60),
    },
  ),
  {
    ...background(
      'web-shooter',
      'Web Shooter',
      WebShooter,
      'Spider-Man style: click to shoot an orb web, drag to string a zip line. The spider abseils down to inspect each one.',
      'Thwip!',
      'click to shoot a web',
      {
        webColor: color('Web colour', '#f4f4f5'),
        spiderColor: color('Spider colour', '#e11d48'),
        lifetime: num('Web lasts (s)', 5, 1, 15),
        spider: bool('Dangling spider', true),
        autoShoot: num('Auto-shoot every (ms, 0 = off)', 0, 0, 5000, 100),
        sound: bool('Comic sound effects', true),
      },
    ),
    demo: ({ preview, props }) => (
      <>
        <WebShooter {...props} autoShoot={preview ? 900 : props.autoShoot} />
        <BgTitle sub="click to shoot · drag to string a line">Thwip!</BgTitle>
      </>
    ),
  },
  {
    ...background('speed-lines', 'Speed Lines', SpeedLines, 'Manga speed lines in tapered ink: focus lines rushing to a point, or motion streaks. They shimmer like hand inking.', '', '', {
      mode: select('Style', 'focus', ['focus', 'motion']),
      lines: num('Lines', 160, 30, 400, 10),
      focus: num('Calm area size', 0.3, 0.05, 0.7, 0.01),
      follow: bool('Follow the cursor', true),
      color: color('Ink colour', '#22211f'),
      background: color('Paper colour', '#f2efe6'),
    }),
    demo: ({ props }) => (
      <>
        <SpeedLines {...props} />
        <p className="pointer-events-none relative z-10 rounded-[50%] border-[3px] border-[#22211f] bg-[#f2efe6] px-8 py-5 text-2xl font-black uppercase text-[#22211f]">
          Here it comes!
        </p>
      </>
    ),
  },
]
