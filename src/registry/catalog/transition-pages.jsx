// Demo pages for the Transitions category. Every transition gets its own
// themed set of four pages, so no two demos look alike.
// Sizes use container units so they look right in a small card or full screen.

const Page = ({ style, className = '', children }) => (
  <section className={`@container relative size-full overflow-hidden ${className}`} style={style}>
    {children}
  </section>
)

const Corner = ({ label, i, n = 4, className = '' }) => (
  <div
    className={`absolute inset-x-0 top-0 flex justify-between font-mono uppercase tracking-widest opacity-70 ${className}`}
    style={{ fontSize: 'max(10px, 1.4cqw)', padding: '5cqw 6cqw' }}
  >
    <span>{label}</span>
    <span>
      {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
    </span>
  </div>
)

const note = { fontSize: 'max(11px, 1.7cqw)' }

// ─── Layouts ────────────────────────────────────────────────────────────────

const layouts = {
  // Lines of code typing out on a dark screen
  terminal: ({ page, i, label }) => (
    <Page style={{ background: '#071821', color: '#cfe8f1' }} className="font-mono">
      <Corner label={label} i={i} />
      <div className="flex size-full flex-col justify-center" style={{ padding: '0 6cqw', gap: '1.6cqw' }}>
        {page.lines.map((line, j) => (
          <p key={j} style={{ fontSize: 'max(10px, 1.8cqw)', opacity: 0.45 + j * 0.12 }}>
            <span style={{ color: '#9bbbc7' }}>{String(j + 1).padStart(2, '0')}</span>
            {'  '}
            {line}
          </p>
        ))}
        <p className="font-bold" style={{ fontSize: '9cqw', color: '#9bbbc7', lineHeight: 1 }}>
          {page.title}
          <span className="animate-pulse">_</span>
        </p>
      </div>
    </Page>
  ),

  // Big soft colour blobs, like an out-of-focus photo
  aura: ({ page, i, label }) => (
    <Page style={{ background: page.bg, color: '#fff' }}>
      {page.blobs.map(([x, y, s, c], j) => (
        <span
          key={j}
          className="absolute rounded-full"
          style={{ left: `${x}%`, top: `${y}%`, width: `${s}cqw`, height: `${s}cqw`, background: c, filter: 'blur(6cqw)' }}
        />
      ))}
      <Corner label={label} i={i} />
      <div className="relative flex size-full flex-col items-center justify-center text-center">
        <p className="font-light italic tracking-tight" style={{ fontSize: '11cqw', lineHeight: 0.95 }}>
          {page.title}
        </p>
        <p className="mt-[2cqw] opacity-80" style={note}>
          {page.note}
        </p>
      </div>
    </Page>
  ),

  // A product shot with a name and price
  gallery: ({ page, i, label }) => (
    <Page style={{ background: page.bg, color: '#18181b' }}>
      <Corner label={label} i={i} />
      <div className="grid size-full grid-cols-2 items-center" style={{ padding: '0 6cqw', gap: '4cqw' }}>
        <div className="grid aspect-square place-items-center rounded-[3cqw]" style={{ background: page.shade }}>
          <span
            className="block shadow-2xl"
            style={{ width: '18cqw', height: '18cqw', background: page.object, borderRadius: page.radius }}
          />
        </div>
        <div>
          <p className="font-mono uppercase tracking-widest opacity-60" style={note}>
            Collection 2026
          </p>
          <p className="mt-[1cqw] font-semibold tracking-tight" style={{ fontSize: '7cqw', lineHeight: 1 }}>
            {page.title}
          </p>
          <p className="mt-[2cqw] font-mono" style={{ fontSize: '3cqw' }}>
            {page.price}
          </p>
        </div>
      </div>
    </Page>
  ),

  // One giant number and what it means
  stat: ({ page, i, label }) => (
    <Page style={{ background: page.bg, color: page.color }}>
      <Corner label={label} i={i} />
      <div className="flex size-full flex-col items-start justify-end" style={{ padding: '6cqw' }}>
        <p className="font-black tabular-nums tracking-tighter" style={{ fontSize: '26cqw', lineHeight: 0.8 }}>
          {page.title}
        </p>
        <p className="mt-[2cqw] max-w-[50cqw] font-medium opacity-80" style={{ fontSize: 'max(12px, 2.2cqw)' }}>
          {page.note}
        </p>
      </div>
    </Page>
  ),

  // Bold poster: one word and a huge face label
  poster: ({ page, i, label }) => (
    <Page style={{ background: page.bg, color: page.color }}>
      <Corner label={label} i={i} />
      <span
        aria-hidden
        className="absolute font-black uppercase leading-none tracking-tighter opacity-15"
        style={{ fontSize: '30cqw', right: '-2cqw', bottom: '-4cqw' }}
      >
        {page.big}
      </span>
      <div className="relative flex size-full flex-col justify-center" style={{ padding: '0 6cqw' }}>
        <p className="font-black uppercase tracking-tighter" style={{ fontSize: '13cqw', lineHeight: 0.85 }}>
          {page.title}
        </p>
        <p className="mt-[2cqw] max-w-[50cqw] opacity-80" style={note}>
          {page.note}
        </p>
      </div>
    </Page>
  ),

  // A page from a printed book
  book: ({ page, i }) => (
    <Page style={{ background: '#f4ecd8', color: '#3b2f22' }} className="font-serif">
      <div className="flex size-full flex-col" style={{ padding: '6cqw 9cqw' }}>
        <p className="text-center italic opacity-60" style={note}>
          The Little Book of Components
        </p>
        <p className="mt-[5cqw] text-center uppercase tracking-[0.3em] opacity-70" style={note}>
          Chapter {['One', 'Two', 'Three', 'Four'][i]}
        </p>
        <p className="mt-[1cqw] text-center" style={{ fontSize: '6cqw', lineHeight: 1.05 }}>
          {page.title}
        </p>
        <p className="mt-[3cqw] text-justify leading-relaxed" style={{ fontSize: 'max(11px, 1.9cqw)' }}>
          <span className="float-left mr-[1cqw] leading-[0.8]" style={{ fontSize: '7cqw' }}>
            {page.text[0]}
          </span>
          {page.text.slice(1)}
        </p>
        <p className="mt-auto text-center opacity-60" style={note}>
          {i * 2 + 12}
        </p>
      </div>
    </Page>
  ),

  // A numbered step in a process, on a card
  step: ({ page, i, label }) => (
    <Page style={{ background: page.bg, color: '#18181b' }}>
      <Corner label={label} i={i} />
      <div className="flex size-full items-center" style={{ padding: '0 6cqw', gap: '5cqw' }}>
        <span
          className="grid shrink-0 place-items-center rounded-full font-black text-white"
          style={{ width: '18cqw', height: '18cqw', fontSize: '8cqw', background: page.accent }}
        >
          {i + 1}
        </span>
        <div>
          <p className="font-mono uppercase tracking-widest opacity-60" style={note}>
            Step {String(i + 1).padStart(2, '0')}
          </p>
          <p className="font-semibold tracking-tight" style={{ fontSize: '8cqw', lineHeight: 1 }}>
            {page.title}
          </p>
          <p className="mt-[1.5cqw] max-w-[45cqw] opacity-70" style={note}>
            {page.note}
          </p>
        </div>
      </div>
    </Page>
  ),

  // A planet floating in space
  space: ({ page, i, label }) => (
    <Page style={{ background: 'radial-gradient(circle at 70% 50%, #111827, #000 70%)', color: '#fff' }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 10% 20%, #fff, transparent), radial-gradient(1px 1px at 30% 70%, #fff, transparent), radial-gradient(1.5px 1.5px at 55% 15%, #fff, transparent), radial-gradient(1px 1px at 85% 80%, #fff, transparent), radial-gradient(1px 1px at 45% 45%, #fff, transparent), radial-gradient(1.5px 1.5px at 92% 30%, #fff, transparent)',
        }}
      />
      <span
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: '38cqw',
          height: '38cqw',
          right: '8cqw',
          top: '50%',
          transform: 'translateY(-50%)',
          background: page.planet,
          boxShadow: `0 0 12cqw ${page.glow}, inset -6cqw -4cqw 8cqw rgba(0,0,0,0.6)`,
        }}
      />
      {page.ring && (
        <span
          aria-hidden
          className="absolute rounded-[50%] border-[1.2cqw] border-amber-200/50"
          style={{ width: '60cqw', height: '14cqw', right: '-3cqw', top: '50%', transform: 'translateY(-50%) rotate(-12deg)' }}
        />
      )}
      <Corner label={label} i={i} />
      <div className="relative flex size-full flex-col justify-center" style={{ padding: '0 6cqw' }}>
        <p className="font-mono uppercase tracking-widest opacity-60" style={note}>
          {page.distance}
        </p>
        <p className="font-semibold tracking-tight" style={{ fontSize: '11cqw', lineHeight: 1 }}>
          {page.title}
        </p>
      </div>
    </Page>
  ),

  // A paint swatch
  swatch: ({ page, i, label }) => (
    <Page style={{ background: page.bg, color: page.color }}>
      <Corner label={label} i={i} />
      <div className="flex size-full items-end justify-between" style={{ padding: '6cqw' }}>
        <div>
          <p className="font-semibold tracking-tight" style={{ fontSize: '10cqw', lineHeight: 1 }}>
            {page.title}
          </p>
          <p className="mt-[1cqw] font-mono uppercase" style={{ fontSize: '2.4cqw' }}>
            {page.bg}
          </p>
        </div>
        <div className="flex" style={{ gap: '1.2cqw' }}>
          {page.tints.map((t) => (
            <span key={t} className="rounded-full border border-black/10" style={{ width: '6cqw', height: '6cqw', background: t }} />
          ))}
        </div>
      </div>
    </Page>
  ),

  // The front page of a newspaper
  editorial: ({ page, i }) => (
    <Page style={{ background: '#fafaf9', color: '#0c0a09' }}>
      <div className="flex size-full flex-col" style={{ padding: '5cqw 6cqw' }}>
        <div className="flex items-end justify-between border-b-[0.4cqw] border-current pb-[1cqw]">
          <p className="font-serif font-black italic" style={{ fontSize: '5cqw', lineHeight: 1 }}>
            The Daily Split
          </p>
          <p className="font-mono uppercase" style={note}>
            Issue {i + 41}
          </p>
        </div>
        <p className="mt-[4cqw] font-serif font-bold tracking-tight" style={{ fontSize: '9cqw', lineHeight: 0.95 }}>
          {page.title}
        </p>
        <div className="mt-[3cqw] grid grid-cols-3 border-t border-current/30 pt-[2cqw]" style={{ gap: '3cqw' }}>
          {page.columns.map((c, j) => (
            <p key={j} className="font-serif leading-snug opacity-75" style={note}>
              {c}
            </p>
          ))}
        </div>
      </div>
    </Page>
  ),

  // A retro game level on a checkerboard
  pixel: ({ page, i, label }) => (
    <Page
      style={{
        background: page.bg,
        backgroundImage: `repeating-conic-gradient(${page.tile} 0 25%, transparent 0 50%)`,
        backgroundSize: '8cqw 8cqw',
        color: '#fff',
      }}
      className="font-mono"
    >
      <Corner label={label} i={i} />
      <div className="flex size-full flex-col items-center justify-center text-center">
        <p className="font-bold uppercase" style={{ fontSize: '3cqw', letterSpacing: '0.4em' }}>
          Level {i + 1}
        </p>
        <p
          className="font-black uppercase"
          style={{ fontSize: '11cqw', lineHeight: 1, textShadow: '0.8cqw 0.8cqw 0 #000' }}
        >
          {page.title}
        </p>
        <p className="mt-[2cqw] bg-black px-[2cqw] py-[0.8cqw]" style={note}>
          {page.note}
        </p>
      </div>
    </Page>
  ),

  // Neon cyberpunk sign with split colour channels
  neon: ({ page, i, label }) => (
    <Page style={{ background: '#05010a', color: '#fff' }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 4px)' }}
      />
      <Corner label={label} i={i} className="text-fuchsia-300" />
      <div className="relative flex size-full flex-col items-center justify-center text-center">
        <p
          className="font-black uppercase tracking-tight"
          style={{ fontSize: '17cqw', lineHeight: 0.9, textShadow: `-0.8cqw 0 ${page.a}, 0.8cqw 0 ${page.b}` }}
        >
          {page.title}
        </p>
        <p className="mt-[2cqw] font-mono uppercase tracking-widest" style={{ ...note, color: page.b }}>
          {page.note}
        </p>
      </div>
    </Page>
  ),

  // Layered mountains under a changing sky
  landscape: ({ page, i, label }) => (
    <Page style={{ background: page.sky, color: '#fff' }}>
      <span
        aria-hidden
        className="absolute rounded-full"
        style={{ width: '14cqw', height: '14cqw', left: '62%', top: '18%', background: page.sun, boxShadow: `0 0 8cqw ${page.sun}` }}
      />
      <svg aria-hidden viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-3/5 w-full">
        <polygon points="0,50 0,22 18,10 34,26 52,8 70,24 86,12 100,20 100,50" fill={page.hills[0]} />
        <polygon points="0,50 0,32 22,20 40,34 60,22 78,36 100,26 100,50" fill={page.hills[1]} />
        <polygon points="0,50 0,42 26,34 50,44 74,36 100,42 100,50" fill={page.hills[2]} />
      </svg>
      <Corner label={label} i={i} />
      <div className="relative flex h-1/2 flex-col justify-end" style={{ padding: '0 6cqw' }}>
        <p className="font-semibold tracking-tight" style={{ fontSize: '11cqw', lineHeight: 1 }}>
          {page.title}
        </p>
      </div>
    </Page>
  ),
}

