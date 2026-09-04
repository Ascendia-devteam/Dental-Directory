import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/ui/Field'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import { supabase } from '../lib/supabase'
import { validateEmail } from '../lib/validation'
import { passwordResetRedirectTo } from '../lib/authRedirect'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validateEmail(email)
    setError(err)
    setFormError('')
    if (err) return

    setSending(true)
    const { error: sendError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: passwordResetRedirectTo(),
    })
    setSending(false)
    if (sendError) {
      setFormError(sendError.message)
      return
    }
    setSent(true)
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll email you a link to choose a new one."
      aside="Remembered it? Sign in instead."
    >
      {sent ? (
        <div className="space-y-5">
          <div className="rounded-md border border-line bg-brand-soft p-4 text-sm text-ink">
            If an account exists for <span className="font-medium">{email}</span>, a reset link
            is on its way. The link expires after a short while, so use it soon.
          </div>
          <Link to="/login" className="text-sm text-brand underline underline-offset-2">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Alert>{formError}</Alert>

          <Field label="Email" htmlFor="email" error={error}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(null)
                setFormError('')
              }}
              invalid={Boolean(error)}
            />
          </Field>

          <Button type="submit" disabled={sending} className="w-full">
            {sending ? 'Sending…' : 'Send reset link'}
          </Button>

          <p className="text-sm text-muted">
            <Link to="/login" className="text-brand underline underline-offset-2">
              Back to sign in
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  )
}
