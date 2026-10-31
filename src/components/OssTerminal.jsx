import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { site } from '../data/site.js'
import { excuses, ossProjects } from '../data/opensource.js'
import { components, getComponent } from '../registry/index.jsx'
import { Stage } from './Preview.jsx'
import GlitchText from '../registry/components/glitch-text.tsx'
import FlickeringGrid from '../registry/components/flickering-grid.tsx'
import DotsLoader from '../registry/components/dots-loader.tsx'

const HOME = '/home/sushant/open-source'

const helpTopics = {
  projects: [
    ['ls', 'list every project'],
    ['ls -l', 'list projects with their status'],
    ['cd <project>', 'open a project and show its preview'],
    ['cd ..', 'go back and close the preview'],
    ['cat README.md', 'read about the project you are in'],
    ['tree', 'see everything at once'],
  ],
  navigation: [
    ['open lab', 'go to the component Lab'],
    ['open home', 'go to the home page'],
    ['pwd', 'where am I?'],
    ['history', 'commands you have typed'],
    ['clear', 'clean the screen'],
    ['exit', 'back to the normal page'],
  ],
  contact: [
    ['contact', 'all the ways to reach Sushant'],
    ['email', 'just the email'],
    ['whatsapp', 'just WhatsApp (messages only)'],
  ],
  fun: [
    ['whoami', 'who is this guy?'],
    ['excuse', 'the official excuse of the moment'],
    ['chai', 'fuel up'],
    ['sudo <anything>', 'try it'],
    ['date', 'what time is it?'],
    ['echo <text>', 'say something'],
  ],
}
const topicNames = Object.keys(helpTopics)
const commandNames = ['help', 'ls', 'cd', 'cat', 'tree', 'open', 'pwd', 'history', 'clear', 'exit', 'contact', 'email', 'whatsapp', 'whoami', 'excuse', 'chai', 'sudo', 'date', 'echo']

const intro = [
  { kind: 'accent', text: 'CONEIZ OS 1.0 · open-source terminal' },
  { kind: 'muted', text: 'Everything here is “coming soon™”, but you can still look around.' },
  { kind: 'out', text: 'Type help to get started, or try ls and cd the-lab.' },
  { kind: 'blank' },
]

function Table({ rows }) {
  return (
    <div className="grid grid-cols-[minmax(9rem,auto)_1fr] gap-x-6 gap-y-0.5">
      {rows.map(([cmd, info]) => (
        <div key={cmd} className="contents">
          <span className="text-accent">{cmd}</span>
          <span className="text-zinc-500">{info}</span>
        </div>
      ))}
    </div>
  )
}

function BusyPreview({ project }) {
  const [excuse] = useState(() => excuses[Math.floor(Math.random() * excuses.length)])
  return (
    <div className="relative flex size-full flex-col items-center justify-center gap-4 overflow-hidden px-6 text-center">
      <FlickeringGrid maxOpacity={0.15} color="#f43f5e" />
      <p className="relative text-[clamp(2.2rem,7vw,5rem)] font-black leading-none tracking-tighter text-white">
        <GlitchText text="BUSY RIGHT NOW" speed={2} />
      </p>
      <p className="relative max-w-lg font-sans text-sm text-zinc-400">
        <span className="font-mono text-zinc-200">{project.name}/</span> is an empty folder with a
        .gitkeep and big dreams. {project.description}
      </p>
      <p className="relative max-w-lg font-sans text-sm italic text-zinc-500">Excuse: “{excuse}”</p>
      <DotsLoader className="relative" color="#f43f5e" size={10} />
    </div>
  )
}

