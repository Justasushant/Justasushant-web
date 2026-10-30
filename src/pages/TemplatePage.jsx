import { Link, Navigate, useParams } from 'react-router'
import { getComponent } from '../registry/index.jsx'

// A template on its own, full page, with a small bar to get back to its code
export default function TemplatePage() {
  const { slug } = useParams()
  const item = getComponent(slug)
  if (!item || item.category !== 'Templates') return <Navigate to="/lab?category=Templates" replace />
  const Template = item.page
  return (
    <div className="ink-stage relative min-h-dvh bg-[#f2efe6]">
      <Template />
      <Link
        to={`/lab/${item.slug}`}
        className="ink-btn fixed bottom-4 right-4 z-[60] text-xs"
      >
        ← Get the code
      </Link>
    </div>
  )
}
