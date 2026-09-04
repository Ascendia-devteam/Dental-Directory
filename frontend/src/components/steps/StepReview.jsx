import { Link } from 'react-router-dom'

export default function StepReview({ values, onEdit, onChange, error }) {
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
            <dt className="w-24 shrink-0 text-sm text-muted sm:w-32">{label}</dt>
            <dd className="min-w-0 flex-1 truncate text-sm text-ink">{value}</dd>
            <button
              type="button"
              onClick={() => onEdit(step)}
              className="shrink-0 text-sm text-brand underline underline-offset-2 hover:no-underline"
            >
              Edit
            </button>
          </div>
        ))}
      </dl>

      <p className="text-sm text-muted">
        By creating your account you accept the directory's terms. Your profile stays
        unpublished until our team reviews it.
      </p>

      <label className="flex items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          checked={values.agreedToTerms}
          onChange={(e) => onChange('agreedToTerms', e.target.checked)}
          className="mt-0.5 rounded border-line"
        />
        <span>
          I confirm that the information I submit is accurate, that I am legally
          authorised to submit it, that I am at least 18 years old, and that I have
          read and agree to the{' '}
          <Link
            to="/terms"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand underline underline-offset-2"
          >
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link
            to="/privacy"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}
