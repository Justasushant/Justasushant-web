interface GlitchTextProps {
  text: string
  /** Seconds between glitch bursts */
  speed?: number
  className?: string
}

export default function GlitchText({ text, speed = 2.5, className = '' }: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes glitch-text-a {
          0% { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 1px) }
          4% { clip-path: inset(65% 0 10% 0); transform: translate(4px, -1px) }
          8% { clip-path: inset(40% 0 40% 0); transform: translate(-3px, 2px) }
          12% { clip-path: inset(80% 0 5% 0); transform: translate(3px, 0) }
          16%, 100% { clip-path: inset(50% 0 50% 0); transform: none }
        }
        @keyframes glitch-text-b {
          0% { clip-path: inset(70% 0 10% 0); transform: translate(4px, -1px) }
          4% { clip-path: inset(10% 0 75% 0); transform: translate(-4px, 1px) }
          8% { clip-path: inset(45% 0 30% 0); transform: translate(2px, -2px) }
          12% { clip-path: inset(5% 0 85% 0); transform: translate(-3px, 0) }
          16%, 100% { clip-path: inset(50% 0 50% 0); transform: none }
        }
      `}</style>
      {text}
      <span
        aria-hidden
        className="absolute inset-0 text-cyan-400 mix-blend-screen"
        style={{ animation: `glitch-text-a ${speed}s steps(1) infinite` }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-rose-500 mix-blend-screen"
        style={{ animation: `glitch-text-b ${speed}s steps(1) ${speed * 0.03}s infinite` }}
      >
        {text}
      </span>
    </span>
  )
}
