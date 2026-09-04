import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import StepIndicator from '../components/ui/StepIndicator'
import StepAccount from '../components/steps/StepAccount'
import StepPersonal from '../components/steps/StepPersonal'
import StepReview from '../components/steps/StepReview'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateRequired,
  validatePhone,
  validateAvatar,
} from '../lib/validation'

const STEPS = ['Account', 'Profile', 'Review']

const INITIAL = {
  username: '',
  email: '',
  password: '',
  confirm: '',
  fullName: '',
  specialty: '',
  licenseNo: '',
  phone: '',
  address: '',
  avatar: null,
  agreedToTerms: false,
}

export default function Register() {
  const navigate = useNavigate()
  const { signUp, refreshProfile } = useAuth()

  const [step, setStep] = useState(0)
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null }))
    setFormError('')
  }

  // Validates the current step before allowing the user to move on.
  const validateStep = () => {
    let next = {}
    if (step === 0) {
      next = {
        username: validateUsername(values.username),
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        confirm:
          values.confirm === values.password ? null : 'Passwords do not match.',
      }
    }
    if (step === 1) {
      next = {
        fullName: validateRequired(values.fullName, 'Your name'),
        phone: validatePhone(values.phone),
        avatar: validateAvatar(values.avatar),
      }
    }
    setErrors((prev) => ({ ...prev, ...next }))
    return Object.values(next).every((v) => !v)
  }

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  const back = () => setStep((s) => Math.max(s - 1, 0))

  // Uploads the photo to avatars/<uid>/... and returns the public URL.
  const uploadAvatar = async (userId) => {
    if (!values.avatar) return null
    const ext = values.avatar.name.split('.').pop().toLowerCase()
    const path = `${userId}/profile-${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from('avatars')
      .upload(path, values.avatar, { upsert: true, contentType: values.avatar.type })
    if (error) throw error
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async () => {
    if (!values.agreedToTerms) {
      setErrors((prev) => ({
        ...prev,
        agreedToTerms: 'Please confirm and accept the terms to continue.',
      }))
      return
    }

    setSubmitting(true)
    setFormError('')
    try {
      const { user, session } = await signUp({
        email: values.email,
        password: values.password,
        username: values.username,
        fullName: values.fullName,
        phone: values.phone,
        address: values.address,
      })

      // No session = email confirmation is enabled.
      // The base profile already exists (created by the trigger); the photo uploads on sign-in.
      if (!session) {
        setNotice(
          'Account created. Confirm your email from the link we sent you, then sign in to upload your photo.'
        )
        return
      }

      const avatarUrl = await uploadAvatar(user.id)

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: values.fullName,
          specialty: values.specialty || null,
          license_no: values.licenseNo || null,
          phone: values.phone,
          address: values.address,
          ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
        })
        .eq('id', user.id)
      if (error) throw error

      await refreshProfile()
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setFormError(translateError(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (notice) {
    return (
      <AuthLayout title="Check your email" aside="Final step">
        <Alert tone="info">{notice}</Alert>
        <Link to="/login" className="mt-6 inline-block text-brand underline underline-offset-2">
          Go to sign in
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Create your dentist profile"
      subtitle="Three steps. Takes less than two minutes."
      aside={`Step ${step + 1} of ${STEPS.length}`}
    >
      <div className="space-y-8">
        <StepIndicator steps={STEPS} current={step} />

        <Alert>{formError}</Alert>

        {step === 0 && (
          <StepAccount
            values={values}
            onChange={onChange}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {step === 1 && (
          <StepPersonal
            values={values}
            onChange={onChange}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {step === 2 && (
          <StepReview
            values={values}
            onEdit={setStep}
            onChange={onChange}
            error={errors.agreedToTerms}
          />
        )}

        <div className="flex items-center justify-between gap-3 border-t border-line pt-6">
          {step > 0 ? (
            <Button variant="ghost" onClick={back} disabled={submitting}>
              Back
            </Button>
          ) : (
            <Link to="/login" className="text-sm text-muted underline underline-offset-2">
              I already have an account
            </Link>
          )}

          {step < STEPS.length - 1 ? (
            <Button onClick={next}>Continue</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Creating account…' : 'Create account'}
            </Button>
          )}
        </div>
      </div>
    </AuthLayout>
  )
}

// Supabase messages arrive in English; we rephrase them in the product's voice.
function translateError(err) {
  const msg = err?.message ?? ''
  if (msg.includes('already registered') || msg.includes('already been registered'))
    return 'That email already has an account. Sign in instead.'
  if (msg.includes('duplicate key') && msg.includes('username'))
    return 'That username is already taken. Go back to step 1 and pick another one.'
  if (msg.includes('Password'))
    return 'The password does not meet the minimum requirements.'
  if (msg.toLowerCase().includes('rate limit'))
    return 'Too many attempts. Wait a minute and try again.'
  return msg || 'Could not create the account. Please try again.'
}
