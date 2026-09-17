import { Link } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, aside, children }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[400px_1fr]">
      {/* Brand panel */}
      <aside className="hidden flex-col justify-between bg-brand px-10 py-12 text-white lg:flex">
        {/* The navy/gold wordmark needs a light background to read, so the
            teal panel gets the icon-only mark instead of the full lockup. */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/brand/logo-icon.png" alt="" className="h-10 w-10 rounded-lg" />
          <span className="font-display text-2xl">Dentist Search Hub</span>
        </Link>

        <div className="space-y-6">
          <p className="font-display text-3xl leading-snug">
            Patients are looking for a dentist they can trust. Let them find you.
          </p>
          <ul className="space-y-3 text-sm text-white/80">
            <li>Professional profile with photo, specialty, and practice.</li>
            <li>Direct contact, no intermediaries.</li>
            <li>We review every account before it goes live.</li>
          </ul>
        </div>

        <p className="text-sm text-white/60">{aside}</p>
      </aside>

      {/* Content */}
      <main className="flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-lg">
          <Link to="/" className="mb-8 block lg:hidden">
            <img src="/brand/logo-horizontal.png" alt="Dentist Search Hub" className="h-10 w-auto" />
          </Link>
          <h1 className="font-display text-3xl text-ink">{title}</h1>
          {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  )
}
