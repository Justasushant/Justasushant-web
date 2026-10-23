import { useEffect, useRef, useState } from 'react'

interface ChatMessage {
  /** 'them' shows on the left with a typing indicator first, 'me' on the right */
  from: 'me' | 'them'
  text: string
}

interface ChatLoopProps {
  messages: ChatMessage[]
  /** Name in the header */
  contact?: string
  status?: string
  /** How long "typing…" shows before their message, in ms */
  typingTime?: number
  /** Milliseconds to wait before the loop starts over */
  pause?: number
  accent?: string
  className?: string
}

export default function ChatLoop({
  messages,
  contact = 'Sushant',
  status = 'online',
  typingTime = 1100,
  pause = 3500,
  accent = '#c6f432',
  className = '',
}: ChatLoopProps) {
  // How many messages are visible, and whether the other side is "typing"
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const next = messages[shown]
    let delay: number
    let step: () => void

    if (!next) {
      delay = pause
      step = () => setShown(0)
    } else if (next.from === 'them' && !typing) {
      delay = 500
      step = () => setTyping(true)
    } else {
      delay = next.from === 'them' ? typingTime : 900
      step = () => {
        setTyping(false)
        setShown((n) => n + 1)
      }
    }

    const timeout = setTimeout(step, delay)
    return () => clearTimeout(timeout)
  }, [shown, typing, messages, typingTime, pause])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [shown, typing])

  return (
    <div
      className={`flex h-96 w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl ${className}`}
    >
      <style>{`
        @keyframes chat-loop-in { from { opacity: 0; transform: translateY(8px) scale(0.96) } }
        @keyframes chat-loop-dot { 0%, 60%, 100% { opacity: 0.3; transform: translateY(0) } 30% { opacity: 1; transform: translateY(-3px) } }
      `}</style>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div
          className="grid size-9 place-items-center rounded-full text-sm font-bold text-zinc-950"
          style={{ background: accent }}
        >
          {contact.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{contact}</p>
          <p className="text-xs text-zinc-500">{typing ? 'typing…' : status}</p>
        </div>
      </div>
      <div ref={scrollRef} className="flex flex-1 flex-col gap-2 overflow-y-auto p-4 [scrollbar-width:none]">
        {messages.slice(0, shown).map((m, i) => (
          <p
            key={i}
            className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
              m.from === 'me'
                ? 'self-end rounded-br-md text-zinc-950'
                : 'self-start rounded-bl-md bg-zinc-800 text-zinc-100'
            }`}
            style={{
              background: m.from === 'me' ? accent : undefined,
              animation: 'chat-loop-in 0.3s cubic-bezier(.2, .8, .2, 1)',
            }}
          >
            {m.text}
          </p>
        ))}
        {typing && (
          <span
            aria-label="typing"
            className="flex gap-1 self-start rounded-2xl rounded-bl-md bg-zinc-800 px-3.5 py-3"
            style={{ animation: 'chat-loop-in 0.3s ease-out' }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 rounded-full bg-zinc-300"
                style={{ animation: `chat-loop-dot 1s ease-in-out ${i * 0.15}s infinite` }}
              />
            ))}
          </span>
        )}
      </div>
    </div>
  )
}
