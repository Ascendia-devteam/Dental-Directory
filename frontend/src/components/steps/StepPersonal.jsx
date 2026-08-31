import { useEffect, useState } from 'react'
import Field from '../ui/Field'
import Input from '../ui/Input'
import { validateRequired, validatePhone, validateAvatar } from '../../lib/validation'
import { SPECIALTIES } from '../../lib/specialties'

export default function StepPersonal({ values, onChange, errors, setErrors }) {
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (!values.avatar) return setPreview(null)
    const url = URL.createObjectURL(values.avatar)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [values.avatar])

  const handleFile = (e) => {
    const file = e.target.files?.[0] ?? null
    const error = validateAvatar(file)
    setErrors((prev) => ({ ...prev, avatar: error }))
    onChange('avatar', error ? null : file)
  }

  return (
    <div className="space-y-5">
      <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
        <Input
          id="fullName"
          value={values.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          onBlur={() =>
            setErrors((p) => ({
              ...p,
              fullName: validateRequired(values.fullName, 'Your name'),
            }))
          }
          invalid={Boolean(errors.fullName)}
          autoComplete="name"
          placeholder="Dr. Elena Martinez"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Specialty" htmlFor="specialty" error={errors.specialty}>
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

        <Field
          label="License number"
          htmlFor="licenseNo"
          hint="We verify it before publishing your profile."
        >
          <Input
            id="licenseNo"
            value={values.licenseNo}
            onChange={(e) => onChange('licenseNo', e.target.value)}
            placeholder="M-28-1234"
          />
        </Field>
      </div>

      <Field label="Contact phone" htmlFor="phone" error={errors.phone}>
        <Input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          onBlur={() => setErrors((p) => ({ ...p, phone: validatePhone(values.phone) }))}
          invalid={Boolean(errors.phone)}
          autoComplete="tel"
          placeholder="+1 555 000 0000"
        />
      </Field>

      <Field
        label="Practice address"
        htmlFor="address"
        error={errors.address}
        hint="It will appear on the map on your public profile."
      >
        <Input
          id="address"
          value={values.address}
          onChange={(e) => onChange('address', e.target.value)}
          onBlur={() =>
            setErrors((p) => ({
              ...p,
              address: validateRequired(values.address, 'Address'),
            }))
          }
          invalid={Boolean(errors.address)}
          autoComplete="street-address"
          placeholder="123 Main St, Springfield"
        />
      </Field>

      <Field
        label="Profile photo"
        htmlFor="avatar"
        error={errors.avatar}
        hint="JPG, PNG, or WebP, up to 2 MB. You can add it later."
      >
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
            id="avatar"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFile}
            className="block w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-brand-soft file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand hover:file:bg-brand-soft/70"
          />
        </div>
      </Field>
    </div>
  )
}
