import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from './ui/Button'

export default function SiteHeader() {
  const { session, profile, signOut } = useAuth()
  const { pathname } = useLocation()

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-xl text-brand">
          Dental Directory
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/search" className="hidden text-ink sm:inline">
            Find a dentist
          </Link>

          {session ? (
            <>
              {profile?.is_admin && (
                <Link
                  to="/admin"
                  className={
                    pathname === '/admin' ? 'font-medium text-brand' : 'text-muted hover:text-ink'
                  }
                >
                  Admin
                </Link>
              )}
              <Link
                to="/dashboard"
                className={
                  pathname === '/dashboard'
                    ? 'font-medium text-brand'
                    : 'text-muted hover:text-ink'
                }
              >
                Dashboard
              </Link>
              <Button variant="ghost" onClick={signOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-muted hover:text-ink">
                Sign in
              </Link>
              <Link to="/register">
                <Button>List your practice</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
