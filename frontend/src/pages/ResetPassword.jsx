import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/ui/Field'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import { supabase } from '../lib/supabase'
import { validatePassword } from '../lib/validation'

// Supabase reports a dead link (expired, already used, tampered with) as
// error params in the URL fragment rather than as a failed request.
function linkErrorFromUrl() {
  const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : ''
  const params = new URLSearchParams(hash)
  const code = params.get('error_code')
  const description = params.get('error_description')
  if (!code && !description) return null
  if (code === 'otp_expired') return 'This reset link has expired. Request a new one below.'
  return description ? description.replace(/\+/g, ' ') : 'This reset link is no longer valid.'
}

export default function ResetPassword() {
  const navigate = useNavigate()
  // checking -> ready (recovery session established) | invalid
  const [status, setStatus] = useState('checking')
  const [linkError, setLinkError] = useState(null)
  const [values, setValues] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true

    const urlError = linkErrorFromUrl()
    if (urlError) {
      setLinkError(urlError)
      setStatus('invalid')
      return
    }

    // The client consumes the recovery token from the URL on start-up, so
    // by the time getSession() resolves the session is either there or the
    // link was never valid. onAuthStateChange covers the case where the
    // token is exchanged a moment later.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active && session) setStatus('ready')
    })

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setStatus(data.session ? 'ready' : 'invalid')
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const onChange = (name) => (e) => {
    setValues((p) => ({ ...p, [name]: e.target.value }))
    setErrors((p) => ({ ...p, [name]: null }))
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = {
      password: validatePassword(values.password),
      confirm: values.password === values.confirm ? null : 'The passwords do not match.',
    }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return

    setSaving(true)
    const { error } = await supabase.auth.updateUser({ password: values.password })
    setSaving(false)
    if (error) {
      setFormError(error.message)
      return
    }
    navigate('/dashboard', { replace: true })
  }

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">Loading…</div>
    )
  }

  if (status === 'invalid') {
    return (
      <AuthLayout
        title="That link didn't work"
        subtitle="Reset links can only be used once, and they expire."
        aside="Need a hand? Get in touch."
      >
        <div className="space-y-5">
          <Alert>{linkError ?? 'Open the most recent reset email, or request a new link.'}</Alert>
          <Link to="/forgot-password">
            <Button className="w-full">Request a new link</Button>
          </Link>
          <p className="text-sm text-muted">
            <Link to="/login" className="text-brand underline underline-offset-2">
              Back to sign in
            </Link>
          </p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Choose a new password"
      subtitle="Pick something you haven't used here before."
      aside="You'll be signed in once it's saved."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Alert>{formError}</Alert>

        <Field label="New password" htmlFor="password" error={errors.password}>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={onChange('password')}
            invalid={Boolean(errors.password)}
          />
        </Field>

        <Field label="Confirm new password" htmlFor="confirm" error={errors.confirm}>
          <Input
            id="confirm"
            type="password"
            autoComplete="new-password"
            value={values.confirm}
            onChange={onChange('confirm')}
            invalid={Boolean(errors.confirm)}
          />
        </Field>

        <Button type="submit" disabled={saving} className="w-full">
          {saving ? 'Saving…' : 'Save new password'}
        </Button>
      </form>
    </AuthLayout>
  )
}