function LabPreview() {
  const picks = ['blur-switch', 'glass-card', 'flow-field'].map(getComponent)
  return (
    <div className="flex size-full flex-col gap-3 p-4 font-sans">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
        {picks.map((item) => (
          <Link
            key={item.slug}
            to={`/lab/${item.slug}`}
            className="relative min-h-0 overflow-hidden rounded-xl border border-white/10"
          >
            <div className="pointer-events-none size-full">
              <Stage item={item} preview />
            </div>
            <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-[11px] text-zinc-300">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      <p className="text-xs text-zinc-500">
        {components.length} components ·{' '}
        <Link to="/lab" className="text-accent hover:underline">
          open the full Lab →
        </Link>
      </p>
    </div>
  )
}

function SitePreview() {
  // The real home page, shrunk down inside a frame
  return (
    <div className="relative size-full overflow-hidden">
      <iframe
        title="Portfolio preview"
        src="/"
        className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0"
      />
      <Link
        to="/"
        className="absolute bottom-3 right-3 rounded-full bg-accent px-3 py-1 font-sans text-xs font-semibold text-zinc-950"
      >
        Visit →
      </Link>
    </div>
  )
}

export default function OssTerminal({ onExit }) {
  const navigate = useNavigate()
  const [lines, setLines] = useState(intro)
  const [input, setInput] = useState('')
  const [cwd, setCwd] = useState(null)
  const [askingHelp, setAskingHelp] = useState(false)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  const project = ossProjects.find((p) => p.name === cwd)
  const path = cwd ? `~/open-source/${cwd}` : '~/open-source'

  // Stay pinned to the newest line, also while the preview panel resizes the terminal
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const pin = () => el.scrollTo({ top: el.scrollHeight })
    pin()
    const observer = new ResizeObserver(pin)
    observer.observe(el)
    return () => observer.disconnect()
  }, [lines])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const print = (...entries) => setLines((prev) => [...prev, ...entries])
  const out = (text, kind = 'out') => ({ kind, text })

  const showTopic = (topic) => {
    print(out(`help › ${topic}`, 'accent'), { kind: 'node', node: <Table rows={helpTopics[topic]} /> }, { kind: 'blank' })
  }

  const listProjects = (long) => {
    if (cwd) {
      return print(
        out(project.preview ? 'README.md   src/   package.json' : 'README.md   .gitkeep', 'out'),
      )
    }
    if (long) {
      return print({
        kind: 'node',
        node: (
          <div className="grid grid-cols-[auto_auto_1fr] gap-x-6">
            {ossProjects.map((p) => (
              <div key={p.name} className="contents">
                <span className="text-zinc-500">drwxr-xr-x</span>
                <span className={p.status === 'live' ? 'text-accent' : 'text-amber-400'}>
                  {p.status === 'live' ? 'live' : 'busy'}
                </span>
                <span className="text-sky-400">{p.name}/</span>
              </div>
            ))}
          </div>
        ),
      })
    }
    print({
      kind: 'node',
      node: (
        <div className="flex flex-wrap gap-x-6">
          {ossProjects.map((p) => (
            <span key={p.name} className="text-sky-400">
              {p.name}/
            </span>
          ))}
          <span className="text-zinc-300">about.txt</span>
        </div>
      ),
    })
  }

  const run = (raw) => {
    const line = raw.trim()
    print({ kind: 'in', text: line, path: askingHelp ? null : path })
    if (!line) return

    // Answering the "what do you need help with?" question
    if (askingHelp) {
      setAskingHelp(false)
      const answer = line.toLowerCase()
      const topic = topicNames[Number(answer) - 1] || topicNames.find((t) => t.startsWith(answer))
      if (answer === 'q') return print(out('Okay, no help then. You got this.', 'muted'))
      if (!topic) return print(out(`No help topic called “${line}”. Type help to try again.`, 'err'))
      return showTopic(topic)
    }

    const [cmd, ...args] = line.split(/\s+/)
    const arg = args.join(' ')

    switch (cmd.toLowerCase()) {
      case 'help': {
        const topic = topicNames.find((t) => arg && t.startsWith(arg.toLowerCase()))
        if (topic) return showTopic(topic)
        setAskingHelp(true)
        return print(
          out('What do you need help with?', 'accent'),
          {
            kind: 'node',
            node: (
              <Table
                rows={[
                  ['1  projects', 'view and preview projects'],
                  ['2  navigation', 'move around the site'],
                  ['3  contact', 'reach Sushant'],
                  ['4  fun', 'things you probably should not type'],
                ]}
              />
            ),
          },
          out('Type a number or a name (q to cancel).', 'muted'),
        )
      }
      case 'ls':
      case 'dir':
        return listProjects(args.some((a) => a.includes('l')))
      case 'tree':
        return print({
          kind: 'node',
          node: (
            <div>
              <p className="text-sky-400">open-source/</p>
              {ossProjects.map((p, i) => (
                <p key={p.name}>
                  <span className="text-zinc-600">{i === ossProjects.length - 1 ? '└── ' : '├── '}</span>
                  <span className="text-sky-400">{p.name}/</span>
                  <span className="text-zinc-600">  {p.status === 'live' ? '' : '(empty, busy)'}</span>
                </p>
              ))}
            </div>
          ),
        })
      case 'cd': {
        if (!arg || arg === '~' || arg === '..' || arg === '/') {
          setCwd(null)
          return
        }
        const name = arg.replace(/\/$/, '')
        const target = ossProjects.find((p) => p.name === name)
        if (!target) return print(out(`cd: no such project: ${arg}. Try ls.`, 'err'))
        setCwd(target.name)
        return print(
          out(
            target.preview
              ? `Opening ${target.name}… preview is up top.`
              : `Opening ${target.name}… it is empty. Sushant is busy.`,
            target.preview ? 'accent' : 'warn',
          ),
        )
      }
      case 'cat':
        if (arg === 'about.txt' && !cwd) {
          return print(out(site.labNote))
        }
        if (/readme/i.test(arg) && project) return print(out(project.description))
        return print(out(`cat: ${arg || '(nothing)'}: no such file`, 'err'))
      case 'pwd':
        return print(out(cwd ? `${HOME}/${cwd}` : HOME))
      case 'whoami':
        return print(
          out(`${site.name}, ${site.companyRole.toLowerCase()} of ${site.company}.`),
          out('Frontend developer. Professional component remixer. Part-time chai enthusiast.', 'muted'),
        )
      case 'date':
        return print(out(new Date().toString()))
      case 'echo':
        return print(out(arg))
      case 'history':
        return print(...history.map((h, i) => out(`${String(i + 1).padStart(4)}  ${h}`, 'muted')))
      case 'clear':
        return setLines([])
      case 'open': {
        const routes = { lab: '/lab', home: '/', contact: '/#contact', work: '/#work' }
        if (!routes[arg]) return print(out(`open: try one of ${Object.keys(routes).join(', ')}`, 'err'))
        return navigate(routes[arg])
      }
      case 'contact':
        return print(
          { kind: 'node', node: <ContactLines /> },
        )
      case 'email':
        return print({ kind: 'node', node: <a href={`mailto:${site.email}`} className="text-accent underline">{site.email}</a> })
      case 'whatsapp':
        return print({
          kind: 'node',
          node: (
            <a href={site.whatsapp.link} target="_blank" rel="noreferrer" className="text-[#25d366] underline">
              {site.whatsapp.display} (messages only, no calls)
            </a>
          ),
        })
      case 'excuse':
        return print(out(`“${excuses[Math.floor(Math.random() * excuses.length)]}”`, 'warn'))
      case 'chai':
      case 'coffee':
        return print(out('Brewing… done. Productivity +2%. Open-sourcing progress +0%.', 'accent'))
      case 'sudo':
        return print(out(`${site.name.split(' ')[0].toLowerCase()} is not in the sudoers file. This incident will be reported to his mom.`, 'err'))
      case 'rm':
        return print(out('Permission denied. Also, rude.', 'err'))
      case 'exit':
      case 'ui':
        return onExit()
      default:
        return print(out(`command not found: ${cmd}. Type help.`, 'err'))
    }
  }

  // Tab completes commands, project names and help topics
  const complete = () => {
    const [cmd, ...rest] = input.split(' ')
    if (rest.length === 0) {
      const match = commandNames.filter((c) => c.startsWith(cmd))
      if (match.length === 1) setInput(`${match[0]} `)
      return
    }
    const partial = rest.join(' ')
    const pool = cmd === 'cd' ? ossProjects.map((p) => p.name) : cmd === 'help' ? topicNames : cmd === 'open' ? ['lab', 'home', 'contact', 'work'] : []
    const match = pool.filter((p) => p.startsWith(partial))
    if (match.length === 1) setInput(`${cmd} ${match[0]}`)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input)
      if (input.trim()) setHistory((h) => [...h, input.trim()])
      setHistoryIndex(-1)
      setInput('')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      complete()
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown' && historyIndex >= 0) {
      e.preventDefault()
      const next = historyIndex + 1
      setHistoryIndex(next >= history.length ? -1 : next)
      setInput(next >= history.length ? '' : history[next])
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  const color = {
    out: 'text-zinc-200',
    muted: 'text-zinc-500',
    accent: 'text-accent',
    err: 'text-rose-400',
    warn: 'text-amber-300',
  }

  return (
    <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-[#0b0b0c] font-mono text-[13px] leading-relaxed sm:text-sm">
      {/* Project preview slides in from the top when you cd into a project */}
      <div
        className="relative shrink-0 overflow-hidden border-b border-white/10 bg-zinc-950 transition-[height] duration-500 ease-[cubic-bezier(.65,0,.35,1)]"
        style={{ height: project ? '48%' : '0%' }}
      >
        {project && (
          <>
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-zinc-950/90 py-2 pl-4 pr-48 text-xs backdrop-blur">
              <span className="text-zinc-400">
                preview · <span className="text-sky-400">{project.name}/</span>{' '}
                <span className={project.preview ? 'text-accent' : 'text-amber-400'}>
                  {project.preview ? '● live' : '● busy'}
                </span>
              </span>
              <button onClick={() => setCwd(null)} className="text-zinc-500 hover:text-white">
                ✕ cd ..
              </button>
            </div>
            <div className="size-full pt-9">
              {project.preview === 'lab' && <LabPreview />}
              {project.preview === 'site' && <SitePreview />}
              {!project.preview && <BusyPreview key={project.name} project={project} />}
            </div>
          </>
        )}
      </div>

      {/* Terminal */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 pr-48 text-xs text-zinc-500">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate">sushant@coneiz: {path}</span>
        <span className="ml-auto hidden shrink-0 rounded-md border border-white/10 px-2 py-0.5 md:inline">
          tip: type <span className="text-accent">help</span>
        </span>
      </div>
      <div
        ref={scrollRef}
        onClick={() => window.getSelection()?.isCollapsed && inputRef.current?.focus()}
        className="scroll-thin min-h-0 flex-1 cursor-text overflow-y-auto px-4 py-3"
      >
        {lines.map((line, i) => {
          if (line.kind === 'blank') return <div key={i} className="h-3" />
          if (line.kind === 'node') return <div key={i} className="my-1">{line.node}</div>
          if (line.kind === 'in')
            return (
              <p key={i} className="text-zinc-100">
                {line.path ? (
                  <>
                    <span className="text-accent">sushant@coneiz</span>
                    <span className="text-zinc-500">:</span>
                    <span className="text-sky-400">{line.path}</span>
                    <span className="text-zinc-500">$ </span>
                  </>
                ) : (
                  <span className="text-amber-300">help? › </span>
                )}
                {line.text}
              </p>
            )
          return (
            <p key={i} className={`whitespace-pre-wrap ${color[line.kind]}`}>
              {line.text}
            </p>
          )
        })}
        <label className="flex items-center">
          {askingHelp ? (
            <span className="shrink-0 text-amber-300">help? › </span>
          ) : (
            <span className="shrink-0">
              <span className="text-accent">sushant@coneiz</span>
              <span className="text-zinc-500">:</span>
              <span className="text-sky-400">{path}</span>
              <span className="text-zinc-500">$ </span>
            </span>
          )}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
            className="min-w-0 flex-1 bg-transparent text-zinc-100 caret-accent outline-none"
          />
        </label>
      </div>
    </div>
  )
}

function ContactLines() {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-y-0.5">
      <span className="text-zinc-500">email</span>
      <a href={`mailto:${site.email}`} className="text-accent underline">
        {site.email}
      </a>
      <span className="text-zinc-500">whatsapp</span>
      <a href={site.whatsapp.link} target="_blank" rel="noreferrer" className="text-[#25d366] underline">
        {site.whatsapp.display} (messages only)
      </a>
    </div>
  )
}
