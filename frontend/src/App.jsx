import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminInbox from './pages/AdminInbox'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import { useAuth } from './context/AuthContext'

function Protected({ children }) {
  const { session, loading } = useAuth()
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Loading…
      </div>
    )
  }
  return session ? children : <Navigate to="/login" replace />
}

function AdminOnly({ children }) {
  const { session, profile, loading } = useAuth()
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Loading…
      </div>
    )
  }
  if (!session) return <Navigate to="/login" replace />
  return profile?.is_admin ? children : <Navigate to="/dashboard" replace />
}

function GuestOnly({ children }) {
  const { session, loading } = useAuth()
  if (loading) return null
  return session ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/dr/:username" element={<Profile />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route
        path="/register"
        element={
          <GuestOnly>
            <Register />
          </GuestOnly>
        }
      />
      <Route
        path="/login"
        element={
          <GuestOnly>
            <Login />
          </GuestOnly>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminOnly>
            <AdminInbox />
          </AdminOnly>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
