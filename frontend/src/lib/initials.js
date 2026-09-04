const TITLE_PREFIX = /^(dr|dra|mr|mrs|ms|prof)\.?\s+/i

export function initial(fullName) {
  if (!fullName) return null
  const stripped = fullName.trim().replace(TITLE_PREFIX, '')
  return (stripped || fullName)[0]?.toUpperCase() ?? null
}
