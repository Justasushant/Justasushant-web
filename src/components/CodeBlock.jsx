import { Highlight, themes } from 'prism-react-renderer'

export default function CodeBlock({ code, language = 'tsx' }) {
  return (
    <Highlight code={code.trimEnd()} language={language} theme={themes.oneDark}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="min-w-max py-4 font-mono text-[13px] leading-6">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="flex px-4">
              <span className="w-10 shrink-0 select-none pr-4 text-right text-zinc-600">{i + 1}</span>
              <span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
