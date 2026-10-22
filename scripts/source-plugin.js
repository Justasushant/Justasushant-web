// Vite plugin: lets the Lab show the exact source of every component in TSX and JSX.
//
//   import code from './shimmer-button.tsx?tsx-src'  -> formatted TSX source (string)
//   import code from './shimmer-button.tsx?jsx-src'  -> same file with types stripped (string)
//
// The .tsx file is the single source of truth, so both versions never drift apart.
import { readFile } from 'node:fs/promises'
import ts from 'typescript'
import prettier from 'prettier'

const PRETTIER = { semi: false, singleQuote: true, printWidth: 100 }
const BLANK = '//__BLANK__'

export async function toTsx(source) {
  return prettier.format(source, { ...PRETTIER, parser: 'typescript' })
}

export async function toJsx(source) {
  // The TypeScript emitter drops blank lines, so mark them first and restore them afterwards.
  const marked = source.replace(/\n[ \t]*\n/g, `\n${BLANK}\n`)
  const { outputText } = ts.transpileModule(marked, {
    fileName: 'component.tsx',
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
    },
  })
  const formatted = await prettier.format(outputText, { ...PRETTIER, parser: 'babel' })
  return formatted
    .split('\n')
    .map((line) => (line.trim() === BLANK ? '' : line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
}

export default function sourcePlugin() {
  return {
    name: 'component-source',
    enforce: 'pre',
    async load(id) {
      const match = id.match(/^(.*\.tsx)\?(tsx|jsx)-src$/)
      if (!match) return null
      const [, file, lang] = match
      this.addWatchFile(file)
      const source = await readFile(file, 'utf8')
      const code = lang === 'tsx' ? await toTsx(source) : await toJsx(source)
      return { code: `export default ${JSON.stringify(code)}`, map: null }
    },
  }
}
