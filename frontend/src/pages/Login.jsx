import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/ui/Field'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import { useAuth } from '../context/AuthContext'
import { validateEmail } from '../lib/validation'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = (name) => (e) => {
    setValues((p) => ({ ...p, [name]: e.target.value }))
    setErrors((p) => ({ ...p, [name]: null }))
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = {
      email: validateEmail(values.email),
      password: values.password ? null : 'Enter your password.',
    }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return

    setLoading(true)
    try {
      await signIn(values)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg = err?.message ?? ''
      setFormError(
        msg.includes('Invalid login credentials')
          ? 'Incorrect email or password.'
          : msg.includes('Email not confirmed')
            ? 'Confirm your email before signing in.'
            : 'Could not sign in. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Manage your profile and practice details."
      aside="Not in the directory yet? Sign up in three steps."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Alert>{formError}</Alert>

        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange('email')}
            invalid={Boolean(errors.email)}
          />
        </Field>

        <Field label="Password" htmlFor="password" error={errors.password}>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={onChange('password')}
            invalid={Boolean(errors.password)}
          />
        </Field>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>

        <p className="text-sm text-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand underline underline-offset-2">
            Create your profile
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
