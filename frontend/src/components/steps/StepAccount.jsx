import { useState } from 'react'
import Field from '../ui/Field'
import Input from '../ui/Input'
import { supabase } from '../../lib/supabase'
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from '../../lib/validation'

export default function StepAccount({ values, onChange, errors, setErrors }) {
  const [checking, setChecking] = useState(false)
  const [usernameFree, setUsernameFree] = useState(null)

  // Calls the username_available RPC when the field loses focus.
  const checkUsername = async () => {
    const formatError = validateUsername(values.username)
    if (formatError) {
      setUsernameFree(null)
      return
    }
    setChecking(true)
    const { data, error } = await supabase.rpc('username_available', {
      candidate: values.username.trim().toLowerCase(),
    })
    setChecking(false)
    if (error) return
    setUsernameFree(data)
    setErrors((prev) => ({
      ...prev,
      username: data ? null : 'That username is already taken.',
    }))
  }

  const field = (name, validator) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => onChange(name, e.target.value),
    onBlur: () => setErrors((prev) => ({ ...prev, [name]: validator(values[name]) })),
    invalid: Boolean(errors[name]),
  })

  return (
    <div className="space-y-5">
      <Field
        label="Username"
        htmlFor="username"
        error={errors.username}
        hint={
          checking
            ? 'Checking availability…'
            : usernameFree
              ? 'Available.'
              : 'This will be your public address: /dr/your-username'
        }
      >
        <Input
          {...field('username', validateUsername)}
          onChange={(e) => {
            setUsernameFree(null)
            onChange('username', e.target.value.toLowerCase())
          }}
          onBlur={checkUsername}
          autoComplete="username"
          placeholder="dr_martinez"
        />
      </Field>

      <Field label="Email" htmlFor="email" error={errors.email}>
        <Input
          {...field('email', validateEmail)}
          type="email"
          autoComplete="email"
          placeholder="you@practice.com"
        />
      </Field>

      <Field
        label="Password"
        htmlFor="password"
        error={errors.password}
        hint="At least 8 characters, with letters and numbers."
      >
        <Input
          {...field('password', validatePassword)}
          type="password"
          autoComplete="new-password"
        />
      </Field>

      <Field label="Confirm password" htmlFor="confirm" error={errors.confirm}>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          value={values.confirm}
          onChange={(e) => onChange('confirm', e.target.value)}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              confirm:
                values.confirm === values.password
                  ? null
                  : 'Passwords do not match.',
            }))
          }
          invalid={Boolean(errors.confirm)}
        />
      </Field>
    </div>
  )
}
