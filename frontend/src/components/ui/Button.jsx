export default function Button({ variant = 'primary', className = '', children, ...props }) {
  const styles = {
    primary:
      'bg-brand text-white hover:bg-brand/90 disabled:bg-brand/40 disabled:cursor-not-allowed',
    ghost:
      'bg-transparent text-ink border border-line hover:bg-brand-soft disabled:opacity-50',
  }
  return (
    <button
      {...props}
      className={`rounded-md px-5 py-2.5 text-sm font-medium transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
