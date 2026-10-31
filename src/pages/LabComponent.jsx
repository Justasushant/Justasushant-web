import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import Nav from '../components/Nav.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ControlsPanel from '../components/ControlsPanel.jsx'
import LabSidebar from '../components/LabSidebar.jsx'
import { Stage } from '../components/Preview.jsx'
import Badge from '../components/Badge.jsx'
import { components, getComponent, loadSource, usageSnippet } from '../registry/index.jsx'
import { defaultsOf } from '../registry/controls.js'
import { inspirationFor, inspirationNote } from '../data/inspirations.js'

const sourceCache = new Map()

function readPref(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

function writePref(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {}
}

export default function LabComponent() {
  const { slug } = useParams()
  const item = getComponent(slug)

  // Preferences that should survive switching between components
  const [lang, setLang] = useState(() => readPref('lab-lang', 'tsx'))
  const [tab, setTab] = useState('usage')
  const [codeHeight, setCodeHeight] = useState(() =>
    Math.round(Math.max(220, window.innerHeight * 0.36)),
  )

  if (!item) return <Navigate to="/lab" replace />

  const changeLang = (value) => {
    setLang(value)
    writePref('lab-lang', value)
  }

  return (
    <ComponentView
      key={item.slug}
      item={item}
      lang={lang}
      setLang={changeLang}
      tab={tab}
      setTab={setTab}
      codeHeight={codeHeight}
      setCodeHeight={setCodeHeight}
    />
  )
}

function ComponentView({ item, lang, setLang, tab, setTab, codeHeight, setCodeHeight }) {
  const [source, setSource] = useState(() => sourceCache.get(`${item.slug}.${lang}`) ?? '')
  const [copied, setCopied] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [replay, setReplay] = useState(0)
  const [drawer, setDrawer] = useState(false)
  const drag = useRef(null)

  // Live prop values from the Customize panel
  const defaults = useMemo(() => defaultsOf(item.controls), [item])
  const [values, setValues] = useState(defaults)
  const [showControls, setShowControls] = useState(true)
  const hasControls = Object.keys(item.controls ?? {}).length > 0
  const changed = JSON.stringify(values) !== JSON.stringify(defaults)

  const changeValue = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }))
    // Show the code that matches what you just changed
    setTab('usage')
  }

  const index = components.indexOf(item)
  const prev = components[(index - 1 + components.length) % components.length]
  const next = components[(index + 1) % components.length]

  useEffect(() => {
    const key = `${item.slug}.${lang}`
    if (sourceCache.has(key)) return setSource(sourceCache.get(key))
    let cancelled = false
    loadSource(item.slug, lang).then((code) => {
      sourceCache.set(key, code)
      if (!cancelled) setSource(code)
    })
    return () => {
      cancelled = true
    }
  }, [item.slug, lang])

  useEffect(() => {
    if (!fullscreen) return
    const onKey = (e) => e.key === 'Escape' && setFullscreen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullscreen])

  const code = tab === 'usage' ? usageSnippet(item, values) : source
  const fileName = tab === 'usage' ? `example.${lang}` : `components/ui/${item.slug}.${lang}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Drag the bar between code and preview to resize them
  const startDrag = (e) => {
    drag.current = { y: e.clientY, h: codeHeight }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onDrag = (e) => {
    if (!drag.current) return
    const max = window.innerHeight - 300
    setCodeHeight(Math.min(max, Math.max(120, drag.current.h + e.clientY - drag.current.y)))
  }
  const endDrag = () => {
    drag.current = null
  }

  const segment = (active) =>
    `rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
      active ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-200'
    }`

  return (
    <div className="flex min-h-dvh flex-col pt-16 lg:h-dvh lg:overflow-hidden">
      <Nav solid />

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside className="scroll-thin hidden w-60 shrink-0 overflow-y-auto border-r border-white/10 px-3 py-6 lg:block">
          <LabSidebar />
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          {/* Title bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                to="/lab"
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 py-1.5 pl-2 pr-3 text-xs font-medium text-zinc-300 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
              >
                <span className="transition-transform group-hover:-translate-x-0.5">←</span>
                Back
              </Link>
              <div className="min-w-0">
                <p className="font-mono text-[11px] text-zinc-500">
                  <Link to="/lab" className="hover:text-white">
                    Lab
                  </Link>{' '}
                  / {item.category}
                </p>
                <h1 className="mt-0.5 truncate font-display text-lg uppercase tracking-tight">
                  {item.name}
                  <Badge slug={item.slug} className="ml-2 align-middle" />
                  <span className="ml-3 hidden text-sm font-normal text-zinc-400 md:inline">
                    {item.description}
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setDrawer(true)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5 lg:hidden"
              >
                All components
              </button>
              <Link
                to={`/lab/${prev.slug}`}
                title={`Previous: ${prev.name}`}
                className="grid size-8 place-items-center rounded-lg border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                ←
              </Link>
              <Link
                to={`/lab/${next.slug}`}
                title={`Next: ${next.name}`}
                className="grid size-8 place-items-center rounded-lg border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                →
              </Link>
            </div>
          </div>

          {/* Credit for where the look came from */}
          <p className="border-b-2 border-ink px-4 py-2 text-sm text-zinc-400 sm:px-5">
            {inspirationFor(item.slug).url ? (
              <>
                Inspired by{' '}
                <a
                  href={inspirationFor(item.slug).url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline underline-offset-2"
                >
                  {inspirationFor(item.slug).name}
                </a>
                . {inspirationNote}
              </>
            ) : (
              <>{inspirationFor(item.slug).name}. Built with AI.</>
            )}
          </p>

          {/* Code panel */}
          <section
            className="ink-stage flex max-h-[60vh] min-h-0 flex-col bg-[#1e2127] text-zinc-100 lg:h-[var(--code-h)] lg:max-h-none"
            style={{ '--code-h': `${codeHeight}px` }}
          >
            <div className="flex flex-wrap items-center gap-2 border-b border-white/5 px-3 py-2">
              <div className="flex rounded-lg bg-black/30 p-0.5">
                <button onClick={() => setTab('usage')} className={segment(tab === 'usage')}>
                  Usage
                </button>
                <button onClick={() => setTab('code')} className={segment(tab === 'code')}>
                  Code
                </button>
              </div>
              <div className="flex rounded-lg bg-black/30 p-0.5">
                <button onClick={() => setLang('tsx')} className={segment(lang === 'tsx')}>
                  TSX
                </button>
                <button onClick={() => setLang('jsx')} className={segment(lang === 'jsx')}>
                  JSX
                </button>
              </div>
              <span className="hidden truncate font-mono text-xs text-zinc-500 sm:inline">
                {fileName}
              </span>
              <button
                onClick={copy}
                className="ml-auto rounded-lg border border-white/10 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/5"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            {tab === 'code' && (
              <p className="border-b border-white/5 px-4 py-2 text-xs text-zinc-400">
                Paste into <code className="text-accent">{fileName}</code>. Needs React and Tailwind
                CSS v4. No other dependencies.
              </p>
            )}
            <div className="scroll-thin min-h-0 flex-1 overflow-auto">
              {code ? (
                <CodeBlock code={code} language={lang} />
              ) : (
                <p className="p-4 font-mono text-xs text-zinc-500">Loading source…</p>
              )}
            </div>
          </section>

          {/* Resize handle */}
          <div
            role="separator"
            aria-orientation="horizontal"
            aria-label="Resize code panel"
            onPointerDown={startDrag}
            onPointerMove={onDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="group hidden h-2.5 shrink-0 cursor-row-resize items-center justify-center border-y border-white/10 bg-zinc-900 lg:flex"
          >
            <span className="h-0.5 w-10 rounded-full bg-zinc-600 transition-colors group-hover:bg-accent" />
          </div>

          {/* Preview, with the Customize panel on its right */}
          <div className="flex min-h-0 flex-col lg:flex-1 lg:flex-row">
            <section
              className={
                fullscreen
                  ? 'fixed inset-0 z-[70] bg-zinc-950'
                  : 'relative h-[70vh] min-h-0 lg:h-auto lg:min-w-0 lg:flex-1'
              }
            >
              {/* Remount on every change so props that only apply on mount update too */}
              <Stage key={`${replay}-${JSON.stringify(values)}`} item={item} props={values} />
              <div className="absolute right-3 top-3 z-20 flex gap-1.5">
                <button
                  onClick={() => setReplay((n) => n + 1)}
                  className="rounded-lg border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300 backdrop-blur hover:text-white"
                >
                  ↻ Replay
                </button>
                {hasControls && !fullscreen && (
                  <button
                    onClick={() => setShowControls(!showControls)}
                    className={`rounded-lg border px-3 py-1.5 text-xs backdrop-blur ${
                      showControls
                        ? 'border-accent/40 bg-accent/10 text-accent'
                        : 'border-white/10 bg-zinc-900/80 text-zinc-300 hover:text-white'
                    }`}
                  >
                    Customize
                  </button>
                )}
                {item.fullPage && (
                  <Link
                    to={item.fullPage}
                    className="rounded-lg border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300 backdrop-blur hover:text-white"
                  >
                    Open full page ↗
                  </Link>
                )}
                <button
                  onClick={() => setFullscreen(!fullscreen)}
                  className="rounded-lg border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300 backdrop-blur hover:text-white"
                >
                  {fullscreen ? '✕ Exit (Esc)' : '⤢ Fullscreen'}
                </button>
              </div>
            </section>
            {hasControls && showControls && !fullscreen && (
              <aside className="border-t border-white/10 bg-zinc-950 lg:w-72 lg:shrink-0 lg:border-l lg:border-t-0">
                <ControlsPanel
                  controls={item.controls}
                  values={values}
                  changed={changed}
                  onChange={changeValue}
                  onReset={() => setValues(defaults)}
                />
              </aside>
            )}
          </div>
        </main>
      </div>

      {/* Mobile component list */}
      {drawer && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            aria-label="Close"
            onClick={() => setDrawer(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="scroll-thin absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto border-r border-white/10 bg-zinc-950 px-3 py-6">
            <LabSidebar onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
