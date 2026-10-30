import { useEffect, useState } from 'react'

interface SplitFlapProps {
  /** Words to cycle through */
  words?: string[]
  /** How long each word stays, in ms */
  interval?: number
  /** Colour of the letters */
  color?: string
  /** Colour of the flaps */
  flapColor?: string
  className?: string
}

const CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-!?'
const STEP_MS = 55

// One letter tile that clacks through the alphabet until it reaches its target
function Flap({ target, color, flapColor }: { target: string; color: string; flapColor: string }) {
  const [shown, setShown] = useState(' ')
  const [prev, setPrev] = useState(' ')
  const [flip, setFlip] = useState(0)

  useEffect(() => {
    if (shown === target) return
    const id = setTimeout(() => {
      const i = CHARS.indexOf(shown)
      setPrev(shown)
      setShown(CHARS[(i + 1) % CHARS.length])
      setFlip((n) => n + 1)
    }, STEP_MS)
    return () => clearTimeout(id)
  }, [shown, target])

  const half = (char: string, top: boolean, extra = '', style = {}) => (
    <span
      className={`absolute inset-x-0 overflow-hidden ${top ? 'top-0 rounded-t-md' : 'bottom-0 rounded-b-md'} ${extra}`}
      style={{ height: '50%', background: flapColor, ...style }}
    >
      <span
        className="absolute inset-x-0 grid h-[200%] place-items-center"
        style={{ top: top ? 0 : '-100%', color }}
      >
        {char}
      </span>
    </span>
  )

  return (
    <span
      className="relative inline-block h-[1.5em] w-[1.05em] shadow-[0_4px_10px_rgba(0,0,0,0.5)] [perspective:300px]"
      aria-hidden
    >
      {half(shown, true)}
      {half(prev, false)}
      {/* The falling flap: old top half folds down, then the new bottom half lands */}
      <span key={flip} className="absolute inset-0 [transform-style:preserve-3d]">
        {half(prev, true, 'origin-bottom brightness-90', { animation: `split-flap-top ${STEP_MS}ms ease-in forwards` })}
        {half(shown, false, 'origin-top', { animation: `split-flap-bottom ${STEP_MS}ms ease-out forwards` })}
      </span>
      {/* The hinge line across the middle */}
      <span className="absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-black/60" />
    </span>
  )
}

// An airport departures board: every letter clacks through the alphabet to
// spell the next word
export default function SplitFlap({
  words = ['DEPARTING', 'ON TIME', 'BOARDING', 'GATE 42'],
  interval = 3500,
  color = '#fde68a',
  flapColor = '#18181b',
  className = '',
}: SplitFlapProps) {
  const [index, setIndex] = useState(0)
  const length = Math.max(...words.map((w) => w.length))
  const word = (words[index % words.length] || '').toUpperCase().padEnd(length, ' ')

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => i + 1), interval)
    return () => clearInterval(id)
  }, [interval])

  return (
    <div
      role="status"
      aria-label={word.trim()}
      className={`inline-flex gap-1 rounded-xl bg-black p-2 font-mono font-bold ${className}`}
    >
      <style>{`
        @keyframes split-flap-top { from { transform: rotateX(0) } to { transform: rotateX(-90deg) } }
        @keyframes split-flap-bottom { 0%, 50% { transform: rotateX(90deg) } 100% { transform: rotateX(0) } }
      `}</style>
      {word.split('').map((char, i) => (
        <Flap key={i} target={CHARS.includes(char) ? char : ' '} color={color} flapColor={flapColor} />
      ))}
    </div>
  )
}
