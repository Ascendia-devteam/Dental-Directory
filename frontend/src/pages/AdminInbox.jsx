import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import Button from '../components/ui/Button'
import { supabase } from '../lib/supabase'
import { initial } from '../lib/initials'

export default function AdminInbox() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [onlyPending, setOnlyPending] = useState(true)
  const [resetId, setResetId] = useState(null)
  const [resetMessage, setResetMessage] = useState({})

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.rpc('list_all_profiles_admin')
    setAccounts(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const toggleVerified = async (account) => {
    setUpdatingId(account.id)
    const { error } = await supabase
      .from('profiles')
      .update({ is_verified: !account.is_verified })
      .eq('id', account.id)
    if (!error) {
      setAccounts((prev) =>
        prev.map((a) => (a.id === account.id ? { ...a, is_verified: !a.is_verified } : a))
      )
    }
    setUpdatingId(null)
  }

  const sendPasswordReset = async (account) => {
    setResetId(account.id)
    const { error } = await supabase.auth.resetPasswordForEmail(account.email)
    setResetMessage((prev) => ({
      ...prev,
      [account.id]: error ? error.message : `Reset email sent to ${account.email}.`,
    }))
    setResetId(null)
  }

  const visible = onlyPending ? accounts.filter((a) => !a.is_verified) : accounts

  return (
    <div>
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-ink">Account verification</h1>
            <p className="mt-1 text-muted">
              Approve a new signup before it can appear in public search results.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={onlyPending}
              onChange={(e) => setOnlyPending(e.target.checked)}
              className="rounded border-line"
            />
            Show pending only
          </label>
        </div>

        {loading ? (
          <p className="mt-10 text-center text-muted">Loading accounts…</p>
        ) : visible.length === 0 ? (
          <div className="mt-10 rounded-lg border border-line bg-white px-6 py-16 text-center">
            <h2 className="font-display text-xl text-ink">
              {onlyPending ? 'Nothing pending review.' : 'No accounts yet.'}
            </h2>
            {onlyPending && accounts.length > 0 && (
              <button
                type="button"
                onClick={() => setOnlyPending(false)}
                className="mt-4 text-sm text-brand underline underline-offset-2"
              >
                Show all accounts
              </button>
            )}
          </div>
        ) : (
          <div className="mt-8 divide-y divide-line rounded-md border border-line bg-white">
            {visible.map((account) => (
              <div
                key={account.id}
                className="flex flex-wrap items-center gap-4 px-5 py-4"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line bg-brand-soft">
                  {account.avatar_url ? (
                    <img
                      src={account.avatar_url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-brand">
                      {initial(account.full_name) ?? '·'}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/dr/${account.username}`}
                      className="font-medium text-ink hover:text-brand"
                    >
                      {account.full_name || account.username}
                    </Link>
                    <span className="text-sm text-muted">@{account.username}</span>
                    {account.is_admin && (
                      <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted">{account.email}</p>
                  <p className="text-sm text-muted">
                    {account.specialty || 'No specialty set'}
                    {account.license_no && ` · License ${account.license_no}`}
                    {account.phone && ` · ${account.phone}`}
                    {account.address && ` · ${account.address}`}
                  </p>
                  {resetMessage[account.id] && (
                    <p className="mt-1 text-sm text-brand">{resetMessage[account.id]}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      account.is_published
                        ? 'bg-brand-soft text-brand'
                        : 'bg-muted/10 text-muted'
                    }`}
                  >
                    {account.is_published ? 'Published' : 'Unpublished'}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      account.is_verified
                        ? 'bg-brand-soft text-brand'
                        : 'bg-muted/10 text-muted'
                    }`}
                  >
                    {account.is_verified ? 'Verified' : 'Pending'}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => sendPasswordReset(account)}
                    disabled={resetId === account.id}
                    className="!py-1.5"
                  >
                    {resetId === account.id ? 'Sending…' : 'Send reset'}
                  </Button>
                  <Button
                    variant={account.is_verified ? 'ghost' : 'primary'}
                    onClick={() => toggleVerified(account)}
                    disabled={updatingId === account.id}
                    className="!py-1.5"
                  >
                    {updatingId === account.id
                      ? 'Saving…'
                      : account.is_verified
                        ? 'Unverify'
                        : 'Verify'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
