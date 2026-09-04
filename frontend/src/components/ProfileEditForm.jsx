import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { SPECIALTIES } from '../lib/specialties'
import { validateRequired, validatePhone, validateAvatar, validateEmail } from '../lib/validation'
import { passwordResetRedirectTo } from '../lib/authRedirect'
import Field from './ui/Field'
import Input from './ui/Input'
import Button from './ui/Button'
import Alert from './ui/Alert'

const AGE_GROUPS = ['Infants', 'Children', 'Teens', 'Adults', 'Seniors']

const toList = (text) =>
  text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

const fromList = (arr) => (arr && arr.length > 0 ? arr.join(', ') : '')

const blankClinic = () => ({
  key: `new-${Math.random().toString(36).slice(2)}`,
  id: null,
  name: '',
  address: '',
  phone: '',
  website: '',
  officeHours: '',
})

function buildFormState(profile) {
  return {
    fullName: profile?.full_name ?? '',
    specialty: profile?.specialty ?? '',
    degree: profile?.degree ?? '',
    licenseNo: profile?.license_no ?? '',
    yearsExperience: profile?.years_experience ?? '',
    phone: profile?.phone ?? '',
    address: profile?.address ?? '',
    website: profile?.website ?? '',
    officeHours: profile?.office_hours ?? '',
    education: profile?.education ?? '',
    bio: profile?.bio ?? '',
    acceptsNewPatients: profile?.accepts_new_patients ?? true,
    languages: fromList(profile?.languages),
    services: fromList(profile?.services),
    insuranceAccepted: fromList(profile?.insurance_accepted),
    paymentMethods: fromList(profile?.payment_methods),
    ageGroups: profile?.age_groups ?? [],
    avatar: null,
  }
}

const textareaClass =
  'w-full rounded-md border border-line bg-white px-3 py-2.5 text-ink placeholder:text-muted/60 focus:border-brand focus:outline-none'