// ─── Page sets, one per transition ───────────────────────────────────────────

const sets = {
  'tear-reveal': [
    { layout: 'terminal', title: 'Booting', lines: ['import { tear } from "./fx"', 'const page = await load(1)', 'page.mount()'] },
    { layout: 'terminal', title: 'Compiling', lines: ['vite build --mode prod', '214 modules transformed', 'rendering chunks...'] },
    { layout: 'terminal', title: 'Linking', lines: ['resolve("./page-03")', 'link(shaders, glyphs)', 'ok in 42ms'] },
    { layout: 'terminal', title: 'Shipped', lines: ['git push origin main', 'deploy: ready', 'scroll up to rewind'] },
  ],
  'blur-switch': [
    { layout: 'aura', bg: '#1e1b4b', title: 'Out of focus', note: 'Scroll to melt into the next page.', blobs: [[10, 20, 40, '#f472b6'], [55, 50, 45, '#6366f1']] },
    { layout: 'aura', bg: '#422006', title: 'Golden hour', note: 'Everything goes soft for a moment.', blobs: [[50, 10, 45, '#f59e0b'], [5, 55, 35, '#ef4444']] },
    { layout: 'aura', bg: '#042f2e', title: 'Sea haze', note: 'Then it sharpens again.', blobs: [[20, 40, 50, '#14b8a6'], [65, 5, 30, '#a3e635']] },
    { layout: 'aura', bg: '#18181b', title: 'Clear', note: 'Scroll back up to rewind.', blobs: [[35, 30, 40, '#e4e4e7']] },
  ],
  'horizontal-scroll': [
    { layout: 'gallery', bg: '#fef3c7', shade: '#fde68a', object: '#f59e0b', radius: '50%', title: 'Sun Lamp', price: '$129' },
    { layout: 'gallery', bg: '#dbeafe', shade: '#bfdbfe', object: '#2563eb', radius: '1cqw', title: 'Blue Stool', price: '$89' },
    { layout: 'gallery', bg: '#fce7f3', shade: '#fbcfe8', object: '#db2777', radius: '50% 50% 1cqw 1cqw', title: 'Arch Vase', price: '$64' },
    { layout: 'gallery', bg: '#dcfce7', shade: '#bbf7d0', object: '#16a34a', radius: '30%', title: 'Moss Pot', price: '$42' },
  ],
  'snap-scroll': [
    { layout: 'stat', bg: '#c6f432', color: '#09090b', title: '98%', note: 'of visitors scroll past the first screen.' },
    { layout: 'stat', bg: '#09090b', color: '#fafafa', title: '12ms', note: 'to snap each page into place.' },
    { layout: 'stat', bg: '#f97316', color: '#09090b', title: '4.9', note: 'average rating from people who like snappy things.' },
    { layout: 'stat', bg: '#e4e4e7', color: '#09090b', title: '0', note: 'animation libraries used.' },
  ],
  'cube-rotate': [
    { layout: 'poster', bg: '#ef4444', color: '#fff', big: 'F', title: 'Front', note: 'Each page is a face of the cube.' },
    { layout: 'poster', bg: '#3b82f6', color: '#fff', big: 'R', title: 'Right', note: 'It turns a quarter each scroll.' },
    { layout: 'poster', bg: '#facc15', color: '#18181b', big: 'B', title: 'Back', note: 'Halfway around now.' },
    { layout: 'poster', bg: '#22c55e', color: '#052e16', big: 'L', title: 'Left', note: 'One more turn and you are home.' },
  ],
  'book-flip': [
    { layout: 'book', title: 'A Button Is Born', text: 'Once upon a time, a plain grey button wished it could do more than be clicked. It dreamed of ripples, of glows, of tiny springs.' },
    { layout: 'book', title: 'The Long Scroll', text: 'The page went on and on, and the reader scrolled and scrolled, until one day the page turned over like this one.' },
    { layout: 'book', title: 'Into the Lab', text: 'Deep in the Lab, components were tested, broken and rebuilt, each one a little smoother than the last.' },
    { layout: 'book', title: 'The End', text: 'And they all rendered happily at sixty frames a second. Turn back the pages to read it again.' },
  ],
  'stack-scroll': [
    { layout: 'step', bg: '#f4f4f5', accent: '#6366f1', title: 'Research', note: 'Find out what people need.' },
    { layout: 'step', bg: '#e4e4e7', accent: '#ec4899', title: 'Sketch', note: 'Draw rough ideas, fast.' },
    { layout: 'step', bg: '#d4d4d8', accent: '#f59e0b', title: 'Build', note: 'Turn the best sketch into code.' },
    { layout: 'step', bg: '#c6f432', accent: '#18181b', title: 'Ship', note: 'Put it in front of real people.' },
  ],
  'zoom-switch': [
    { layout: 'space', title: 'Earth', distance: 'You are here', planet: 'radial-gradient(circle at 35% 35%, #60a5fa, #1d4ed8 60%, #14532d)', glow: '#3b82f680' },
    { layout: 'space', title: 'Moon', distance: '384,400 km', planet: 'radial-gradient(circle at 35% 35%, #e5e7eb, #6b7280)', glow: '#e5e7eb40' },
    { layout: 'space', title: 'Mars', distance: '225 million km', planet: 'radial-gradient(circle at 35% 35%, #fb923c, #9a3412)', glow: '#f9731660' },
    { layout: 'space', title: 'Saturn', distance: '1.4 billion km', planet: 'radial-gradient(circle at 35% 35%, #fde68a, #b45309)', glow: '#f59e0b50', ring: true },
  ],
  'circle-reveal': [
    { layout: 'swatch', bg: '#c6f432', color: '#1a2e05', title: 'Lime', tints: ['#ecfccb', '#d9f99d', '#a3e635'] },
    { layout: 'swatch', bg: '#fb7185', color: '#4c0519', title: 'Coral', tints: ['#ffe4e6', '#fecdd3', '#e11d48'] },
    { layout: 'swatch', bg: '#0ea5e9', color: '#082f49', title: 'Ocean', tints: ['#e0f2fe', '#7dd3fc', '#0369a1'] },
    { layout: 'swatch', bg: '#7c3aed', color: '#f5f3ff', title: 'Plum', tints: ['#ede9fe', '#c4b5fd', '#4c1d95'] },
  ],
  'split-reveal': [
    { layout: 'editorial', title: 'Page Splits in Two, Nobody Hurt', columns: ['Witnesses say both halves slid away calmly.', 'The next page was found safe underneath.', 'Experts call it a clean break.'] },
    { layout: 'editorial', title: 'Local Button Wins Award for Bounce', columns: ['The springy toggle beat forty rivals.', 'Judges praised its overshoot.', 'It plans to keep bouncing.'] },
    { layout: 'editorial', title: 'Scroll Wheel Reports Record Week', columns: ['Usage up by a lot this week.', 'Fingers are said to be tired.', 'More pages expected soon.'] },
    { layout: 'editorial', title: 'Final Edition: Thanks for Reading', columns: ['Scroll back up for older issues.', 'All stories are free to copy.', 'Printed with zero dependencies.'] },
  ],
  'mosaic-switch': [
    { layout: 'pixel', bg: '#1d4ed8', tile: '#1e40af', title: 'Start', note: 'Press scroll to play' },
    { layout: 'pixel', bg: '#15803d', tile: '#166534', title: 'Forest', note: 'Tiles cover the screen' },
    { layout: 'pixel', bg: '#b91c1c', tile: '#991b1b', title: 'Lava', note: 'Then they peel away' },
    { layout: 'pixel', bg: '#6d28d9', tile: '#5b21b6', title: 'Boss', note: 'You win. Scroll up to replay' },
  ],
  'glitch-switch': [
    { layout: 'neon', title: 'Signal', note: 'Channel 01 // locked', a: '#ff00e5', b: '#00f0ff' },
    { layout: 'neon', title: 'Noise', note: 'Channel 02 // interference', a: '#00ff85', b: '#ff003c' },
    { layout: 'neon', title: 'Error', note: 'Channel 03 // corrupted', a: '#ffe600', b: '#7a00ff' },
    { layout: 'neon', title: 'Reset', note: 'Channel 04 // scroll up', a: '#00f0ff', b: '#ff00e5' },
  ],
  'swing-switch': [
    { layout: 'poster', bg: '#fb923c', color: '#431407', big: 'Hi', title: 'Swing', note: 'The page swings up off its corner.' },
    { layout: 'poster', bg: '#a3e635', color: '#1a2e05', big: 'Oh', title: 'Hang', note: 'It dangles for a moment.' },
    { layout: 'poster', bg: '#f472b6', color: '#500724', big: 'Up', title: 'Drop', note: 'Then the next one rises underneath.' },
    { layout: 'poster', bg: '#38bdf8', color: '#082f49', big: 'Ok', title: 'Land', note: 'Scroll back up to rewind.' },
  ],
  'parallax-scroll': [
    { layout: 'landscape', title: 'Dawn', sky: 'linear-gradient(#fda4af, #fde68a)', sun: '#fff7ed', hills: ['#c084fc', '#9333ea', '#581c87'] },
    { layout: 'landscape', title: 'Noon', sky: 'linear-gradient(#38bdf8, #bae6fd)', sun: '#fef9c3', hills: ['#4ade80', '#16a34a', '#14532d'] },
    { layout: 'landscape', title: 'Dusk', sky: 'linear-gradient(#f97316, #7c2d12)', sun: '#fde68a', hills: ['#9a3412', '#7c2d12', '#431407'] },
    { layout: 'landscape', title: 'Night', sky: 'linear-gradient(#020617, #1e1b4b)', sun: '#e2e8f0', hills: ['#1e293b', '#0f172a', '#020617'] },
  ],
}

sets['panel-switch'] = [
  { layout: 'poster', bg: '#f2efe6', color: '#22211f', big: '01', title: 'Chapter one', note: 'Scroll, and the next page slams in panel by panel.' },
  { layout: 'poster', bg: '#22211f', color: '#f2efe6', big: '02', title: 'The rival', note: 'Every panel flies in from its own side.' },
  { layout: 'poster', bg: '#d3cec2', color: '#22211f', big: '03', title: 'Showdown', note: 'Then the gutters close and the page is whole.' },
  { layout: 'poster', bg: '#f2efe6', color: '#22211f', big: '04', title: 'To be continued', note: 'Scroll back up to rewind.' },
]

// The newer transitions borrow a theme that suits them
sets['tear-switch'] = sets['split-reveal']
sets['depth-zoom'] = sets['zoom-switch'].map((p) => ({ ...p }))
sets['portal-switch'] = sets['blur-switch']
sets['diagonal-switch'] = sets['glitch-switch']
sets['zoom-switch'] = sets['parallax-scroll']

export const demoPagesFor = (slug, label) =>
  (sets[slug] ?? sets['snap-scroll']).map((page, i) => {
    const Layout = layouts[page.layout]
    return <Layout key={i} page={page} i={i} label={label} />
  })
