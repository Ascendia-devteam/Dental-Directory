import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export default function Terms() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-3xl text-ink">Terms and Conditions</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink">
          <p>
            By creating a professional profile on Dental Directory, you agree to the
            following terms.
          </p>

          <section>
            <h2 className="font-display text-lg text-ink">Accuracy of information</h2>
            <p className="mt-2">
              You confirm that all information you submit — including your name, degree,
              specialty, license number, and any other profile details — is accurate and
              that you are legally authorized to practice under the credentials you list.
              You must be at least 18 years old to create an account.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-ink">License numbers</h2>
            <p className="mt-2">
              License numbers are collected for our records and displayed on your public
              profile exactly as you enter them. We do not independently verify licenses
              with any licensing board. Patients should independently confirm a
              practitioner's credentials before receiving care.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-ink">Account review</h2>
            <p className="mt-2">
              Every new account is reviewed by our team before it can appear in public
              search results. We may unpublish or reject a listing at our discretion if
              submitted information appears inaccurate or violates these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-ink">Your contact information</h2>
            <p className="mt-2">
              Your personal phone number and address are used to verify your account,
              contact you about your listing, and inform you about our services. They
              are never published on your public profile. Practice locations you add
              separately are public, since that is how patients find you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-ink">Changes</h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of the
              directory after a change constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
