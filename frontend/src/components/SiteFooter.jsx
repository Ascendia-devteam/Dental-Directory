import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="border-t border-line px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <span className="font-display text-base text-brand">Dental Directory</span>
        <div className="flex gap-6">
          <Link to="/search" className="hover:text-ink">
            Find a dentist
          </Link>
          <Link to="/register" className="hover:text-ink">
            List your practice
          </Link>
          <Link to="/login" className="hover:text-ink">
            Sign in
          </Link>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted">
        Developed by{' '}
        <a
          href="https://ascendiagroup.ai/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-ink"
        >
          Ascendia Group
        </a>
      </p>
    </footer>
  )
}
