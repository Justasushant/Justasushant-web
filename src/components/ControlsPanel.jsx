// The Lab's "Customize" panel: one control per prop, plus a reset button

const labelClass = 'text-xs font-medium text-zinc-300'
const inputClass =
  'rounded-md border border-white/10 bg-zinc-900 px-2 py-1 text-xs text-zinc-100 outline-none transition-colors focus:border-accent/60'

const isHex = (value) => /^#[0-9a-f]{6}$/i.test(value)

function Swatch({ value, onChange, title }) {
  return (
    <label
      title={title}
      className="relative block size-8 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-white/15 shadow-inner"
      style={{ background: value }}
    >
      <input
        type="color"
        value={isHex(value) ? value : '#000000'}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </label>
  )
}

function NumberControl({ control, value, onChange }) {
  const { min, max, step } = control
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className={labelClass}>{control.label}</span>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const next = Number(e.target.value)
            if (!Number.isNaN(next)) onChange(next)
          }}
          className={`${inputClass} w-20 text-right font-mono`}
        />
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full cursor-pointer accent-[#c6f432]"
      />
    </div>
  )
}

function ColorControl({ control, value, onChange }) {
  return (
    <div>
      <span className={labelClass}>{control.label}</span>
      <div className="mt-2 flex items-center gap-2">
        <Swatch value={value} onChange={onChange} />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className={`${inputClass} min-w-0 flex-1 font-mono`}
        />
      </div>
    </div>
  )
}

function ColorsControl({ control, value, onChange }) {
  return (
    <div>
      <span className={labelClass}>{control.label}</span>
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((c, i) => (
          <Swatch
            key={i}
            value={c}
            title={c}
            onChange={(next) => onChange(value.map((old, j) => (j === i ? next : old)))}
          />
        ))}
      </div>
    </div>
  )
}

function SelectControl({ control, value, onChange }) {
  return (
    <div>
      <span className={labelClass}>{control.label}</span>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {control.options.map((option) => (
          <button
            key={String(option)}
            onClick={() => onChange(option)}
            className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
              option === value
                ? 'bg-white text-zinc-950'
                : 'border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white'
            }`}
          >
            {String(option)}
          </button>
        ))}
      </div>
    </div>
  )
}

function BooleanControl({ control, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={labelClass}>{control.label}</span>
      <button
        role="switch"
        aria-checked={value}
        aria-label={control.label}
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${value ? 'bg-accent' : 'bg-zinc-700'}`}
      >
        <span
          className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform duration-300 ${
            value ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  )
}

function TextControl({ control, value, onChange }) {
  return (
    <label className="block">
      <span className={labelClass}>{control.label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} mt-2 w-full py-1.5`}
      />
    </label>
  )
}

const tones = ['default', 'success', 'error', 'muted']

function LinesControl({ control, value, onChange }) {
  const update = (i, patch) => onChange(value.map((line, j) => (j === i ? { ...line, ...patch } : line)))

  return (
    <div>
      <span className={labelClass}>{control.label}</span>
      <div className="mt-2 space-y-2">
        {value.map((line, i) => (
          <div key={i} className="space-y-1.5 rounded-lg border border-white/10 bg-zinc-900/60 p-2">
            <div className="flex items-center gap-1.5">
              <span className="w-4 shrink-0 font-mono text-[10px] text-zinc-500">{i + 1}</span>
              <input
                value={line.command}
                placeholder="Command"
                onChange={(e) => update(i, { command: e.target.value })}
                className={`${inputClass} min-w-0 flex-1 font-mono`}
              />
              <button
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                aria-label={`Remove line ${i + 1}`}
                className="grid size-6 shrink-0 place-items-center rounded-md text-zinc-500 hover:bg-white/5 hover:text-rose-400"
              >
                ✕
              </button>
            </div>
            <input
              value={line.output ?? ''}
              placeholder="Response (optional)"
              onChange={(e) => update(i, { output: e.target.value })}
              className={`${inputClass} ml-5 w-[calc(100%-1.25rem)] font-mono`}
            />
            <div className="ml-5 flex flex-wrap gap-1">
              {tones.map((tone) => (
                <button
                  key={tone}
                  onClick={() => update(i, { tone })}
                  className={`rounded px-1.5 py-0.5 font-mono text-[10px] transition-colors ${
                    (line.tone ?? 'default') === tone
                      ? 'bg-white/15 text-white'
                      : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={() => onChange([...value, { command: 'echo "hello"', output: 'hello', tone: 'default' }])}
          className="w-full rounded-lg border border-dashed border-white/15 py-2 text-xs text-zinc-400 transition-colors hover:border-accent/60 hover:text-accent"
        >
          + Add line
        </button>
      </div>
    </div>
  )
}

const widgets = {
  number: NumberControl,
  color: ColorControl,
  colors: ColorsControl,
  select: SelectControl,
  boolean: BooleanControl,
  text: TextControl,
  lines: LinesControl,
}

export default function ControlsPanel({ controls, values, changed, onChange, onReset }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-medium text-white">
          Customize
          {changed && <span className="size-1.5 rounded-full bg-accent" title="Changed" />}
        </p>
        <button
          onClick={onReset}
          disabled={!changed}
          className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
        >
          ↺ Reset
        </button>
      </div>
      <div className="scroll-thin min-h-0 flex-1 space-y-5 overflow-y-auto p-4">
        {Object.entries(controls).map(([key, control]) => {
          const Widget = widgets[control.type]
          return (
            <Widget
              key={key}
              control={control}
              value={values[key]}
              onChange={(next) => onChange(key, next)}
            />
          )
        })}
      </div>
      <p className="border-t border-white/10 px-4 py-3 text-[11px] leading-relaxed text-zinc-500">
        Changes show up live in the preview and in the Usage code above.
      </p>
    </div>
  )
}
