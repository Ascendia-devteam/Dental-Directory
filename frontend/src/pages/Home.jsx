import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import ProfileCard from '../components/ProfileCard'
import { supabase } from '../lib/supabase'
import { SPECIALTIES } from '../lib/specialties'

const STEPS = [
  {
    title: 'Search',
    body: 'Filter by specialty, name, or city to find dentists near you.',
  },
  {
    title: 'Compare',
    body: 'Review credentials, services, insurance, and languages spoken.',
  },
  {
    title: 'Reach out',
    body: 'Contact the practice directly — no middlemen, no booking fees.',
  },
]

const VALUE_PROPS = [
  {
    title: 'License verified',
    body: 'Every published profile has had its license number checked before it goes live.',
  },
  {
    title: 'Direct contact',
    body: 'You reach the practice itself. No call centers, no referral commissions.',
  },
  {
    title: 'Free to search',
    body: 'Browsing the directory and contacting a dentist costs patients nothing.',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    let active = true
    supabase
      .from('profiles')
      .select('username, full_name, specialty, avatar_url, clinics(address)')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (active) setFeatured(data ?? [])
      })
    return () => {
      active = false
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (specialty) params.set('specialty', specialty)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-brand px-5 py-20 text-white"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08) 0, transparent 45%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.08) 0, transparent 45%)',
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-wide text-white/80">
            The dentist directory patients trust
          </span>
          <h1 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">
            Find the right dentist for your smile.
          </h1>
          <p className="mt-5 text-lg text-white/80">
            Verified dentists and dental specialists — search by name, specialty, or location.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-10 flex flex-col gap-3 rounded-xl bg-white p-3 shadow-xl shadow-black/10 sm:flex-row"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, specialty, or city"
              className="flex-1 rounded-lg px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none"
            />
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="rounded-lg px-4 py-3 text-ink focus:outline-none sm:w-56"
            >
              <option value="">All specialties</option>
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg bg-ink px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-ink/90"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-white/70">
            <span>Popular:</span>
            {SPECIALTIES.slice(0, 4).map((s) => (
              <Link
                key={s}
                to={`/search?specialty=${encodeURIComponent(s)}`}
                className="rounded-full border border-white/30 px-3 py-1 transition-colors hover:bg-white/10"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-center font-display text-2xl text-ink sm:text-3xl">
          Three steps to your next dentist
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft font-display text-lg text-brand">
                {i + 1}
              </div>
              <h3 className="mt-4 font-display text-lg text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured dentists */}
      {featured.length > 0 && (
        <section className="border-y border-line bg-white px-5 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">Recently joined</h2>
              <Link
                to="/search"
                className="text-sm text-brand underline underline-offset-2 hover:no-underline"
              >
                Browse all dentists
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {featured.map((p) => (
                <ProfileCard key={p.username} profile={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Value props */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {VALUE_PROPS.map((item) => (
            <div key={item.title} className="rounded-lg border border-line bg-white p-6">
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA for dentists */}
      <section className="bg-brand-soft px-5 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">Are you a dentist?</h2>
          <p className="mt-3 text-muted">
            Create your professional profile and let new patients find you.
          </p>
          <Link
            to="/register"
            className="mt-6 inline-block rounded-md bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand/90"
          >
            List your practice
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
