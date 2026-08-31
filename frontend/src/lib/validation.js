// Validations shared across the registration steps.
// Each function returns an error message, or null if the value is valid.

export const validateUsername = (v) => {
  const value = (v || '').trim()
  if (!value) return 'Enter a username.'
  if (value.length < 3) return 'Use at least 3 characters.'
  if (value.length > 30) return '30 characters maximum.'
  if (!/^[a-z0-9_]+$/.test(value))
    return 'Only lowercase letters, numbers, and underscores.'
  return null
}

export const validateEmail = (v) => {
  const value = (v || '').trim()
  if (!value) return 'Enter your email.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
    return 'That email is not in a valid format.'
  return null
}

export const validatePassword = (v) => {
  if (!v) return 'Enter a password.'
  if (v.length < 8) return 'Use at least 8 characters.'
  if (!/[0-9]/.test(v)) return 'Include at least one number.'
  if (!/[a-zA-Z]/.test(v)) return 'Include at least one letter.'
  return null
}

export const validateRequired = (v, label) =>
  (v || '').trim() ? null : `${label} is required.`

export const validatePhone = (v) => {
  const value = (v || '').trim()
  if (!value) return 'Enter a contact phone number.'
  if (!/^[+]?[\d\s()-]{7,20}$/.test(value))
    return 'That phone number does not look valid.'
  return null
}

export const MAX_AVATAR_BYTES = 2 * 1024 * 1024 // 2 MB

export const validateAvatar = (file) => {
  if (!file) return null // the photo is optional
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
    return 'Unsupported format. Use JPG, PNG, or WebP.'
  if (file.size > MAX_AVATAR_BYTES) return 'The image exceeds 2 MB.'
  return null
}
