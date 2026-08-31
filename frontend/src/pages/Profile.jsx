import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import { supabase } from '../lib/supabase'

function Chip({ children }) {
  return (
    <span className="rounded-full border border-line bg-brand-soft px-3 py-1 text-sm text-ink">
      {children}
    </span>
  )
}

function Section({ title, children }) {
  return (
    <section className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default function Profile() {
  const { username } = useParams()
  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState('loading') // loading | found | not-found

  useEffect(() => {
    let active = true
    // phone is excluded from '*' by a column-level privilege (see
    // schema.sql section 7) — it only comes back non-null for admins,
    // via get_public_phone(). Everyone else gets null and the phone
    // sections below simply don't render.
    Promise.all([
      supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('is_published', true)
        .maybeSingle(),
      supabase.rpc('get_public_phone', { target_username: username }),
    ]).then(([{ data }, { data: phone }]) => {
      if (!active) return
      setProfile(data ? { ...data, phone } : null)
      setStatus(data ? 'found' : 'not-found')
    })
    return () => {
      active = false
    }
  }, [username])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">Loading…</div>
    )
  }

  if (status === 'not-found') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-2xl text-ink">Profile not found</h1>
        <Link to="/search" className="text-brand underline underline-offset-2">
          Back to the directory
        </Link>
      </div>
    )
  }

  const {
    full_name,
    degree,
    specialty,
    bio,
    phone,
    address,
    website,
    office_hours,
    license_no,
    education,
    years_experience,
    accepts_new_patients,
    languages = [],
    services = [],
    insurance_accepted = [],
    payment_methods = [],
    age_groups = [],
    avatar_url,
  } = profile

  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : null

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Identity header */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-5xl px-5 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border border-line bg-brand-soft">
              {avatar_url ? (
                <img src={avatar_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-4xl text-brand">
                  {full_name?.[0]?.toUpperCase() ?? '·'}
                </span>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-3xl text-ink">
                  {full_name}
                  {degree ? `, ${degree}` : ''}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
                  ✓ License verified
                </span>
              </div>
              <p className="mt-1 text-lg text-brand">{specialty || 'General dentistry'}</p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                {accepts_new_patients ? (
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                    Accepting new patients
                  </span>
                ) : (
                  <span className="rounded-full bg-muted/10 px-3 py-1 text-sm font-medium text-muted">
                    Not accepting new patients
                  </span>
                )}
                {Boolean(years_experience) && (
                  <span className="text-sm text-muted">{years_experience} years in practice</span>
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {telHref && (
                  <a
                    href={telHref}
                    className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand/90"
                  >
                    Call {phone}
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-brand-soft"
                  >
                    Visit website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {bio && (
            <Section title="About">
              <p className="text-ink">{bio}</p>
            </Section>
          )}

          {services.length > 0 && (
            <Section title="Services offered">
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </Section>
          )}

          {age_groups.length > 0 && (
            <Section title="Age groups treated">
              <div className="flex flex-wrap gap-2">
                {age_groups.map((a) => (
                  <Chip key={a}>{a}</Chip>
                ))}
              </div>
            </Section>
          )}

          {insurance_accepted.length > 0 && (
            <Section title="Insurance accepted">
              <div className="flex flex-wrap gap-2">
                {insurance_accepted.map((i) => (
                  <Chip key={i}>{i}</Chip>
                ))}
              </div>
            </Section>
          )}

          {payment_methods.length > 0 && (
            <Section title="Payment methods">
              <div className="flex flex-wrap gap-2">
                {payment_methods.map((p) => (
                  <Chip key={p}>{p}</Chip>
                ))}
              </div>
            </Section>
          )}

          {(education || license_no) && (
            <Section title="Education & credentials">
              <dl className="space-y-2 text-sm">
                {education && (
                  <div className="flex gap-2">
                    <dt className="w-28 shrink-0 text-muted">Education</dt>
                    <dd className="text-ink">{education}</dd>
                  </div>
                )}
                {license_no && (
                  <div className="flex gap-2">
                    <dt className="w-28 shrink-0 text-muted">License</dt>
                    <dd className="text-ink">{license_no}</dd>
                  </div>
                )}
              </dl>
            </Section>
          )}

          {languages.length > 0 && (
            <Section title="Languages spoken">
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <Chip key={l}>{l}</Chip>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 space-y-4 rounded-lg border border-line bg-white p-5">
            <h2 className="font-display text-lg text-ink">Practice information</h2>

            {address && (
              <div>
                <p className="text-sm text-muted">Address</p>
                <p className="text-sm text-ink">{address}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-sm text-brand underline underline-offset-2"
                >
                  Get directions
                </a>
              </div>
            )}

            {phone && (
              <div>
                <p className="text-sm text-muted">Phone</p>
                <a href={telHref} className="text-sm text-ink hover:text-brand">
                  {phone}
                </a>
              </div>
            )}

            {office_hours && (
              <div>
                <p className="text-sm text-muted">Office hours</p>
                <p className="text-sm text-ink">{office_hours}</p>
              </div>
            )}

            {website && (
              <div>
                <p className="text-sm text-muted">Website</p>
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brand underline underline-offset-2"
                >
                  {website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
