interface TextLoaderProps {
  text?: string
  color?: string
  className?: string
}

export default function TextLoader({
  text = 'Loading',
  color = '#c6f432',
  className = '',
}: TextLoaderProps) {
  return (
    <div
      role="status"
      aria-label={text}
      className={`flex font-mono text-lg font-semibold uppercase tracking-[0.3em] ${className}`}
    >
      <style>{`@keyframes text-loader-letter { 0%, 100% { opacity: 0.25; transform: translateY(0) } 30% { opacity: 1; transform: translateY(-4px) } }`}</style>
      {[...text, '.', '.', '.'].map((char, i) => (
        <span
          key={i}
          aria-hidden
          style={{ color, animation: `text-loader-letter 1.6s ease-in-out ${i * 0.08}s infinite` }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}
