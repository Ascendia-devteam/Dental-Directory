export default function Alert({ tone = 'error', children }) {
  if (!children) return null
  const tones = {
    error: 'border-danger/30 bg-danger/5 text-danger',
    info: 'border-brand/25 bg-brand-soft text-brand',
  }
  return (
    <p role="alert" className={`rounded-md border px-3 py-2.5 text-sm ${tones[tone]}`}>
      {children}
    </p>
  )
}
