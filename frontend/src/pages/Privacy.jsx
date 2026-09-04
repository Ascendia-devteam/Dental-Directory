import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-3xl text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink">
          <p>
            This policy explains what information Dental Directory collects when you
            create a professional profile, and how it's used.
          </p>

          <section>
            <h2 className="font-display text-lg text-ink">What we collect</h2>
            <p className="mt-2">
              Username, email, password, name, degree, specialty, license number, bio,
              a profile photo, and — if you choose to add them — practice locations
              (address, phone, website, hours). Your personal phone and address are
              collected separately from any practice locations you add.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-ink">What's public vs. private</h2>
            <p className="mt-2">
              Your name, degree, specialty, bio, license number (as entered), services,
              and any practice locations you add are shown on your public profile once
              your account is published and reviewed. Your personal phone number,
              personal address, and login email are private — used only to verify your
              account, contact you about your listing, and inform you about our
              services. They are never shown to the public.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-ink">How we store it</h2>
            <p className="mt-2">
              Data is stored with Supabase, our database and authentication provider.
              Access to private fields is restricted at the database level to you and
              our administrators — it isn't just hidden in the interface.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-ink">Your choices</h2>
            <p className="mt-2">
              You can edit or remove most profile details, add or remove practice
              locations, and unpublish your listing at any time from your dashboard. To
              request deletion of your account entirely, contact us.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
