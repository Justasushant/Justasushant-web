import { useEffect, useState } from 'react'

interface MusicCardProps {
  title: string
  artist: string
  /** Any CSS background for the album art */
  cover?: string
  /** Track length in seconds */
  length?: number
  className?: string
}

const format = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

export default function MusicCard({
  title,
  artist,
  cover = 'conic-gradient(from 200deg, #c6f432, #22d3ee, #a855f7, #f472b6, #c6f432)',
  length = 214,
  className = '',
}: MusicCardProps) {
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(48)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setTime((t) => (t + 1) % length), 1000)
    return () => clearInterval(id)
  }, [playing, length])

  return (
    <div
      className={`w-72 rounded-3xl border border-white/10 bg-zinc-900/80 p-4 shadow-2xl backdrop-blur ${className}`}
    >
      <style>{`
        @keyframes music-card-spin { to { transform: rotate(360deg) } }
        @keyframes music-card-eq { 0%, 100% { transform: scaleY(0.3) } 50% { transform: scaleY(1) } }
      `}</style>
      <div className="flex items-center gap-4">
        {/* Album art spins like a record while playing */}
        <div
          className="relative size-16 shrink-0 rounded-full"
          style={{
            background: cover,
            animation: 'music-card-spin 4s linear infinite',
            animationPlayState: playing ? 'running' : 'paused',
          }}
        >
          <div className="absolute inset-[38%] rounded-full border-2 border-zinc-900 bg-zinc-950" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white">{title}</p>
          <p className="truncate text-sm text-zinc-400">{artist}</p>
        </div>
        <div className="flex h-6 items-end gap-0.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-1 origin-bottom rounded-full bg-[#c6f432]"
              style={{
                height: '100%',
                transform: 'scaleY(0.3)',
                animation: `music-card-eq ${0.6 + i * 0.15}s ease-in-out infinite`,
                animationPlayState: playing ? 'running' : 'paused',
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white transition-[width] duration-1000 ease-linear"
          style={{ width: `${(time / length) * 100}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[11px] text-zinc-500">
        <span>{format(time)}</span>
        <span>-{format(length - time)}</span>
      </div>
      <div className="mt-2 flex items-center justify-center gap-6 text-zinc-300">
        <button aria-label="Back 10 seconds" onClick={() => setTime((t) => Math.max(0, t - 10))} className="hover:text-white">
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>
        <button
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={() => setPlaying(!playing)}
          className="grid size-12 place-items-center rounded-full bg-white text-zinc-950 transition-transform hover:scale-105 active:scale-95"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor">
              <path d="M7 4v16l13-8z" />
            </svg>
          )}
        </button>
        <button aria-label="Forward 10 seconds" onClick={() => setTime((t) => Math.min(length - 1, t + 10))} className="hover:text-white">
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
            <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
