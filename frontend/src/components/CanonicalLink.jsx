import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const SITE_ORIGIN = 'https://dentistsearchhub.com'

// Routes that are part of the app rather than the directory. They are
// disallowed in robots.txt too; this marks them noindex as well, since
// robots.txt only stops crawling — a URL linked from elsewhere can still
// get indexed without ever being fetched.
const NOINDEX_PREFIXES = [
  '/login',
  '/register',
  '/dashboard',
  '/admin',
  '/forgot-password',
  '/reset-password',
]

function upsertTag(selector, create, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  return el
}

/**
 * Keeps <link rel="canonical"> in sync with the current route.
 *
 * A single static canonical in index.html would be worse than none at all:
 * every route is served the same HTML, so it would tell crawlers that each
 * dentist's profile is a duplicate of the homepage.
 *
 * Query strings are deliberately dropped. /search?q=toronto&page=3 and
 * /search?specialty=Orthodontics are the same page with different filters,
 * and every combination is a URL — left uncanonicalised they multiply into
 * effectively infinite duplicates of one page.
 */
export default function CanonicalLink() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')

    upsertTag('link[rel="canonical"]', () => {
      const el = document.createElement('link')
      el.setAttribute('rel', 'canonical')
      return el
    }, { href: `${SITE_ORIGIN}${path}` })

    const isPrivate = NOINDEX_PREFIXES.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`)
    )

    upsertTag('meta[name="robots"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('name', 'robots')
      return el
    }, { content: isPrivate ? 'noindex, nofollow' : 'index, follow' })
  }, [pathname])

  return null
}
