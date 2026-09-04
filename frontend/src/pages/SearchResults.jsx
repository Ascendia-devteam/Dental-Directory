import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import ProfileCard from '../components/ProfileCard'
import Button from '../components/ui/Button'
import { supabase } from '../lib/supabase'
import { SPECIALTIES } from '../lib/specialties'

const PAGE_SIZE = 24

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const specialty = searchParams.get('specialty') ?? ''
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)

  const [queryInput, setQueryInput] = useState(q)
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    supabase
      .from('profiles')
      .select('username, full_name, specialty, avatar_url, clinics(name, address)')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!active) return
        setProfiles(data ?? [])
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    setQueryInput(q)
  }, [q])

  const applySearch = (e) => {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (queryInput.trim()) next.set('q', queryInput.trim())
    else next.delete('q')
    next.delete('page')
    setSearchParams(next)
  }

  const setSpecialty = (value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('specialty', value)
    else next.delete('specialty')
    next.delete('page')
    setSearchParams(next)
  }

  const goToPage = (nextPage) => {
    const next = new URLSearchParams(searchParams)
    if (nextPage > 1) next.set('page', String(nextPage))
    else next.delete('page')
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setQueryInput('')
    setSearchParams({})
  }

  const filtered = profiles.filter((p) => {
    const matchesQuery =
      !q ||
      [
        p.full_name,
        p.specialty,
        ...(p.clinics ?? []).flatMap((c) => [c.name, c.address]),
      ]
        .filter(Boolean)
        .some((f) => f.toLowerCase().includes(q.toLowerCase()))
    const matchesSpecialty = !specialty || p.specialty === specialty
    return matchesQuery && matchesSpecialty
  })

  const hasFilters = Boolean(q || specialty)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="border-b border-line bg-white px-5 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-2xl text-ink">Find a dentist</h1>
          <form onSubmit={applySearch} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Name, specialty, or city"
              className="flex-1 rounded-md border border-line px-4 py-2.5 text-ink placeholder:text-muted/60 focus:border-brand focus:outline-none"
            />
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="rounded-md border border-line px-4 py-2.5 text-ink focus:border-brand focus:outline-none sm:w-56"
            >
              <option value="">All specialties</option>
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Button type="submit">Search</Button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        {loading ? (
          <p className="text-center text-muted">Loading professionals…</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-lg border border-line bg-white px-6 py-16 text-center">
            <h2 className="font-display text-2xl text-ink">
              {profiles.length === 0
                ? 'The directory is just getting started.'
                : 'No matches for that search.'}
            </h2>
            <p className="mt-2 text-muted">
              {profiles.length === 0
                ? 'Be the first dentist to create your profile.'
                : 'Try a different name, specialty, or location.'}
            </p>
            {profiles.length === 0 ? (
              <Link to="/register" className="mt-6 inline-block">
                <Button>Create your profile</Button>
              </Link>
            ) : (
              hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 text-sm text-brand underline underline-offset-2"
                >
                  Clear search
                </button>
              )
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm text-muted">
                {filtered.length} dentist{filtered.length === 1 ? '' : 's'} found
                {specialty && ` in ${specialty}`}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-brand underline underline-offset-2"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((p) => (
                <ProfileCard key={p.username} profile={p} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="rounded-md border border-line px-4 py-2 text-sm text-ink hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-sm text-muted">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="rounded-md border border-line px-4 py-2 text-sm text-ink hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <SiteFooter />
    </div>
  )
}
