// Controls for the Lab's "Customize" panel, plus helpers that turn the live
// values back into JSX so the Usage tab always matches the preview.

export const num = (label, value, min, max, step = 1) => ({
  type: 'number',
  label,
  default: value,
  min,
  max,
  step,
})
export const color = (label, value) => ({ type: 'color', label, default: value })
export const colors = (label, value) => ({ type: 'colors', label, default: value })
export const select = (label, value, options) => ({ type: 'select', label, default: value, options })
export const bool = (label, value) => ({ type: 'boolean', label, default: value })
export const text = (label, value) => ({ type: 'text', label, default: value })
export const lines = (label, value) => ({ type: 'lines', label, default: value })

export const defaultsOf = (controls = {}) =>
  Object.fromEntries(Object.entries(controls).map(([key, control]) => [key, control.default]))

export const indent = (text, spaces) =>
  text
    .split('\n')
    .map((line) => (line ? ' '.repeat(spaces) + line : line))
    .join('\n')

// A JavaScript literal for a value; arrays of objects go one item per line
const literal = (value, depth = 0) => {
  if (typeof value === 'string') return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  if (Array.isArray(value)) {
    if (value.some((v) => v && typeof v === 'object')) {
      const pad = '  '.repeat(depth + 1)
      return `[\n${value.map((v) => pad + literal(v, depth + 1)).join(',\n')},\n${'  '.repeat(depth)}]`
    }
    return `[${value.map((v) => literal(v, depth)).join(', ')}]`
  }
  if (value && typeof value === 'object') {
    const fields = Object.entries(value).filter(([, v]) => v !== undefined && v !== '')
    return `{ ${fields.map(([k, v]) => `${k}: ${literal(v, depth)}`).join(', ')} }`
  }
  return String(value)
}

const attribute = (key, value, depth) => {
  if (value === true) return key
  if (typeof value === 'string' && !/["\n{}]/.test(value)) return `${key}="${value}"`
  return `${key}={${literal(value, depth)}}`
}

// jsx('MagneticButton', { strength: 0.5 }, 'Hover me')
//   -> <MagneticButton strength={0.5}>Hover me</MagneticButton>
export function jsx(name, props = {}, children) {
  const entries = Object.entries(props).filter(([, v]) => v !== undefined && v !== null && v !== '')
  const inline = entries.map(([k, v]) => ' ' + attribute(k, v, 0)).join('')
  const multiline = inline.includes('\n') || name.length + inline.length > 72
  const open = multiline
    ? `<${name}\n${entries.map(([k, v]) => '  ' + attribute(k, v, 1)).join('\n')}\n`
    : `<${name}${inline}`

  if (children === undefined || children === null || children === '') {
    return multiline ? `${open}/>` : `${open} />`
  }
  const child = String(children)
  if (!multiline && !child.includes('\n') && open.length + child.length + name.length < 90) {
    return `${open}>${child}</${name}>`
  }
  return `${open}>\n${indent(child, 2)}\n</${name}>`
}
