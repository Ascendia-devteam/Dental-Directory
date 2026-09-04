import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { H2, H3, P, UL, Table, Hr } from '../lib/richtext'

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-3xl text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">
          Effective Date: 4 September 2026 · Last Updated: 4 September 2026
        </p>

        <div className="mt-8">
          <H2>1. Introduction and Acceptance</H2>
          <P>
            This website ("**we**," "**us**," "**our**") operates an online directory that
            allows dentists, dental practices, and clinics ("**Professionals**") to register
            and publish a public profile, and allows members of the public ("**Visitors**";
            together with Professionals, "**Users**," "**you**") to search and view those
            profiles. This Privacy Policy applies to this website and to any subdomain or
            service that links to it (the "**Site**").
          </P>
          <P>
            **Visitors do not need an account and are not asked to register, log in, or
            submit any personal information in order to search the Site.**
          </P>
          <P>
            By accessing or using the Site, you acknowledge that you have read and
            understood this Privacy Policy. If you register as a Professional, you accept
            this Privacy Policy and our [Terms and Conditions](/terms) by ticking the
            acceptance box at registration. **We record and retain the date, time, IP
            address, and version of the documents you accepted as evidence of that
            acceptance.** If you do not agree, do not register or use the Site.
          </P>
          <P>
            This Privacy Policy describes our information-handling practices. It does not
            create rights enforceable by third parties and does not expand any obligation we
            may otherwise have under applicable law. The contractual terms governing your
            use of the Site — including the limitation of our liability and your
            indemnification obligations — are set out in our Terms and Conditions, which are
            incorporated here by reference.
          </P>

          <Hr />
          <H2>2. Your Responsibility for Information You Submit</H2>
          <P>**This Section is material to your use of the Site. Please read it in full.**</P>

          <H3>2.1 You Are Solely Responsible for What You Submit</H3>
          <P>
            You are **solely and exclusively responsible** for any information you submit,
            upload, or publish through the Site — including your name, specialty, licence or
            registration number, telephone number, practice address, profile photograph, and
            any other profile content (collectively, "**User Content**"). This includes
            responsibility for:
          </P>
          <UL
            items={[
              'the **accuracy, completeness, currency, and legality** of all User Content;',
              'your **legal right and authority** to submit it, including any consent, licence, or release required from any third party;',
              'compliance with all **laws, regulations, professional-conduct rules, licensing requirements, and dental-advertising standards** applicable to you; and',
              'any **claim, loss, damage, penalty, or liability** arising from that User Content.',
            ]}
          />

          <H3>2.2 No Verification of Any Kind</H3>
          <P>
            **We do not verify, validate, authenticate, screen, vet, endorse, approve, or
            guarantee any Professional or any User Content.**
          </P>
          <P>
            **Licence and registration numbers.** Where our registration form requests a
            licence or registration number, that number is collected and published **exactly
            as entered by the Professional, without any independent verification**. We do
            not check it against any registry, regulator, or professional body. We do not
            confirm that it is valid, current, unrestricted, or that it belongs to the
            person who submitted it. We do not monitor whether it later lapses, is
            suspended, or is revoked.
          </P>
          <P>
            We likewise do not verify the identity of any Professional, any qualification,
            degree, accreditation, insurance, or professional standing, or the accuracy of
            any name, business name, address, telephone number, or service description.
          </P>
          <P>
            **We expressly disclaim any duty to verify, re-verify, monitor, screen, update,
            or investigate any Professional or any credential. Nothing on the Site shall be
            construed as creating such a duty.**
          </P>
          <P>
            We act solely as a **neutral, passive technical platform** that hosts and
            displays information supplied by Professionals. We are not the author,
            publisher, speaker, or originator of User Content.
          </P>

          <H3>2.3 No Professional, Dental, Medical, or Legal Advice</H3>
          <P>
            Nothing on the Site constitutes dental, medical, diagnostic, clinical, legal, or
            other professional advice, and **no dentist–patient or professional relationship
            is created between you and us**. Always seek the advice of a qualified, licensed
            provider regarding any dental or medical condition, and never disregard or delay
            seeking such advice because of anything you read on the Site. **In an emergency,
            contact your local emergency services immediately.**
          </P>
          <P>
            **Any decision you make in reliance on a profile — including any decision to
            contact or visit a Professional — is made entirely at your own risk and on your
            own independent judgement. We strongly recommend that you verify a
            Professional's licence and standing with the relevant regulatory authority
            before engaging them.**
          </P>

          <H3>2.4 Information About Other People</H3>
          <P>
            If you submit personal information relating to any other individual — for
            example a colleague, employee, or staff member named in your profile — you
            represent and warrant that you have obtained **all consents required by
            applicable law** to provide that information to us and to permit its
            publication. **You bear sole responsibility for obtaining such consent. We are
            entitled to rely on your representation without independent inquiry.**
          </P>

          <H3>2.5 Do Not Submit Patient or Health Information</H3>
          <P>
            **Do not submit patient records, clinical data, diagnoses, treatment histories,
            insurance information, or any other health information through the Site.** The
            Site has no messaging, enquiry, or appointment-booking function, and is neither
            designed nor configured to receive such information.
          </P>
          <P>
            **We are not a "covered entity" and do not act as a "business associate" under
            HIPAA (45 C.F.R. Parts 160 and 164), nor as a health-information custodian under
            PHIPA, PIPEDA, or any comparable health-privacy legislation.** If you submit such
            information notwithstanding this prohibition, you do so voluntarily and entirely
            at your own risk, and you release us from any resulting liability to the maximum
            extent permitted by law.
          </P>

          <H3>2.6 Your Profile Is Public</H3>
          <P>
            Information you submit for your profile — your name, specialty, licence number,
            practice address, and photograph — is **published on the Site and is visible to
            anyone**. It may be indexed by search engines, cached, copied, scraped, or
            republished by third parties beyond our control, and copies may remain
            accessible after you delete your profile. **We have no control over, and accept
            no responsibility for, the use of publicly published information by any third
            party.**
          </P>
          <P>
            Your **contact telephone number is not published** on your public profile. See
            Section 3.1.
          </P>

          <H3>2.7 Indemnification and Limitation of Liability</H3>
          <P>
            Your obligation to indemnify us, and the limitation of our liability to you, are
            set out in **Sections 15 and 17 of our [Terms and Conditions](/terms)** and apply
            to all matters described in this Privacy Policy.
          </P>

          <Hr />
          <H2>3. Information We Collect</H2>
          <H3>3.1 Information Professionals Provide at Registration</H3>
          <Table
            head={['Field', 'Published on your profile?', 'Purpose']}
            rows={[
              ['Full name', '**Yes**', 'Identifying you in the directory'],
              ['Specialty', '**Yes**', 'Allowing Visitors to search by discipline'],
              [
                'Licence / registration number',
                '**Yes — as entered, unverified**',
                'Displayed as part of your profile',
              ],
              [
                'Practice address',
                '**Yes, including on a map**',
                'Allowing Visitors to locate your practice',
              ],
              ['Profile photograph', '**Yes**', 'Illustrating your profile'],
              [
                'Contact telephone number',
                '**No**',
                'Authenticating your account, contacting you about your profile, and informing you about our services',
              ],
              [
                'Email address and password',
                '**No**',
                'Account creation, sign-in, and account-related notices (passwords are stored in hashed form)',
              ],
            ]}
          />

          <H3>3.2 Information Collected Automatically From All Visitors</H3>
          <P>
            Our web server and hosting provider automatically record standard technical
            information when any page is requested, including IP address, browser type and
            language, device and operating-system information, access times, pages viewed,
            search terms entered on the Site, and the referring website address. This
            information is used for security, abuse prevention, troubleshooting, and basic
            operational statistics.
          </P>
          <P>
            **We do not use Google Analytics, advertising pixels, ad networks,
            behavioural-tracking tools, or any third-party analytics or advertising service
            on the Site.**
          </P>

          <H3>3.3 Cookies</H3>
          <P>
            We use **strictly necessary cookies only** — for sign-in, session management,
            and security. We do not use analytics, advertising, or third-party tracking
            cookies. See **Annex A**. Because we use only strictly necessary cookies, no
            consent banner is required under the ePrivacy Directive; if we introduce
            non-essential cookies in future, we will request consent first.
          </P>

          <H3>3.4 What We Do Not Collect</H3>
          <P>
            For the avoidance of doubt, **we do not**: require or permit Visitors to create
            accounts; operate any messaging, enquiry, or booking system; collect
            payment-card or financial information (registration is free of charge); operate
            any review or rating system; run contests or sweepstakes; accept job
            applications through the Site; perform background checks; or obtain personal
            information about you from data brokers or other third-party sources.
          </P>

          <Hr />
          <H2>4. How We Use Information</H2>
          <P>We use the information we collect to:</P>
          <UL
            items={[
              'create, authenticate, and administer Professional accounts;',
              'publish and display Professional profiles submitted to the directory;',
              'allow Visitors to search and browse the directory;',
              'contact Professionals by email or telephone regarding their account, their profile, and **our services, features, and upgrades** (see Section 8 for your choices);',
              'respond to enquiries, requests, and complaints sent to us;',
              'maintain the security, integrity, and availability of the Site, and detect, prevent, and investigate fraud, abuse, impersonation, spam, and unauthorised access;',
              'comply with legal, regulatory, and record-keeping obligations; and',
              'establish, exercise, or defend legal claims and enforce our Terms and Conditions.',
            ]}
          />

          <Hr />
          <H2>5. Legal Bases for Processing</H2>
          <P>Where data-protection law requires a legal basis, we rely on the following:</P>
          <Table
            head={['Purpose', 'Legal basis']}
            rows={[
              ['Creating an account and publishing a profile', 'Performance of a contract'],
              ['Security, abuse prevention, and service improvement', 'Legitimate interests'],
              [
                'Contacting Professionals about our services and upgrades',
                'Legitimate interests (existing business relationship, B2B)',
              ],
              [
                'Responding to legal process and defending claims',
                'Legal obligation; establishment or defence of legal claims',
              ],
            ]}
          />
          <P>
            Where we rely on legitimate interests, we have assessed that they are not
            overridden by your rights and freedoms. You may object at any time as described
            in Section 12.
          </P>

          <Hr />
          <H2>6. With Whom We Share Information</H2>
          <P>
            **We do not sell, rent, trade, or licence personal information to anyone. We do
            not share personal information with advertisers, data brokers, marketing
            partners, or mailing-list providers.**
          </P>
          <P>We share information only as follows:</P>
          <UL
            items={[
              '**Publicly, through profiles.** The fields marked "published" in Section 3.1 are visible to anyone who visits the Site and may be indexed by search engines.',
              '**Hosting and technical service providers.** Our hosting provider stores the Site and its database on our behalf, and our email provider delivers account notices. These providers process information under contractual confidentiality and security obligations and may not use it for their own purposes.',
              '**Legal and protective disclosures.** In response to a subpoena, warrant, court order, or similar demand, or a request for cooperation from law enforcement or a regulatory authority; to establish or exercise our legal rights; to defend against legal claims; or as otherwise required by law. We may also disclose information where we believe it appropriate to investigate or prevent suspected illegal activity, fraud, impersonation, or other wrongdoing, to protect the rights, property, or safety of our company, our Users, or others, or to enforce our Terms and Conditions.',
              '**Corporate transactions.** In connection with a merger, acquisition, financing, reorganisation, or sale of assets, information may be transferred as a business asset. Any acquirer will remain bound by this Privacy Policy unless and until you are notified of a change.',
            ]}
          />
          <P>
            **Aggregated and de-identified information** — which does not identify any
            individual — may be used and shared without restriction for statistical,
            research, and business purposes.
          </P>

          <Hr />
          <H2>7. Third-Party Websites</H2>
          <P>
            A Professional's profile may contain a link to the practice's own website.
            Clicking it takes you to a site we do not operate or control. **We are not
            responsible for the content, accuracy, availability, security, practices, or
            privacy policies of any third-party website, and the presence of a link does not
            imply endorsement.** Once you leave the Site, this Privacy Policy no longer
            applies. We recommend reviewing the privacy statement of any website you visit.
          </P>

          <Hr />
          <H2>8. Your Choices</H2>
          <UL
            items={[
              '**Providing information.** You may decline to provide information, but a Professional cannot register or maintain a profile without the fields marked as required at registration.',
              '**Email from us.** Professionals may opt out of non-essential email at any time using the unsubscribe link in any such message or by emailing us. Please allow **up to ten (10) days** for processing. We will continue to send essential account and service notices — security alerts, administrative messages, and changes to our policies — which cannot be opted out of while your account remains open.',
              '**Telephone.** We may call you about your account or profile, or about our services. Tell us at any time if you prefer not to be called and we will note that preference. **We do not send marketing text messages and do not operate any automated calling system.**',
              '**Do Not Track and Global Privacy Control.** Because we operate no tracking or advertising technology and do not sell or share personal information, there is no cross-site tracking to opt out of.',
            ]}
          />

          <Hr />
          <H2>9. Accessing, Updating, and Deleting Your Information</H2>
          <P>
            Professionals may review and update profile information at any time by signing
            in, or by contacting us at the address in Section 19. You may request deletion
            of your account and profile at the same address; we will action verified
            requests within the period required by applicable law.
          </P>
          <P>
            After deletion, your profile is removed from the Site. However, **copies already
            indexed, cached, or copied by search engines or other third parties are outside
            our control**, and you may need to contact those parties directly. We may retain
            limited information as described in Section 10.
          </P>

          <Hr />
          <H2>10. Data Retention</H2>
          <P>
            We retain personal information only as long as necessary for the purposes
            described in this Privacy Policy:
          </P>
          <Table
            head={['Information', 'Retention period']}
            rows={[
              ['Active account and published profile', 'For as long as the account remains open'],
              [
                'Account data after deletion request',
                'Deleted or anonymised within **90 days**, except as noted below',
              ],
              [
                "Record of acceptance of our Terms (date, time, IP, version)",
                '**6 years** after account closure, to evidence consent and defend claims',
              ],
              ['Server and security logs', '**12 months**'],
              ['Correspondence with us', '**3 years** from last contact'],
              [
                'Records required by tax, accounting, or other law',
                'For the statutory period applicable to that record',
              ],
              [
                'Inactive accounts (no sign-in for **36 months**)',
                'We may notify you and, absent a response, delete the account',
              ],
            ]}
          />
          <P>
            Where information must be retained beyond these periods to comply with law,
            resolve a dispute, prevent fraud, or enforce our agreements, we retain only what
            is necessary for that purpose and delete it once it is no longer required.
          </P>

          <Hr />
          <H2>11. How We Protect Information</H2>
          <P>
            We take reasonable physical, technical, and organisational security measures to
            safeguard personal information, including encryption of traffic in transit
            (HTTPS), hashed password storage, access restricted to authorised personnel, and
            server-level protections provided by our hosting provider.
          </P>
          <P>
            **No system, transmission method, or storage medium is completely secure.
            Although we take steps to protect your information, we do not promise — and you
            should not expect — that it will always remain secure. To the maximum extent
            permitted by law, we disclaim liability for unauthorised access to, or
            acquisition, alteration, loss, or disclosure of, information resulting from
            circumstances beyond our reasonable control, including the acts of third
            parties.**
          </P>
          <P>
            You are responsible for maintaining the confidentiality of your account
            credentials and for all activity under your account. Notify us immediately of
            any suspected unauthorised use. Where a security breach creates a real risk of
            significant harm, we will notify affected individuals and the relevant
            authorities as required by applicable law.
          </P>

          <Hr />
          <H2>12. Your Privacy Rights by Region</H2>
          <P>
            To exercise any right below, contact us at the address in Section 19. We will
            take reasonable steps to verify your identity before responding and will reply
            within the period required by applicable law. We do not discriminate against
            anyone for exercising these rights. **Rights of access and deletion are not
            absolute and are subject to statutory exemptions, the rights of others, and our
            legal obligations.**
          </P>

          <H3>12.1 United States</H3>
          <P>
            Residents of California and of other states with comprehensive privacy laws
            (including Virginia, Colorado, Connecticut, Utah, Texas, Oregon, and Montana)
            may have the right to know what personal information we collect and why, to
            access a copy, to correct inaccuracies, to delete personal information, and to
            appeal a refused request.
          </P>
          <P>
            **Categories of personal information we have collected in the preceding 12
            months** (Cal. Civ. Code § 1798.140): identifiers (name, email address,
            telephone number, practice address, IP address); professional or
            employment-related information (specialty, licence number); and internet
            activity information (pages viewed and search terms on the Site).
          </P>
          <P>
            **Sale and sharing.** We do **not** sell personal information, and we do **not**
            share it for cross-context behavioural advertising. Accordingly, no "Do Not Sell
            or Share My Personal Information" mechanism is required, and none is offered.
          </P>
          <P>
            **Shine the Light (Cal. Civ. Code § 1798.83).** We do not disclose personal
            information to third parties for their own direct-marketing purposes.
          </P>
          <P>Authorised agents may submit requests on your behalf with written proof of authorisation.</P>

          <H3>12.2 Canada</H3>
          <P>
            We collect, use, and disclose personal information with your knowledge and
            consent, except where permitted or required by law. You may withdraw consent at
            any time subject to legal and contractual restrictions and reasonable notice;
            **withdrawal may mean we can no longer maintain your profile**. You may request
            access to, and correction of, your personal information.
          </P>
          <P>**Your right of access is not absolute. We may deny access:**</P>
          <UL
            items={[
              'where denial is required or authorised by law;',
              'where granting access would have an unreasonable impact on the privacy of others;',
              'where the information is subject to solicitor-client or litigation privilege;',
              'where disclosure would reveal confidential commercial information;',
              'to protect our rights and property; or',
              'where the request is frivolous or vexatious.',
            ]}
          />
          <P>
            If we deny access or refuse to correct information, we will explain why and
            inform you of your right to complain to the Office of the Privacy Commissioner
            of Canada or the applicable provincial authority (including under Quebec's Law
            25 and the personal-information protection Acts of Alberta and British
            Columbia). Privacy questions and complaints may be directed to our Privacy
            Officer at the address in Section 19.
          </P>

          <H3>12.3 EEA, United Kingdom, and Switzerland</H3>
          <P>
            Where the GDPR or UK GDPR applies, the data controller is the operator of this
            Site, whose contact details appear in Section 19. You have the rights of access,
            rectification, erasure, restriction, portability, objection (including to
            processing based on legitimate interests and to direct marketing), and
            withdrawal of consent at any time without affecting the lawfulness of earlier
            processing. You may lodge a complaint with your local supervisory authority. **We
            do not carry out automated decision-making or profiling that produces legal or
            similarly significant effects.**
          </P>

          <H3>12.4 Other Jurisdictions</H3>
          <P>
            Where other data-protection laws grant you rights in respect of your personal
            information, we will honour them to the extent they apply to us.
          </P>

          <Hr />
          <H2>13. International Transfers</H2>
          <P>
            The Site is hosted by a third-party hosting provider that operates data centres
            in several countries, and your information may be stored and processed in the
            **United States, the European Union, or another country** in which that provider
            operates. **The data-protection laws of those countries may differ from, and may
            be less protective than, the laws of your own country.** Where required, we rely
            on appropriate safeguards for cross-border transfers, such as the European
            Commission's Standard Contractual Clauses. By using the Site or registering a
            profile, you acknowledge that your information may be transferred to, stored in,
            and processed in those jurisdictions.
          </P>

          <Hr />
          <H2>14. Publicly Published Profiles</H2>
          <P>
            Profiles are published for the express purpose of being found by the public and
            by search engines. Anything you place in your profile becomes public and may be
            collected, copied, indexed, or reused by others. **We cannot control who views
            your profile or what third parties do with the information in it, and we accept
            no responsibility for such use.**
          </P>
          <P>
            We reserve, **but do not assume**, the right to review, refuse, edit, suspend, or
            remove any profile or User Content at our sole discretion, at any time, with or
            without notice, and without liability. Any exercise or non-exercise of this
            right does not make us the publisher of User Content, creates no duty to review
            or monitor, and does not waive any protection available to us, including under
            47 U.S.C. § 230.
          </P>

          <Hr />
          <H2>15. Children's Privacy</H2>
          <P>
            The Site is a general-audience service directed at licensed dental professionals
            and the adult public. **Registration is limited to persons aged 18 or over.** We
            do not knowingly collect personal information from children under 13 (or under
            16 in the EEA/UK and other jurisdictions applying that age). If we learn that we
            have collected such information, we will delete it promptly. Parents or
            guardians who believe a child has provided information to us should contact us
            at the address in Section 19.
          </P>

          <Hr />
          <H2>16. No Rights of Third Parties</H2>
          <P>
            This Privacy Policy does not create rights enforceable by any third party and
            does not require the disclosure of any personal information relating to Users.
          </P>

          <Hr />
          <H2>17. Severability and Survival</H2>
          <P>
            If any provision of this Privacy Policy is held invalid, illegal, or
            unenforceable, it shall be modified to the minimum extent necessary or severed,
            and the remaining provisions shall continue in full force. Sections 2, 7, 11, 16,
            and 17 survive the closure of your account.
          </P>

          <Hr />
          <H2>18. Changes to This Privacy Policy</H2>
          <P>
            We may update this Privacy Policy to reflect changes in our practices, services,
            or legal obligations. We will post the revised version with a new "Last Updated"
            date and, where required by law, provide advance notice or obtain your consent.
            **Continued use of the Site after the revised version takes effect constitutes
            acceptance of it.**
          </P>

          <Hr />
          <H2>19. How to Contact Us</H2>
          <P>
            Questions about this Privacy Policy, requests to exercise your rights, and
            privacy complaints should be sent to:
          </P>
          <P>
            **The operator of this Site**
            <br />
            Email: the address published on our [Contact page](/contact)
            <br />
            Attention: Privacy Officer
          </P>
          <P>
            We also act as our designated agent for copyright notices under Section 12 of
            our Terms and Conditions at the same email address.
          </P>

          <Hr />
          <H2>Annex A — Cookies</H2>
          <P>
            A cookie is a small text file stored on your device. *Session cookies* expire
            when you close your browser; *persistent cookies* remain for a set period.
          </P>
          <P>**We use strictly necessary cookies only:**</P>
          <Table
            head={['Cookie type', 'Purpose', 'Duration']}
            rows={[
              [
                'Session / authentication',
                'Keeps a Professional signed in during a session',
                'Session, or until sign-out',
              ],
              ['Security', 'Protects against cross-site request forgery and abuse', 'Session'],
              ['Preference', 'Remembers basic settings such as language', 'Up to 12 months'],
            ]}
          />
          <P>
            Usernames, passwords, and account-related values stored in cookies are encrypted
            or hashed.
          </P>
          <P>
            **We do not use analytics cookies, advertising cookies, tracking pixels, web
            beacons, clear GIFs, ad networks, or any third-party tracking technology.**
          </P>
          <P>
            **Managing cookies.** You may delete or block cookies through your browser
            settings (see the browser's "Help" menu). **If you block strictly necessary
            cookies, you will not be able to sign in to a Professional account**, although
            you may still browse the directory.
          </P>

          <Hr />
          <p className="mt-8 text-sm text-muted">© 2026. All rights reserved.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
