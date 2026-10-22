import { Fragment } from 'react'

interface MarqueeTextProps {
  items: string[]
  /** Seconds for one full loop */
  speed?: number
  reverse?: boolean
  outlineColor?: string
  separator?: string
  className?: string
}

export default function MarqueeText({
  items,
  speed = 20,
  reverse = false,
  outlineColor = '#fafafa',
  separator = '✦',
  className = '',
}: MarqueeTextProps) {
  // The row is rendered twice so the loop is seamless
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-8 pr-8"
      style={{
        animation: `marquee-text-scroll ${speed}s linear infinite`,
        animationDirection: reverse ? 'reverse' : 'normal',
      }}
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          <span
            style={
              i % 2 === 1 ? { color: 'transparent', WebkitTextStroke: `1px ${outlineColor}` } : undefined
            }
          >
            {item}
          </span>
          <span className="text-[#c6f432]">{separator}</span>
        </Fragment>
      ))}
    </div>
  )

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <style>{`@keyframes marquee-text-scroll { to { transform: translateX(-100%) } }`}</style>
      {row(false)}
      {row(true)}
    </div>
  )
}
