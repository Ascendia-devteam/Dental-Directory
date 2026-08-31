// Registration steps are a real sequence, so the numbering carries
// information: it shows how much is left.
export default function StepIndicator({ steps, current }) {
  return (
    <ol className="flex items-center gap-3">
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'todo'
        return (
          <li key={label} className="flex flex-1 flex-col gap-2">
            <span
              className={`h-0.5 w-full rounded-full ${
                state === 'todo' ? 'bg-line' : 'bg-brand'
              }`}
            />
            <span
              className={`text-xs ${
                state === 'active' ? 'font-medium text-brand' : 'text-muted'
              }`}
            >
              {String(i + 1).padStart(2, '0')} · {label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
