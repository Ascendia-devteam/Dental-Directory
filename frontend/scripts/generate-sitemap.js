/**
 * Builds public/sitemap.xml from the live directory, at build time.
 *
 * Runs before `vite build` so the generated file gets copied into dist/
 * along with the rest of public/.
 *
 * On the thin-content filter below: 301 of the ~309 live listings are a
 * single sentence with no photo, imported from a purchased lead list.
 * Submitting all of them is the pattern search engines read as a low-value
 * directory, and that judgement lands on the whole domain rather than just
 * the weak URLs. So a profile has to clear a substance bar to be submitted.
 * It stays crawlable and linked either way — this only controls what we
 * actively hand to Google. Loosen the two constants as profiles get filled.
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE_ORIGIN = 'https://dentistsearchhub.com'

// --- thin-content threshold -------------------------------------------
const MIN_BIO_LENGTH = 200 // characters
const A_PHOTO_IS_ENOUGH = true // a real photo alone qualifies a listing

const STATIC_PATHS = ['/', '/search', '/terms', '/privacy', '/contact']

function readEnv() {
  // Vite loads .env for the app, but this is a plain node script, so parse
  // it here rather than pulling in dotenv for four lines of work.
  const env = {}
  try {
    for (const line of readFileSync(join(ROOT, '.env'), 'utf8').split('\n')) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (match) env[match[1]] = match[2].trim()
    }
  } catch {
    /* fall through to process.env, e.g. in CI */
  }
  return {
    url: process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL,
    key: process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY,
  }
}

function xmlEscape(value) {
  return value.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]
  )
}

function urlEntry(path, lastmod) {
  const loc = `  <url>\n    <loc>${xmlEscape(SITE_ORIGIN + path)}</loc>`
  const mod = lastmod ? `\n    <lastmod>${lastmod.slice(0, 10)}</lastmod>` : ''
  return `${loc}${mod}\n  </url>`
}

const { url, key } = readEnv()
if (!url || !key) {
  console.error('sitemap: missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — skipping')
  process.exit(0) // never fail the build over the sitemap
}

const supabase = createClient(url, key)

// The anon key only sees published + verified rows under RLS, which is
// exactly the set that belongs in a sitemap.
const { data: profiles, error } = await supabase
  .from('profiles')
  .select('username, bio, avatar_url, updated_at')

if (error) {
  console.error(`sitemap: query failed (${error.message}) — skipping`)
  process.exit(0)
}

const substantial = (p) =>
  (A_PHOTO_IS_ENOUGH && p.avatar_url) || (p.bio?.length ?? 0) >= MIN_BIO_LENGTH

const included = (profiles ?? []).filter(substantial)

const body = [
  ...STATIC_PATHS.map((p) => urlEntry(p)),
  ...included.map((p) => urlEntry(`/dr/${p.username}`, p.updated_at)),
].join('\n')

writeFileSync(
  join(ROOT, 'public', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
)

const skipped = (profiles?.length ?? 0) - included.length
console.log(
  `sitemap: ${STATIC_PATHS.length} static + ${included.length} profiles ` +
    `(${skipped} held back as too thin)`
)
