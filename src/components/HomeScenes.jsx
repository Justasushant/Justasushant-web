import { useNavigate } from 'react-router'
import ClosingScene from '../registry/components/closing-scene.tsx'

// The last screen before the footer
export function ClosingSection() {
  const navigate = useNavigate()
  return (
    <div className="ink-stage">
      <ClosingScene lead="Skip the setup," emphasis="start building." buttonLabel="Open the Lab" buttonHref="/lab" onLink={navigate} />
    </div>
  )
}
