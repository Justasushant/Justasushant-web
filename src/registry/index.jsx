// The Lab's catalogue: every component, its live demo and its usage snippet.
// To add a component: create src/registry/components/<slug>.tsx,
// then add an entry to the matching file in src/registry/catalog/.

import transitions from './catalog/transitions.jsx'
import buttons from './catalog/buttons.jsx'
import backgrounds from './catalog/backgrounds.jsx'
import text from './catalog/text.jsx'
import cards from './catalog/cards.jsx'
import elements from './catalog/elements.jsx'
import loaders from './catalog/loaders.jsx'
import footers from './catalog/footers.jsx'
// Templates are built (see ./catalog/templates.jsx) but not published yet
import heroes from './catalog/heroes.jsx'
import { defaultsOf, indent } from './controls.js'

// Categories A→Z, and components A→Z inside each category
export const components = [
  ...backgrounds,
  ...buttons,
  ...cards,
  ...elements,
  ...footers,
  ...heroes,
  ...loaders,
  ...text,
  ...transitions,
].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))

export const categories = [...new Set(components.map((c) => c.category))]

// Categories announced but still empty, shown with a "coming soon" state
export const comingSoon = ['Templates']
export const allCategories = [...categories, ...comingSoon].sort()

// slug -> PascalCase component name, e.g. "shimmer-button" -> "ShimmerButton"
export const componentName = (slug) => slug.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())

export const getComponent = (slug) => components.find((c) => c.slug === slug)

// Exact source of each component, loaded on demand (see scripts/source-plugin.js)
const tsxSources = import.meta.glob('./components/*.tsx', { query: '?tsx-src', import: 'default' })
const jsxSources = import.meta.glob('./components/*.tsx', { query: '?jsx-src', import: 'default' })

export const loadSource = (slug, lang) =>
  (lang === 'tsx' ? tsxSources : jsxSources)[`./components/${slug}.tsx`]()

// The Usage tab: an import plus an example built from the current prop values
export const usageSnippet = (item, values = defaultsOf(item.controls)) => {
  const usage = typeof item.usage === 'function' ? item.usage(values) : item.usage
  const importLine =
    item.importLine ?? `import ${componentName(item.slug)} from '@/components/ui/${item.slug}'`
  return `${importLine}\n\nexport default function Example() {\n  return (\n${indent(usage, 4)}\n  )\n}\n`
}
