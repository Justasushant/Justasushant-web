import { useEffect, useRef, useState } from 'react'
import { defaultsOf } from '../registry/controls.js'

// The dark "stage" every Lab component is shown on.
// `preview` is true in small cards, where some demos switch to a lighter mode.
// `props` are the live values from the Customize panel (defaults when omitted).
export function Stage({ item, preview = false, props, className = '' }) {
  const Demo = item.demo
  const values = props ?? defaultsOf(item.controls)
  return (
    <div
      className={`ink-stage relative flex size-full items-center justify-center overflow-hidden bg-zinc-950 text-zinc-100 ${className}`}
      style={
        item.fill
          ? undefined
          : {
              backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.06) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }
      }
    >
      <Demo preview={preview} props={values} />
    </div>
  )
}

// Only mounts its children while near the viewport, so dozens of live
// previews (some with canvas animations) don't all run at once.
export function LazyMount({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '200px',
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  )
}
