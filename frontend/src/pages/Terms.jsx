import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { H2, H3, P, UL, Hr } from '../lib/richtext'

export default function Terms() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-3xl text-ink">Terms and Conditions</h1>
        <p className="mt-2 text-sm text-muted">
          Effective Date: 4 September 2026 · Last Updated: 4 September 2026
        </p>

        <div className="mt-8 rounded-md border border-line bg-brand-soft p-4">
          <p className="text-sm font-semibold leading-relaxed text-ink">
            THESE TERMS CONTAIN A BINDING ARBITRATION PROVISION AND A CLASS-ACTION WAIVER
            (SECTION 18) AND A LIMITATION OF LIABILITY (SECTION 14). THEY AFFECT YOUR LEGAL
            RIGHTS.
          </p>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-ink">
            THIS WEBSITE IS A DIRECTORY AND LISTING PLATFORM ONLY. WE DO NOT PROVIDE DENTAL,
            MEDICAL, OR HEALTH-CARE SERVICES. WE DO NOT VERIFY THE IDENTITY, LICENCE,
            QUALIFICATIONS, INSURANCE, OR FITNESS TO PRACTISE OF ANY PROFESSIONAL LISTED ON
            THE SITE. WE ARE NOT A PARTY TO ANY RELATIONSHIP, APPOINTMENT, TREATMENT, OR
            TRANSACTION BETWEEN A VISITOR AND A PROFESSIONAL.
          </p>
        </div>

        <div className="mt-8">
          <H2>1. Acceptance</H2>
          <P>
            These Terms and Conditions (the "**Terms**") form a legally binding agreement
            between you and the operator of this website ("**we**," "**us**," "**our**")
            governing access to and use of this website and all related pages and features
            (the "**Site**").
          </P>
          <P>
            By accessing, browsing, registering for, or submitting content to the Site, you
            agree to these Terms and to our [Privacy Policy](/privacy), which is
            incorporated by reference. **If you do not agree, do not use the Site.**
          </P>
          <P>
            Professionals accept these Terms by ticking the acceptance box at registration.
            We record and retain the date, time, IP address, and version of the Terms
            accepted as evidence of acceptance.
          </P>

          <Hr />
          <H2>2. Definitions</H2>
          <UL
            items={[
              '**"Professional"** — a dentist, dental practice, clinic, or other dental provider who registers an account and publishes a profile on the Site.',
              '**"Visitor"** — any person who accesses the Site without registering. **Visitors are not required to create an account.**',
              '**"User," "you"** — any Professional or Visitor.',
              '**"User Content"** — any name, specialty, licence or registration number, telephone number, address, photograph, website link, description, or other material submitted by a Professional.',
              '**"Profile"** — a Professional’s public page on the Site.',
            ]}
          />

          <Hr />
          <H2>3. Eligibility</H2>
          <P>
            Registration is limited to persons aged **18 or over** with the legal capacity
            to enter a binding contract. If you register on behalf of a practice, clinic, or
            other entity, you represent and warrant that you are **authorised to bind that
            entity**, and "you" means both you and that entity.
          </P>

          <Hr />
          <H2>4. Nature of the Service</H2>

          <H3>4.1 A Passive Directory</H3>
          <P>
            The Site allows Professionals to publish Profiles and allows Visitors to search
            and view them. We function solely as a **neutral, passive technical
            intermediary and host**. We are not the author, publisher, speaker, or
            originator of User Content, and we do not adopt, endorse, or ratify it.
            **Registration is currently provided free of charge; we may introduce paid
            features in future on notice.**
          </P>

          <H3>4.2 No Verification of Any Kind</H3>
          <P>
            **We do not verify, validate, authenticate, screen, vet, investigate, endorse,
            approve, or guarantee any Professional, Profile, or item of User Content.** In
            particular, **we do not verify**:
          </P>
          <UL
            items={[
              'the identity of any Professional, or that a person is who they claim to be;',
              'any **licence or registration number**, which is **collected and published exactly as entered, without any check against any registry or regulator**;',
              'whether any licence, registration, certification, accreditation, degree, or insurance is valid, current, unrestricted, suspended, revoked, or lapsed — either at registration or at any time afterwards;',
              'the accuracy of any name, business name, address, telephone number, website link, specialty, or service description; or',
              'whether a Professional is competent, insured, or suitable for any purpose.',
            ]}
          />
          <P>
            **We expressly disclaim any duty to verify, re-verify, monitor, screen, update,
            or investigate any Professional or credential. No statement on the Site, and no
            act or omission by us, creates such a duty.**
          </P>

          <H3>4.3 No Professional Relationship or Advice</H3>
          <P>
            Nothing on the Site constitutes dental, medical, diagnostic, clinical, legal, or
            other professional advice. **No dentist–patient, doctor–patient, or professional
            relationship is created between you and us.** Always consult a qualified,
            licensed provider about any dental or medical condition, and never disregard or
            delay professional advice because of anything on the Site. **In an emergency,
            contact your local emergency services immediately.**
          </P>

          <H3>4.4 We Are Not a Party to Your Dealings</H3>
          <P>
            Any contact, appointment, consultation, treatment, payment, or dispute between a
            Visitor and a Professional is **exclusively between those parties**. We do not
            arrange, facilitate, supervise, participate in, or take any commission from it,
            and we have **no liability whatsoever** in connection with it — including for
            any act, omission, error, negligence, malpractice, injury, misrepresentation,
            non-performance, or fraud by any User.
          </P>
          <P>
            **Any reliance on a Profile is entirely at your own risk and on your own
            independent judgement. We strongly recommend that you independently verify a
            Professional's licence, credentials, insurance, and standing with the relevant
            regulatory authority before engaging them.**
          </P>

          <H3>4.5 No Messaging or Booking</H3>
          <P>
            The Site provides **no messaging, enquiry, appointment-booking, or payment
            function**. We do not transmit communications between Visitors and
            Professionals and do not receive, store, or process any patient or health
            information. **Do not attempt to submit patient records, clinical data,
            symptoms, treatment histories, or any other health information through the
            Site.**
          </P>

          <Hr />
          <H2>5. Accounts and Security</H2>
          <P>
            You agree to provide accurate, current, and complete registration information
            and to keep it updated. You are **solely responsible** for the confidentiality
            of your credentials and for **all activity under your account**, whether or not
            authorised by you. Notify us immediately of any unauthorised use or suspected
            breach. **We are not liable for any loss arising from your failure to safeguard
            your credentials.** You may not sell, transfer, share, or assign your account.
          </P>

          <Hr />
          <H2>6. Professional Representations and Warranties</H2>
          <P>
            If you register as a Professional, you represent, warrant, and covenant on a
            **continuing basis** that:
          </P>
          <UL
            items={[
              'you hold **all licences, registrations, certifications, permits, and insurance** required by law and by every applicable regulatory or professional body in every jurisdiction in which you practise, and that each is **valid, current, and in good standing**;',
              'all information in your Profile — including your **licence or registration number** — is **true, accurate, current, complete, and not misleading**, and you will update it promptly if it changes;',
              'you will **notify us immediately and remove or correct your Profile** if any licence or registration is suspended, revoked, restricted, or expires, or if you become subject to disciplinary proceedings;',
              'your Profile and any claims in it comply with all applicable **laws, regulations, professional-conduct rules, dental-advertising standards, and consumer-protection laws**, including restrictions on claims of specialisation, superiority, or guaranteed outcomes;',
              'you own or hold all necessary rights, licences, consents, and releases for all User Content you submit, including every photograph and logo, and including the **written consent of every identifiable person appearing in any image**;',
              'you will **not upload any patient image, patient record, clinical data, or other health information**; and',
              'you are not subject to any legal, regulatory, or professional prohibition on advertising your services.',
            ]}
          />
          <P>
            **You bear sole and exclusive responsibility and liability for your Profile and
            its consequences. We accept none.**
          </P>

          <Hr />
          <H2>7. Prohibited Conduct</H2>
          <P>You must not, and must not permit any third party to:</P>
          <UL
            items={[
              'submit false, fraudulent, misleading, or impersonating information, or claim credentials you do not hold;',
              'create or claim a Profile for a Professional or business without authorisation;',
              'publish defamatory, harassing, obscene, discriminatory, threatening, or unlawful content;',
              'upload health information or personal information of any third party without lawful consent;',
              '**scrape, crawl, harvest, index, data-mine, or systematically extract data from the Site** by automated or manual means;',
              'copy, reproduce, republish, resell, or use Site data to build a competing or derivative directory;',
              'use information obtained from the Site to send unsolicited marketing to Professionals;',
              'upload malware or malicious code, or attempt to gain unauthorised access to the Site, its servers, accounts, or data;',
              'interfere with, disrupt, overload, or circumvent any security, access-control, or rate-limiting measure;',
              'reverse engineer, decompile, or disassemble any part of the Site; or',
              'use the Site for any unlawful purpose or in breach of any applicable law.',
            ]}
          />

          <Hr />
          <H2>8. User Content — Licence and Responsibility</H2>

          <H3>8.1 You Retain Ownership and Grant Us a Licence</H3>
          <P>
            You retain ownership of your User Content. By submitting it, you grant us a
            **worldwide, non-exclusive, royalty-free, fully paid, sublicensable,
            transferable licence** to host, store, cache, reproduce, adapt, reformat,
            translate, publish, display, and distribute it for the purposes of operating and
            promoting the Site, including allowing it to be indexed by search engines. This
            licence continues in respect of content already cached, indexed, or republished
            by third parties after removal from the Site.
          </P>

          <H3>8.2 You Are Solely Responsible</H3>
          <P>
            **You are solely responsible for your User Content, its accuracy, its legality,
            and all consequences of its publication.** We do not pre-screen User Content.
          </P>

          <H3>8.3 Our Rights — Reserved, Not Assumed</H3>
          <P>
            **We reserve, but do not assume, the right** to review, monitor, refuse, edit,
            disable, suspend, or remove any User Content or Profile at our sole discretion,
            at any time, with or without notice or reason, and **without liability**. Any
            exercise or non-exercise of this right does not make us the publisher of User
            Content, creates no duty to review or monitor, and does not waive any protection
            available to us, including under **47 U.S.C. § 230**.
          </P>

          <H3>8.4 Feedback</H3>
          <P>
            Any suggestion or feedback you send us may be used without restriction,
            compensation, or obligation of confidentiality.
          </P>

          <Hr />
          <H2>9. Links to Practice Websites and Third-Party Sites</H2>
          <P>
            A Profile may link to a Professional's own website or to third-party mapping
            services. **We do not control and are not responsible for the content,
            accuracy, availability, security, practices, or policies of any third-party
            website, and a link does not imply endorsement.** Once you leave the Site, your
            dealings are solely with that third party.
          </P>

          <Hr />
          <H2>10. Intellectual Property</H2>
          <P>
            The Site, its design, software, code, databases, structure, compilation, text,
            graphics, logos, and trade marks (excluding User Content) are owned by us or our
            licensors and are protected by copyright, trade mark, database, and other laws.
            We grant you a **limited, revocable, non-exclusive, non-transferable licence**
            to access and use the Site for its intended purpose. All other rights are
            reserved. **The compilation and arrangement of Profiles constitutes our
            protected database; extraction or reuse of any substantial part is
            prohibited.**
          </P>

          <Hr />
          <H2>11. Copyright Complaints (DMCA)</H2>
          <P>
            If you believe content on the Site infringes your copyright, send written
            notice to our designated agent at [the address published on our Contact
            page](/contact) containing: (a) your physical or electronic signature; (b)
            identification of the work claimed to be infringed; (c) identification of the
            allegedly infringing material and its location on the Site; (d) your contact
            details; (e) a statement of good-faith belief that the use is unauthorised; and
            (f) a statement, under penalty of perjury, that the notice is accurate and that
            you are authorised to act on the owner's behalf.
          </P>
          <P>
            We may remove allegedly infringing material and will **terminate the accounts of
            repeat infringers**. Counter-notices may be submitted under 17 U.S.C. §
            512(g).
          </P>

          <Hr />
          <H2>12. Removal and Correction Requests</H2>
          <P>
            Any person who believes a Profile is inaccurate, unauthorised, impersonating, or
            unlawful may contact us at [the address published on our Contact
            page](/contact). We will review such reports and may remove or suspend the
            Profile at our discretion, but **we are under no obligation to investigate,
            adjudicate, or resolve any dispute between Users**, and any action or inaction
            on our part creates no duty and no liability.
          </P>

          <Hr />
          <H2>13. Disclaimer of Warranties</H2>
          <P>
            **TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SITE, ALL PROFILES, AND
            ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY
            KIND, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ANY WARRANTY OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT,
            ACCURACY, COMPLETENESS, OR CURRENCY.**
          </P>
          <P>
            **WE DO NOT WARRANT THAT: (a) ANY PROFILE, LICENCE NUMBER, CREDENTIAL, OR ITEM
            OF USER CONTENT IS ACCURATE, TRUE, CURRENT, OR LAWFUL; (b) ANY PROFESSIONAL IS
            LICENSED, QUALIFIED, INSURED, COMPETENT, OR SUITABLE FOR YOUR NEEDS; (c) THE
            SITE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; OR (d) ANY DEFECT
            WILL BE CORRECTED. NO ADVICE OR INFORMATION OBTAINED FROM US CREATES ANY
            WARRANTY NOT EXPRESSLY STATED HERE.**
          </P>

          <Hr />
          <H2>14. Limitation of Liability</H2>
          <P>**TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:**</P>
          <P>
            **(a) WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS,
            REVENUE, DATA, GOODWILL, REPUTATION, BUSINESS, OR OPPORTUNITY, ARISING OUT OF OR
            RELATING TO THE SITE OR THESE TERMS, WHETHER IN CONTRACT, TORT, NEGLIGENCE,
            STRICT LIABILITY, STATUTE, OR OTHERWISE, EVEN IF ADVISED OF THE POSSIBILITY OF
            SUCH DAMAGES.**
          </P>
          <P>
            **(b) WE SHALL NOT BE LIABLE FOR ANY PERSONAL INJURY, DEATH, ILLNESS,
            MALPRACTICE, MISDIAGNOSIS, TREATMENT OUTCOME, FINANCIAL LOSS, OR OTHER HARM
            ARISING FROM ANY ACT OR OMISSION OF ANY PROFESSIONAL OR OTHER USER, OR FROM ANY
            RELIANCE ON ANY PROFILE, LICENCE NUMBER, CREDENTIAL, OR USER CONTENT.**
          </P>
          <P>
            **(c) OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO
            THE SITE OR THESE TERMS SHALL NOT EXCEED ONE HUNDRED US DOLLARS (USD 100), OR,
            IF GREATER, THE TOTAL AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE
            EVENT GIVING RISE TO THE CLAIM.**
          </P>
          <P>
            **(d) THESE LIMITATIONS APPLY EVEN IF ANY LIMITED REMEDY FAILS OF ITS ESSENTIAL
            PURPOSE AND ARE A FUNDAMENTAL BASIS OF THE BARGAIN BETWEEN US.**
          </P>
          <P>
            Some jurisdictions do not permit certain exclusions or limitations; there, the
            above applies only to the extent permitted. **Nothing in these Terms excludes or
            limits liability for fraud, wilful misconduct, death or personal injury caused
            by our own negligence, or any other liability that cannot lawfully be excluded —
            including, for Canadian consumers, rights under applicable consumer-protection
            legislation and, for Quebec residents, rights under the Consumer Protection
            Act.**
          </P>

          <Hr />
          <H2>15. Release</H2>
          <P>
            **To the fullest extent permitted by law, you release and forever discharge us
            and our officers, directors, employees, and agents from all claims, demands,
            damages, losses, and liabilities of every kind, known or unknown, arising out of
            or connected with any dispute between you and any Professional, Visitor, or
            other third party.** If you are a California resident, you waive **California
            Civil Code § 1542**, which provides that a general release does not extend to
            claims the creditor does not know or suspect to exist in their favour at the
            time of executing the release and which, if known, would have materially
            affected the settlement.
          </P>

          <Hr />
          <H2>16. Indemnification</H2>
          <P>
            **You agree to defend, indemnify, and hold harmless us and our parents,
            subsidiaries, affiliates, officers, directors, employees, agents, licensors, and
            service providers from and against all claims, demands, actions, proceedings,
            investigations, liabilities, damages, losses, judgments, fines, penalties,
            settlements, costs, and expenses (including reasonable legal fees) arising out
            of or relating to:**
          </P>
          <UL
            items={[
              'your User Content or Profile;',
              'your use of or access to the Site;',
              'your breach of these Terms, the Privacy Policy, or any applicable law;',
              'any misrepresentation regarding your licence, credentials, or qualifications;',
              'your violation of any third-party right, including privacy, publicity, intellectual-property, or data-protection rights;',
              'any dispute between you and another User; or',
              'any dental or other service you provided or received.',
            ]}
          />
          <P>
            We may assume the exclusive defence and control of any indemnified matter at
            your expense, and you agree to cooperate. **This obligation survives
            termination.**
          </P>

          <Hr />
          <H2>17. Suspension and Termination</H2>
          <P>
            **We may suspend, restrict, or terminate your account or Profile, and remove any
            User Content, at any time, with or without notice or cause, at our sole
            discretion, and without liability.** You may close your account at any time by
            contacting [the address published on our Contact page](/contact). On termination
            your licence to use the Site ends immediately. **Sections 4, 8.1, 8.3, 10, 13,
            14, 15, 16, 18, and 19 survive.** We may retain information as described in the
            Privacy Policy.
          </P>

          <Hr />
          <H2>18. Governing Law and Dispute Resolution</H2>

          <H3>18.1 Governing Law</H3>
          <P>
            These Terms are governed by the laws of the jurisdiction in which the operator
            of the Site is established, without regard to conflict-of-laws rules. The UN
            Convention on Contracts for the International Sale of Goods does not apply.
            **Nothing here deprives a consumer of the protection of mandatory laws of their
            country or province of residence.**
          </P>

          <H3>18.2 Informal Resolution First</H3>
          <P>
            Before commencing any proceeding, you agree to contact us at [the address
            published on our Contact page](/contact) with a written description of the
            dispute and to attempt resolution in good faith for **sixty (60) days**.
          </P>

          <H3>18.3 Binding Arbitration</H3>
          <P>
            **If informal resolution fails, any dispute arising out of or relating to these
            Terms or the Site shall be resolved by final and binding individual arbitration
            before a single arbitrator, administered by an established arbitral institution
            agreed between the parties under its then-current rules, conducted in English
            and, where permitted, on documents and by remote hearing.** Judgment on the
            award may be entered in any court of competent jurisdiction.
          </P>
          <P>
            **Exceptions:** either party may bring an individual claim in small-claims
            court, and either party may seek injunctive relief in court for infringement or
            misuse of intellectual property or unauthorised access to the Site.
          </P>

          <H3>18.4 Class-Action Waiver</H3>
          <P>
            **ALL CLAIMS MUST BE BROUGHT IN AN INDIVIDUAL CAPACITY ONLY AND NOT AS A
            PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, CONSOLIDATED, OR
            REPRESENTATIVE PROCEEDING. THE ARBITRATOR MAY NOT CONSOLIDATE CLAIMS OR PRESIDE
            OVER ANY REPRESENTATIVE PROCEEDING.** If this waiver is held unenforceable as to
            a particular claim, that claim proceeds in court while all others remain in
            arbitration.
          </P>

          <H3>18.5 Time Limit</H3>
          <P>
            **Any claim must be brought within one (1) year after it arises, or it is
            permanently barred**, except where a longer period is required by mandatory
            law.
          </P>

          <H3>18.6 Canadian and EEA/UK Residents</H3>
          <P>
            Where mandatory law prohibits pre-dispute arbitration agreements or
            class-action waivers with consumers, Sections 18.3 and 18.4 do not apply to
            you, and disputes may be brought before the courts of your place of residence.
          </P>

          <Hr />
          <H2>19. General</H2>
          <UL
            items={[
              '**Entire agreement.** These Terms and the Privacy Policy are the entire agreement between you and us and supersede all prior understandings.',
              '**Changes.** We may amend these Terms by posting a revised version with a new "Last Updated" date. **Continued use after the changes take effect constitutes acceptance.** Where required by law, we will give advance notice.',
              '**Severability.** Any invalid or unenforceable provision shall be modified to the minimum extent necessary or severed; the remainder continues in force.',
              '**No waiver.** Failure to enforce any provision is not a waiver of it.',
              '**Assignment.** You may not assign these Terms without our written consent; we may assign freely, including on a merger or sale of assets.',
              '**Force majeure.** We are not liable for any failure or delay caused by events beyond our reasonable control, including hosting or network failures.',
              '**No agency.** No partnership, joint venture, employment, franchise, or agency relationship is created. **No Professional is our employee, agent, representative, or partner.**',
              '**Third parties.** These Terms confer no rights on third parties, except that our affiliates and service providers may enforce Sections 13–16 as intended beneficiaries.',
              '**Language.** These Terms are drafted in English; any translation is for convenience only and the English version prevails.',
              '**Notices.** We may give notice by email to your registered address or by posting on the Site.',
            ]}
          />

          <Hr />
          <H2>20. Contact</H2>
          <P>
            **The operator of this Site**
            <br />
            Email: the address published on our [Contact page](/contact)
          </P>

          <Hr />
          <p className="mt-8 text-sm text-muted">© 2026. All rights reserved.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
