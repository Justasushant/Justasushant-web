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
    <Page style={{ background: '#1a0e08', color: '#fff6ef' }} className="font-mono">
      <Corner label={label} i={i} />
      <div className="flex size-full flex-col justify-center" style={{ padding: '0 6cqw', gap: '1.6cqw' }}>
        {page.lines.map((line, j) => (
          <p key={j} style={{ fontSize: 'max(10px, 1.8cqw)', opacity: 0.45 + j * 0.12 }}>
            <span style={{ color: '#ffb27a' }}>{String(j + 1).padStart(2, '0')}</span>
            {'  '}
            {line}
          </p>
        ))}
        <p className="font-bold" style={{ fontSize: '9cqw', color: '#ffb27a', lineHeight: 1 }}>
          {page.title}
          <span className="animate-pulse">_</span>
        </p>
      </div>
    </Page>
  ),

  // One big line of type on a flat colour
  type: ({ page, i, label }) => (
    <Page style={{ background: page.bg, color: page.color }}>
      <Corner label={label} i={i} />
      <div className="flex size-full flex-col justify-end" style={{ padding: '6cqw' }}>
        <p className="font-semibold" style={{ fontSize: '12cqw', lineHeight: 0.95, letterSpacing: '-0.04em' }}>
          {page.title}
        </p>
        <p className="opacity-70" style={{ ...note, maxWidth: '50cqw', marginTop: '2cqw' }}>
          {page.note}
        </p>
      </div>
    </Page>
  ),

  // Words on the left, a solid block with a flat shape on the right
  split: ({ page, i, label }) => (
    <Page style={{ background: page.bg, color: page.color }}>
      <div className="grid size-full grid-cols-2">
        <div className="flex flex-col justify-between" style={{ padding: '6cqw' }}>
          <span className="font-mono uppercase tracking-widest opacity-60" style={{ fontSize: 'max(10px, 1.4cqw)' }}>
            {label} · {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="font-semibold" style={{ fontSize: '9cqw', lineHeight: 0.95, letterSpacing: '-0.04em' }}>
              {page.title}
            </p>
            <p className="opacity-70" style={{ ...note, marginTop: '2cqw' }}>
              {page.note}
            </p>
          </div>
        </div>
        <div className="grid place-items-center" style={{ background: page.block }}>
          <span className="block rounded-full" style={{ width: '24cqw', height: '24cqw', background: page.dot }} />
        </div>
      </div>
    </Page>
  ),

  // A short index: a title and ruled rows
  list: ({ page, i, label }) => (
    <Page style={{ background: page.bg, color: page.color }}>
      <Corner label={label} i={i} />
      <div className="flex size-full flex-col justify-center" style={{ padding: '0 6cqw' }}>
        <p className="font-semibold" style={{ fontSize: '8cqw', lineHeight: 1, letterSpacing: '-0.04em' }}>
          {page.title}
        </p>
        <ul style={{ marginTop: '3cqw', ...note }}>
          {page.rows.map(([name, value]) => (
            <li
              key={name}
              className="flex justify-between"
              style={{ padding: '1.2cqw 0', borderTop: '1px solid color-mix(in srgb, currentColor 22%, transparent)' }}
            >
              <span>{name}</span>
              <span className="opacity-60">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  ),

  gallery: ({ page, i, label }) => (
    <Page style={{ background: page.bg, color: '#1a0e08' }}>
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
    <Page style={{ background: '#fff6ef', color: '#1a0e08' }} className="font-serif">
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
    <Page style={{ background: page.bg, color: '#1a0e08' }}>
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
    <Page style={{ background: '#f8f4ee', color: '#1a0e08' }}>
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
    {layout:'type',bg:'#f8f4ee',color:'#1a0e08',title:'Soft focus',note:'Scroll, and the page melts away.'},
    {layout:'type',bg:'#1a0e08',color:'#fff6ef',title:'Out of sight',note:'Another page waits underneath.'},
    {layout:'type',bg:'#e8500e',color:'#1a0e08',title:'Coming into view',note:'It sharpens as you settle.'},
    {layout:'type',bg:'#e8e0d6',color:'#1a0e08',title:'Clear again',note:'Scroll back up to rewind.'},
  ],
  'horizontal-scroll': [
    {layout:'gallery',bg:'#f8f4ee',shade:'#e8e0d6',object:'#e8500e',radius:'50%',title:'Sun Lamp',price:'$129'},
    {layout:'gallery',bg:'#e8e0d6',shade:'#d2c7bc',object:'#1a0e08',radius:'1cqw',title:'Oak Stool',price:'$89'},
    {layout:'gallery',bg:'#fff6ef',shade:'#f3eee7',object:'#c2410c',radius:'50% 50% 1cqw 1cqw',title:'Arch Vase',price:'$64'},
    {layout:'gallery',bg:'#f8f4ee',shade:'#e8e0d6',object:'#8b786b',radius:'30%',title:'Clay Pot',price:'$42'},
  ],
  'snap-scroll': [
    { layout: 'stat', bg: '#e8500e', color: '#1a0e08', title: '98%', note: 'of visitors scroll past the first screen.' },
    { layout: 'stat', bg: '#1a0e08', color: '#fafafa', title: '12ms', note: 'to snap each page into place.' },
    { layout: 'stat', bg: '#f97316', color: '#1a0e08', title: '4.9', note: 'average rating from people who like snappy things.' },
    { layout: 'stat', bg: '#e4e4e7', color: '#1a0e08', title: '0', note: 'animation libraries used.' },
  ],
  'cube-rotate': [
    {layout:'poster',bg:'#1a0e08',color:'#fff6ef',big:'F',title:'Front',note:'Each page is a face of the cube.'},
    {layout:'poster',bg:'#e8500e',color:'#1a0e08',big:'R',title:'Right',note:'It turns a quarter each scroll.'},
    {layout:'poster',bg:'#e8e0d6',color:'#1a0e08',big:'B',title:'Back',note:'Halfway around now.'},
    {layout:'poster',bg:'#f8f4ee',color:'#1a0e08',big:'L',title:'Left',note:'One more turn and you are home.'},
  ],
  'book-flip': [
    { layout: 'book', title: 'A Button Is Born', text: 'Once upon a time, a plain grey button wished it could do more than be clicked. It dreamed of ripples, of glows, of tiny springs.' },
    { layout: 'book', title: 'The Long Scroll', text: 'The page went on and on, and the reader scrolled and scrolled, until one day the page turned over like this one.' },
    { layout: 'book', title: 'Into the Lab', text: 'Deep in the Lab, components were tested, broken and rebuilt, each one a little smoother than the last.' },
    { layout: 'book', title: 'The End', text: 'And they all rendered happily at sixty frames a second. Turn back the pages to read it again.' },
  ],
  'stack-scroll': [
    {layout:'step',bg:'#f8f4ee',accent:'#1a0e08',title:'Research',note:'Find out what people need.'},
    {layout:'step',bg:'#e8e0d6',accent:'#1a0e08',title:'Sketch',note:'Draw rough ideas, fast.'},
    {layout:'step',bg:'#d2c7bc',accent:'#1a0e08',title:'Build',note:'Turn the best sketch into code.'},
    {layout:'step',bg:'#e8500e',accent:'#1a0e08',title:'Ship',note:'Put it in front of real people.'},
  ],
  'zoom-switch': [
    {layout:'split',bg:'#f8f4ee',color:'#1a0e08',title:'Earth',note:'You are here.',block:'#1a0e08',dot:'#3b6fd8'},
    {layout:'split',bg:'#1a0e08',color:'#fff6ef',title:'Moon',note:'384,400 km away.',block:'#e8e0d6',dot:'#b4aea4'},
    {layout:'split',bg:'#f8f4ee',color:'#1a0e08',title:'Mars',note:'225 million km away.',block:'#e8500e',dot:'#1a0e08'},
    {layout:'split',bg:'#e8e0d6',color:'#1a0e08',title:'Saturn',note:'1.4 billion km away.',block:'#1a0e08',dot:'#e9c46a'},
  ],
  'circle-reveal': [
    {layout:'swatch',bg:'#e8500e',color:'#1a0e08',title:'Orange',tints:['#ffedd5','#fdba74','#ea580c']},
    {layout:'swatch',bg:'#e8e0d6',color:'#1a0e08',title:'Sand',tints:['#f8f4ee','#d2c7bc','#8b786b']},
    {layout:'swatch',bg:'#1a0e08',color:'#fff6ef',title:'Ink',tints:['#e8e0d6','#8b786b','#43291c']},
    {layout:'swatch',bg:'#f8f4ee',color:'#1a0e08',title:'Cream',tints:['#fff6ef','#e8e0d6','#d2c7bc']},
  ],
  'split-reveal': [
    { layout: 'editorial', title: 'Page Splits in Two, Nobody Hurt', columns: ['Witnesses say both halves slid away calmly.', 'The next page was found safe underneath.', 'Experts call it a clean break.'] },
    { layout: 'editorial', title: 'Local Button Wins Award for Bounce', columns: ['The springy toggle beat forty rivals.', 'Judges praised its overshoot.', 'It plans to keep bouncing.'] },
    { layout: 'editorial', title: 'Scroll Wheel Reports Record Week', columns: ['Usage up by a lot this week.', 'Fingers are said to be tired.', 'More pages expected soon.'] },
    { layout: 'editorial', title: 'Final Edition: Thanks for Reading', columns: ['Scroll back up for older issues.', 'All stories are free to copy.', 'Printed with zero dependencies.'] },
  ],
  'mosaic-switch': [
    {layout:'list',bg:'#f8f4ee',color:'#1a0e08',title:'Starters',rows:[['Soup of the day','4'],['House salad','6'],['Warm bread','3']]},
    {layout:'list',bg:'#1a0e08',color:'#fff6ef',title:'Mains',rows:[['Roast chicken','14'],['Mushroom pasta','12'],['Grilled fish','16']]},
    {layout:'list',bg:'#e8500e',color:'#1a0e08',title:'Desserts',rows:[['Lemon tart','6'],['Chocolate cake','7'],['Ice cream','4']]},
    {layout:'list',bg:'#e8e0d6',color:'#1a0e08',title:'Drinks',rows:[['Filter coffee','3'],['Fresh juice','5'],['Sparkling water','2']]},
  ],
  'glitch-switch': [
    {layout:'type',bg:'#1a0e08',color:'#fff6ef',title:'Signal',note:'Channel one, loud and clear.'},
    {layout:'type',bg:'#f8f4ee',color:'#1a0e08',title:'Noise',note:'Channel two, a little rough.'},
    {layout:'type',bg:'#e8500e',color:'#1a0e08',title:'Error',note:'Channel three, lost.'},
    {layout:'type',bg:'#1a0e08',color:'#fff6ef',title:'Reset',note:'Scroll back up to start over.'},
  ],
  'swing-switch': [
    {layout:'poster',bg:'#e8500e',color:'#1a0e08',big:'Hi',title:'Swing',note:'The page swings up off its corner.'},
    {layout:'poster',bg:'#f8f4ee',color:'#1a0e08',big:'Oh',title:'Hang',note:'It dangles for a moment.'},
    {layout:'poster',bg:'#1a0e08',color:'#fff6ef',big:'Up',title:'Drop',note:'Then the next one rises underneath.'},
    {layout:'poster',bg:'#e8e0d6',color:'#1a0e08',big:'Ok',title:'Land',note:'Scroll back up to rewind.'},
  ],
  'parallax-scroll': [
    {layout:'split',bg:'#f8f4ee',color:'#1a0e08',title:'Dawn',note:'The day starts slowly.',block:'#f4c7a1',dot:'#fff6ef'},
    {layout:'split',bg:'#f8f4ee',color:'#1a0e08',title:'Noon',note:'Everything is in view.',block:'#bcd7ea',dot:'#f7d774'},
    {layout:'split',bg:'#1a0e08',color:'#fff6ef',title:'Dusk',note:'The light turns warm.',block:'#e8500e',dot:'#fff6ef'},
    {layout:'split',bg:'#1a0e08',color:'#fff6ef',title:'Night',note:'Quiet again.',block:'#2a1309',dot:'#e8e0d6'},
  ],
}

sets['panel-switch'] = [
  { layout: 'poster', bg: '#f8f4ee', color: '#1a0e08', big: '01', title: 'Chapter one', note: 'Scroll, and the next page slams in panel by panel.' },
  { layout: 'poster', bg: '#1a0e08', color: '#f8f4ee', big: '02', title: 'The rival', note: 'Every panel flies in from its own side.' },
  { layout: 'poster', bg: '#e8e0d6', color: '#1a0e08', big: '03', title: 'Showdown', note: 'Then the gutters close and the page is whole.' },
  { layout: 'poster', bg: '#f8f4ee', color: '#1a0e08', big: '04', title: 'To be continued', note: 'Scroll back up to rewind.' },
]

// The newer transitions borrow a theme that suits them
sets['tear-switch'] = sets['split-reveal']
sets['depth-zoom'] = sets['zoom-switch'].map((p) => ({ ...p }))
sets['diagonal-switch'] = sets['glitch-switch']
sets['zoom-switch'] = sets['parallax-scroll']

export const demoPagesFor = (slug, label) =>
  (sets[slug] ?? sets['snap-scroll']).map((page, i) => {
    const Layout = layouts[page.layout]
    return <Layout key={i} page={page} i={i} label={label} />
  })
