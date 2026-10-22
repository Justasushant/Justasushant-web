interface Person {
  name: string
  /** Image URL. Without one, initials on a gradient are shown */
  src?: string
  color?: string
}

interface AvatarStackProps {
  people: Person[]
  /** How many avatars to show before the "+N" bubble */
  max?: number
  /** Avatar size in px */
  size?: number
  className?: string
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export default function AvatarStack({ people, max = 5, size = 44, className = '' }: AvatarStackProps) {
  const visible = people.slice(0, max)
  const extra = people.length - visible.length

  return (
    <div className={`group flex items-center ${className}`}>
      {visible.map((person, i) => (
        <div
          key={person.name}
          className="relative -ml-3 transition-all duration-300 ease-out first:ml-0 group-hover:-ml-1 hover:z-10 hover:-translate-y-1.5"
          style={{ zIndex: visible.length - i }}
        >
          <div
            className="grid place-items-center overflow-hidden rounded-full border-2 border-zinc-950 text-xs font-semibold text-zinc-950"
            style={{
              width: size,
              height: size,
              background: person.src
                ? `url(${person.src}) center / cover`
                : `linear-gradient(135deg, ${person.color ?? '#c6f432'}, #ffffff)`,
            }}
          >
            {!person.src && initials(person.name)}
          </div>
          {/* Name tag on hover */}
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-90 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-[11px] text-white opacity-0 transition-all [div:hover>&]:scale-100 [div:hover>&]:opacity-100">
            {person.name}
          </span>
        </div>
      ))}
      {extra > 0 && (
        <div
          className="relative -ml-3 grid place-items-center rounded-full border-2 border-zinc-950 bg-zinc-800 text-xs font-semibold text-white transition-all duration-300 group-hover:-ml-1"
          style={{ width: size, height: size }}
        >
          +{extra}
        </div>
      )}
    </div>
  )
}