export default function ProfileEditForm({ profile, userId, email, onSaved, onCancel }) {
  const [values, setValues] = useState(() => buildFormState(profile))
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(profile?.avatar_url ?? null)

  const [clinics, setClinics] = useState([])
  const [removedClinicIds, setRemovedClinicIds] = useState([])
  const [clinicsLoading, setClinicsLoading] = useState(true)

  const [emailValue, setEmailValue] = useState(email ?? '')
  const [emailError, setEmailError] = useState(null)
  const [emailStatus, setEmailStatus] = useState('')
  const [emailSaving, setEmailSaving] = useState(false)

  const [resetStatus, setResetStatus] = useState('')
  const [resetSending, setResetSending] = useState(false)

  useEffect(() => {
    let active = true
    supabase
      .rpc('get_my_clinics')
      .then(({ data }) => {
        if (!active) return
        setClinics(
          (data ?? []).map((c) => ({
            key: c.id,
            id: c.id,
            name: c.name ?? '',
            address: c.address ?? '',
            phone: c.phone ?? '',
            website: c.website ?? '',
            officeHours: c.office_hours ?? '',
          }))
        )
        setClinicsLoading(false)
      })
    return () => {
      active = false
    }
  }, [userId])

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null }))
  }

  const toggleAgeGroup = (group) => {
    setValues((prev) => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(group)
        ? prev.ageGroups.filter((g) => g !== group)
        : [...prev.ageGroups, group],
    }))
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0] ?? null
    const error = validateAvatar(file)
    setErrors((prev) => ({ ...prev, avatar: error }))
    if (error) return
    onChange('avatar', file)
    setPreview(file ? URL.createObjectURL(file) : (profile?.avatar_url ?? null))
  }

  const uploadAvatar = async () => {
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

  const updateClinic = (key, field, value) => {
    setClinics((prev) => prev.map((c) => (c.key === key ? { ...c, [field]: value } : c)))
  }

  const addClinic = () => setClinics((prev) => [...prev, blankClinic()])

  const removeClinic = (key) => {
    setClinics((prev) => {
      const target = prev.find((c) => c.key === key)
      if (target?.id) setRemovedClinicIds((ids) => [...ids, target.id])
      return prev.filter((c) => c.key !== key)
    })
  }

  const saveClinics = async () => {
    if (removedClinicIds.length > 0) {
      const { error } = await supabase.from('clinics').delete().in('id', removedClinicIds)
      if (error) throw error
    }
    for (const [index, clinic] of clinics.entries()) {
      if (!clinic.name && !clinic.address && !clinic.phone && !clinic.website) continue
      const payload = {
        profile_id: userId,
        name: clinic.name || null,
        address: clinic.address || null,
        phone: clinic.phone || null,
        website: clinic.website || null,
        office_hours: clinic.officeHours || null,
        sort_order: index,
      }
      const { error } = clinic.id
        ? await supabase.from('clinics').update(payload).eq('id', clinic.id)
        : await supabase.from('clinics').insert(payload)
      if (error) throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {
      fullName: validateRequired(values.fullName, 'Your name'),
      phone: validatePhone(values.phone),
    }
    setErrors((prev) => ({ ...prev, ...nextErrors }))
    if (Object.values(nextErrors).some(Boolean)) return

    setSaving(true)
    setFormError('')
    try {
      const avatarUrl = await uploadAvatar()
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: values.fullName,
          specialty: values.specialty || null,
          degree: values.degree || null,
          license_no: values.licenseNo || null,
          years_experience: values.yearsExperience ? Number(values.yearsExperience) : null,
          phone: values.phone,
          address: values.address || null,
          website: values.website || null,
          office_hours: values.officeHours || null,
          education: values.education || null,
          bio: values.bio || null,
          accepts_new_patients: values.acceptsNewPatients,
          languages: toList(values.languages),
          services: toList(values.services),
          insurance_accepted: toList(values.insuranceAccepted),
          payment_methods: toList(values.paymentMethods),
          age_groups: values.ageGroups,
          ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
        })
        .eq('id', userId)
      if (error) throw error

      await saveClinics()
      setRemovedClinicIds([])

      await onSaved()
    } catch (err) {
      setFormError(err?.message ?? 'Could not save your profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleEmailUpdate = async () => {
    const err = validateEmail(emailValue)
    setEmailError(err)
    if (err) return
    setEmailSaving(true)
    setEmailStatus('')
    const { data, error } = await supabase.auth.updateUser({ email: emailValue.trim() })
    setEmailSaving(false)
    if (error) {
      setEmailStatus(error.message)
      return
    }
    // Whether a confirmation step happens depends on the project's email
    // settings, so report what actually came back rather than assuming:
    // new_email is only set while a change is still awaiting confirmation.
    setEmailStatus(
      data?.user?.new_email
        ? `Confirmation sent to ${data.user.new_email} — the change applies once you confirm.`
        : `Email updated to ${emailValue.trim()}.`
    )
  }

  const handlePasswordReset = async () => {
    if (!email) return
    setResetSending(true)
    setResetStatus('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: passwordResetRedirectTo(),
    })
    setResetSending(false)
    setResetStatus(error ? error.message : `Password reset email sent to ${email}.`)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <Alert>{formError}</Alert>

      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line bg-brand-soft">
          {preview ? (
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-lg text-brand">
              {values.fullName?.trim()?.[0]?.toUpperCase() ?? '·'}
            </span>
          )}
        </div>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          className="block w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-brand-soft file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand hover:file:bg-brand-soft/70"
        />
      </div>
      {errors.avatar && <p className="text-sm text-danger">{errors.avatar}</p>}

      <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
        <Input
          id="fullName"
          value={values.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          invalid={Boolean(errors.fullName)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Specialty" htmlFor="specialty">
          <select
            id="specialty"
            value={values.specialty}
            onChange={(e) => onChange('specialty', e.target.value)}
            className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-ink focus:border-brand focus:outline-none"
          >
            <option value="">Select one</option>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Degree" htmlFor="degree" hint="Shown next to your name, e.g. DDS">
          <Input
            id="degree"
            value={values.degree}
            onChange={(e) => onChange('degree', e.target.value)}
            placeholder="DDS"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="License number"
          htmlFor="licenseNo"
          hint="Collected for our records and displayed on your profile as entered. We do not independently verify licenses."
        >
          <Input
            id="licenseNo"
            value={values.licenseNo}
            onChange={(e) => onChange('licenseNo', e.target.value)}
            placeholder="M-28-1234"
          />
        </Field>
        <Field label="Years in practice" htmlFor="yearsExperience">
          <Input
            id="yearsExperience"
            type="number"
            min="0"
            value={values.yearsExperience}
            onChange={(e) => onChange('yearsExperience', e.target.value)}
          />
        </Field>
      </div>

      <Field
        label="Personal phone"
        htmlFor="phone"
        error={errors.phone}
        hint="Used to verify your account, contact you about your listing, and inform you about our services. Not published on your public profile."
      >
        <Input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          invalid={Boolean(errors.phone)}
        />
      </Field>

      <Field
        label="Personal address (optional)"
        htmlFor="address"
        hint="Private — only visible to you and site admins. Use Practice locations below for what patients see."
      >
        <Input id="address" value={values.address} onChange={(e) => onChange('address', e.target.value)} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Website" htmlFor="website">
          <Input
            id="website"
            type="url"
            value={values.website}
            onChange={(e) => onChange('website', e.target.value)}
            placeholder="https://yourpractice.com"
          />
        </Field>
        <Field label="Office hours" htmlFor="officeHours">
          <Input
            id="officeHours"
            value={values.officeHours}
            onChange={(e) => onChange('officeHours', e.target.value)}
            placeholder="Mon-Fri 9am-5pm"
          />
        </Field>
      </div>

      <Field label="Education" htmlFor="education" hint="Dental school and graduation year">
        <Input
          id="education"
          value={values.education}
          onChange={(e) => onChange('education', e.target.value)}
          placeholder="Harvard School of Dental Medicine, 2015"
        />
      </Field>

      <Field label="About / bio" htmlFor="bio" hint="A short intro shown on your public profile.">
        <textarea
          id="bio"
          rows={4}
          value={values.bio}
          onChange={(e) => onChange('bio', e.target.value)}
          className={textareaClass}
        />
      </Field>

      <Field
        label="Services offered"
        htmlFor="services"
        hint="Comma-separated, e.g. Cleanings, Fillings, Teeth whitening"
      >
        <textarea
          id="services"
          rows={2}
          value={values.services}
          onChange={(e) => onChange('services', e.target.value)}
          className={textareaClass}
        />
      </Field>

      <Field
        label="Insurance accepted"
        htmlFor="insurance"
        hint="Comma-separated, e.g. Delta Dental, Cigna, MetLife"
      >
        <Input
          id="insurance"
          value={values.insuranceAccepted}
          onChange={(e) => onChange('insuranceAccepted', e.target.value)}
        />
      </Field>

      <Field
        label="Payment methods"
        htmlFor="payment"
        hint="Comma-separated, e.g. Cash, Credit card, Financing available"
      >
        <Input
          id="payment"
          value={values.paymentMethods}
          onChange={(e) => onChange('paymentMethods', e.target.value)}
        />
      </Field>

      <Field label="Languages spoken" htmlFor="languages" hint="Comma-separated, e.g. English, Spanish">
        <Input
          id="languages"
          value={values.languages}
          onChange={(e) => onChange('languages', e.target.value)}
        />
      </Field>

      <fieldset>
        <legend className="text-sm font-medium text-ink">Age groups treated</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {AGE_GROUPS.map((group) => (
            <label key={group} className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={values.ageGroups.includes(group)}
                onChange={() => toggleAgeGroup(group)}
                className="rounded border-line"
              />
              {group}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={values.acceptsNewPatients}
          onChange={(e) => onChange('acceptsNewPatients', e.target.checked)}
          className="rounded border-line"
        />
        Currently accepting new patients
      </label>

      {/* Practice locations */}
      <fieldset className="space-y-4 border-t border-line pt-6">
        <div>
          <legend className="text-sm font-medium text-ink">Practice locations</legend>
          <p className="text-sm text-muted">
            Public — shown on your profile so patients know where to find you. Add as many as you have.
          </p>
        </div>

        {clinicsLoading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : (
          <div className="space-y-4">
            {clinics.map((clinic) => (
              <div key={clinic.key} className="space-y-3 rounded-md border border-line p-4">
                <div className="flex items-center justify-between gap-3">
                  <Input
                    value={clinic.name}
                    onChange={(e) => updateClinic(clinic.key, 'name', e.target.value)}
                    placeholder="Clinic name"
                    className="max-w-xs"
                  />
                  <button
                    type="button"
                    onClick={() => removeClinic(clinic.key)}
                    className="text-sm text-danger underline underline-offset-2"
                  >
                    Remove
                  </button>
                </div>
                <Input
                  value={clinic.address}
                  onChange={(e) => updateClinic(clinic.key, 'address', e.target.value)}
                  placeholder="Address"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    type="tel"
                    value={clinic.phone}
                    onChange={(e) => updateClinic(clinic.key, 'phone', e.target.value)}
                    placeholder="Clinic phone"
                  />
                  <Input
                    value={clinic.officeHours}
                    onChange={(e) => updateClinic(clinic.key, 'officeHours', e.target.value)}
                    placeholder="Office hours"
                  />
                </div>
                <Input
                  type="url"
                  value={clinic.website}
                  onChange={(e) => updateClinic(clinic.key, 'website', e.target.value)}
                  placeholder="https://thisclinic.com"
                />
              </div>
            ))}
          </div>
        )}

        <Button type="button" variant="ghost" onClick={addClinic}>
          + Add a practice location
        </Button>
      </fieldset>

      <div className="flex items-center justify-end gap-3 border-t border-line pt-6">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save profile'}
        </Button>
      </div>

      {/* Account settings */}
      <div className="space-y-6 border-t border-line pt-6">
        <h2 className="font-display text-lg text-ink">Account</h2>

        <Field label="Login email" htmlFor="accountEmail" error={emailError}>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              id="accountEmail"
              type="email"
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value)
                setEmailError(null)
                setEmailStatus('')
              }}
              invalid={Boolean(emailError)}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={handleEmailUpdate}
              disabled={emailSaving || emailValue.trim() === email}
            >
              {emailSaving ? 'Sending…' : 'Update email'}
            </Button>
          </div>
        </Field>
        {emailStatus && <p className="text-sm text-muted">{emailStatus}</p>}

        <div>
          <Button type="button" variant="ghost" onClick={handlePasswordReset} disabled={resetSending}>
            {resetSending ? 'Sending…' : 'Send password reset email'}
          </Button>
          {resetStatus && <p className="mt-2 text-sm text-muted">{resetStatus}</p>}
        </div>
      </div>
    </form>
  )
}
