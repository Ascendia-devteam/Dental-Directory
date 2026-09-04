import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export default function Contact() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-3xl text-ink">Contact</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink">
          Questions about your listing, a request to correct or remove a profile, a
          privacy request, or a copyright notice under our{' '}
          <a href="/terms" className="text-brand underline underline-offset-2">
            Terms and Conditions
          </a>{' '}
          — contact details will be published here soon.
        </p>
      </main>
      <SiteFooter />
    </div>
  )
}
