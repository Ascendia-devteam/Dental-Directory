import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import Button from '../components/ui/Button'
import SiteHeader from '../components/SiteHeader'
import ProfileEditForm from '../components/ProfileEditForm'

export default function Dashboard() {
  const { user, profile, refreshProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const togglePublish = async () => {
    setPublishing(true)
    const { error } = await supabase
      .from('profiles')
      .update({ is_published: !profile?.is_published })
      .eq('id', user.id)
    if (!error) await refreshProfile()
    setPublishing(false)
  }

  if (editing) {
    return (
      <div>
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-5 py-12">
          <h1 className="font-display text-2xl text-ink">Edit your profile</h1>
          <p className="mt-1 text-muted">These details appear on your public profile page.</p>

          <ProfileEditForm
            profile={profile}
            userId={user.id}
            onCancel={() => setEditing(false)}
            onSaved={async () => {
              await refreshProfile()
              setEditing(false)
            }}
          />
        </div>
      </div>
    )
  }

  const fields = [
    ['Username', profile?.username],
    ['Email', user?.email],
    ['Specialty', profile?.specialty],
    ['License', profile?.license_no],
    ['Phone', profile?.phone],
    ['Address', profile?.address],
  ]

  return (
    <div>
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-12">
        <section className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line bg-brand-soft">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-2xl text-brand">
                  {profile?.full_name?.[0]?.toUpperCase() ?? '·'}
                </span>
              )}
            </div>
            <div>
              <h1 className="font-display text-3xl text-ink">
                {profile?.full_name ?? 'Your profile'}
              </h1>
              <p className="text-muted">
                {profile?.is_published ? 'Published in the directory.' : 'Not published yet.'}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={togglePublish} disabled={publishing}>
              {publishing ? 'Saving…' : profile?.is_published ? 'Unpublish' : 'Publish profile'}
            </Button>
            <Button onClick={() => setEditing(true)}>Edit profile</Button>
          </div>
        </section>

        <dl className="mt-10 divide-y divide-line rounded-md border border-line bg-white">
          {fields.map(([label, value]) => (
            <div key={label} className="flex gap-4 px-4 py-3">
              <dt className="w-32 shrink-0 text-sm text-muted">{label}</dt>
              <dd className="text-sm text-ink">{value || '—'}</dd>
            </div>
          ))}
        </dl>

        {profile?.username && (
          <p className="mt-6 text-sm text-muted">
            Public page:{' '}
            <Link to={`/dr/${profile.username}`} className="text-brand underline underline-offset-2">
              /dr/{profile.username}
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
