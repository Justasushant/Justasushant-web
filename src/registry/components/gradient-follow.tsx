import { useEffect, useRef } from 'react'

interface GradientFollowProps {
  colors?: [string, string, string]
  /** Blob size as a share of the container's larger side */
  size?: number
  className?: string
}

// How eagerly each blob chases the cursor: the first is quick, the last is lazy
const EASE = [0.09, 0.05, 0.025]

export default function GradientFollow({
  colors = ['#c6f432', '#22d3ee', '#a855f7'],
  size = 0.45,
  className = '',
}: GradientFollowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    const target = { x: 0, y: 0, active: false }
    const blobs = EASE.map(() => ({ x: parent.clientWidth / 2, y: parent.clientHeight / 2 }))
    let frame = 0

    const tick = (now: number) => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      const blobSize = Math.max(w, h) * size

      const t = now / 1000

      blobs.forEach((b, i) => {
        // With no cursor around, each blob drifts on its own slow loop
        const phase = i * 2.1
        const tx = target.active ? target.x : w / 2 + Math.cos(t * 0.5 + phase) * w * 0.28
        const ty = target.active ? target.y : h / 2 + Math.sin(t * 0.7 + phase) * h * 0.28
        b.x += (tx - b.x) * EASE[i]
        b.y += (ty - b.y) * EASE[i]
        const node = blobRefs.current[i]
        if (!node) return
        node.style.width = `${blobSize}px`
        node.style.height = `${blobSize}px`
        node.style.transform = `translate(${b.x - blobSize / 2}px, ${b.y - blobSize / 2}px)`
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target.x = e.clientX - r.left
      target.y = e.clientY - r.top
      target.active = true
    }
    const onLeave = () => {
      target.active = false
    }
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [size])

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {colors.map((color, i) => (
        <div
          key={i}
          ref={(node) => {
            blobRefs.current[i] = node
          }}
          className="absolute left-0 top-0 rounded-full mix-blend-screen will-change-transform"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
            filter: 'blur(40px)',
            opacity: 0.75,
          }}
        />
      ))}
    </div>
  )
}
