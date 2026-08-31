export default function Input({ invalid, className = '', ...props }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={`w-full rounded-md border bg-white px-3 py-2.5 text-ink placeholder:text-muted/60 transition-colors focus:border-brand focus:outline-none ${
        invalid ? 'border-danger' : 'border-line'
      } ${className}`}
    />
  )
}
