import { Link } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, aside, children }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[400px_1fr]">
      {/* Brand panel */}
      <aside className="hidden flex-col justify-between bg-brand px-10 py-12 text-white lg:flex">
        <Link to="/" className="font-display text-xl">
          Dental Directory
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
          <Link to="/" className="mb-8 block font-display text-lg text-brand lg:hidden">
            Dental Directory
          </Link>
          <h1 className="font-display text-3xl text-ink">{title}</h1>
          {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  )
}
