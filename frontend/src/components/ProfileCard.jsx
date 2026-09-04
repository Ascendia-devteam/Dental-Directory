import { Link } from 'react-router-dom'

export default function ProfileCard({ profile }) {
  return (
    <Link
      to={`/dr/${profile.username}`}
      className="block rounded-lg border border-line bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line bg-brand-soft">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-lg text-brand">
              {profile.full_name?.[0]?.toUpperCase() ?? '·'}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg text-ink">{profile.full_name}</h3>
          <p className="text-sm text-brand">{profile.specialty || 'General dentistry'}</p>
        </div>
      </div>
      {profile.clinics?.[0]?.address && (
        <p className="mt-4 truncate text-sm text-muted">{profile.clinics[0].address}</p>
      )}
    </Link>
  )
}
