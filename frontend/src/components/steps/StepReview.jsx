export default function StepReview({ values, onEdit }) {
  const rows = [
    ['Username', values.username, 0],
    ['Email', values.email, 0],
    ['Name', values.fullName, 1],
    ['Specialty', values.specialty || '—', 1],
    ['License', values.licenseNo || '—', 1],
    ['Phone', values.phone, 1],
    ['Address', values.address || '—', 1],
    ['Photo', values.avatar ? values.avatar.name : 'No photo', 1],
  ]

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">
        Review your details. You can change them later from your dashboard.
      </p>

      <dl className="divide-y divide-line rounded-md border border-line bg-white">
        {rows.map(([label, value, step]) => (
          <div key={label} className="flex items-baseline gap-4 px-4 py-3">
            <dt className="w-32 shrink-0 text-sm text-muted">{label}</dt>
            <dd className="flex-1 truncate text-sm text-ink">{value}</dd>
            <button
              type="button"
              onClick={() => onEdit(step)}
              className="text-sm text-brand underline underline-offset-2 hover:no-underline"
            >
              Edit
            </button>
          </div>
        ))}
      </dl>

      <p className="text-sm text-muted">
        By creating your account you accept the directory's terms. Your profile stays
        unpublished until we verify your license number.
      </p>
    </div>
  )
}
