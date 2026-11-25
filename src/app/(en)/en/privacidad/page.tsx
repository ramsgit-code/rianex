import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { translatedMetadata } from "@/lib/seo";

// Traduccion de /privacidad. El texto que vincula es el castellano: si se
// cambia aquel, se cambia este en el mismo PR.
export const metadata: Metadata = translatedMetadata(
  "/privacidad",
  "en",
  "Privacy policy: what data we process and your rights",
  "How Rianex processes personal data under the GDPR and the Spanish data protection act (LOPDGDD)."
);

const EMAIL = "hola@rianex.es";

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-10 font-display text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 leading-relaxed text-foreground-muted">{children}</p>;
}

const link = "text-accent-text underline underline-offset-2";

export default function PrivacyPage() {
  return (
    <PageShell tag="Legal" title="Privacy policy">
      <div className="max-w-2xl">
        <p className="mb-6 text-sm text-muted">
          Last updated: November 2026. This is a translation of the{" "}
          <a href="/privacidad" hrefLang="es" className={link}>
            Spanish policy
          </a>
          , which is the binding version.
        </p>

        <H>1. Data controller</H>
        <P>
          The controller of your data is Ramiro Pérez Rodero (&ldquo;Rianex&rdquo;), tax ID (NIF)
          70818243R, with address at Paseo Estación 14, Ávila, Spain. You can get in touch at any
          time at{" "}
          <a href={`mailto:${EMAIL}`} className={link}>
            {EMAIL}
          </a>
          .
        </P>

        <H>2. Data we process</H>
        <P>
          We process the data you give us voluntarily through the assessment form and other
          contact channels: name, email, phone, company, website, country and the information
          about your business and goals that you choose to share. We may also process technical
          browsing data (see the{" "}
          <a href="/en/cookies" className={link}>
            cookie policy
          </a>
          ).
        </P>

        <H>3. Purpose</H>
        <P>
          We use your data to: (i) handle your assessment or contact request and prepare a
          proposal; (ii) send you follow-up communications related to the services you asked
          about (nurturing); and (iii) manage the business relationship if we decide to work
          together.
        </P>

        <H>4. Legal basis</H>
        <P>
          The legal basis is your consent (Art. 6.1.a GDPR), which you give by ticking the
          acceptance box on the form, and the taking of pre-contractual steps at your request
          (Art. 6.1.b GDPR). You can withdraw your consent at any time, without affecting the
          lawfulness of the processing carried out before.
        </P>

        <H>5. Retention</H>
        <P>
          We keep your data while there is mutual interest or a business relationship and, once
          it ends, for the periods required by law. If we do not end up working together, the
          data will be deleted when it is no longer needed for the purposes described.
        </P>

        <H>6. Recipients</H>
        <P>
          To provide the service we use technology providers that act as data processors:
          GoHighLevel (CRM and chat), Vercel (web hosting), Supabase (database), Google
          (Analytics, automatic translation of content and site verification in Search Console)
          and Anthropic (the AI assistant that, after the form, asks you a few questions to
          prepare the consultation: it receives your answers and the form data the conversation
          needs).
          These providers may be located outside the European Economic Area, in which case
          transfers are covered by the safeguards set out in the GDPR (standard contractual
          clauses). We do not share your data with third parties for commercial purposes.
        </P>

        <H>7. Your rights</H>
        <P>
          You can exercise your rights of access, rectification, erasure, objection, restriction
          of processing and portability by writing to{" "}
          <a href={`mailto:${EMAIL}`} className={link}>
            {EMAIL}
          </a>
          . If you believe the processing does not comply with the law, you can lodge a complaint
          with the Spanish Data Protection Agency (
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className={link}>
            www.aepd.es
          </a>
          ).
        </P>

        <H>8. Security</H>
        <P>
          We apply appropriate technical and organisational measures to protect your data
          against unauthorised access, loss or alteration.
        </P>

        <H>9. Changes</H>
        <P>
          We may update this policy to reflect changes in the law or in the service. The version
          in force will always be published on this page.
        </P>
      </div>
    </PageShell>
  );
}
