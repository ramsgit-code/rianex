import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { translatedMetadata } from "@/lib/seo";

// Traduccion de /cookies. El texto que vincula es el castellano: si se cambia
// aquel, se cambia este en el mismo PR.
export const metadata: Metadata = translatedMetadata(
  "/cookies",
  "en",
  "Cookie policy: which cookies we use and how to manage them",
  "How the Rianex website uses cookies and similar technologies, and how to accept or reject them."
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

export default function CookiePolicyPage() {
  return (
    <PageShell tag="Legal" title="Cookie policy">
      <div className="max-w-2xl">
        <p className="mb-6 text-sm text-muted">
          Last updated: September 2026. This is a translation of the{" "}
          <a href="/cookies" hrefLang="es" className={link}>
            Spanish policy
          </a>
          , which is the binding version.
        </p>

        <H>1. What cookies are</H>
        <P>
          A cookie is a small text file that a website stores in your browser. We also use
          similar technologies such as local storage (localStorage). They are used to remember
          your preferences and to measure how the site is used.
        </P>

        <H>2. Cookies we use</H>
        <P>
          <strong className="text-foreground">Technical (necessary).</strong> They store your
          language preference and the state of the cookie notice using local storage. They are
          essential for the site to work and do not require consent.
        </P>
        <P>
          <strong className="text-foreground">First-party analytics.</strong> We record the pages
          visited and a random session identifier, which is deleted when you close the tab, to
          learn which content works. It is not matched with your contact details or shared with
          third parties for advertising. It is only enabled if you accept.
        </P>
        <P>
          <strong className="text-foreground">Third-party analytics.</strong> If you accept, we
          use Google Analytics (Google Ireland Ltd.) to know how many people visit the site and
          which pages they view. It sets the cookies _ga and _ga_&lt;ID&gt;, which last up to 2
          years. It runs in consent mode (Consent Mode v2): until you accept, it stores no
          identifier on your device, and advertising signals are always disabled. If you reject,
          it sets no cookies.
        </P>
        <P>
          <strong className="text-foreground">Support chat.</strong> If you accept, the
          GoHighLevel chat is loaded, which sets its own third-party cookies to manage the
          conversation. See that provider&rsquo;s policy for details.
        </P>
        <P>
          If you reject, none of the three is enabled: the site keeps working with the technical
          cookies only.
        </P>

        <H>3. How to manage cookies</H>
        <P>
          You can accept or reject non-essential cookies from the notice shown when you enter
          the site. You can also set your browser to block or delete cookies at any time. Bear
          in mind that disabling some cookies may affect how the site works.
        </P>

        <H>4. Changes</H>
        <P>
          We may update this cookie policy. The version in force will always be published on
          this page. If you have any questions, write to us at{" "}
          <a href={`mailto:${EMAIL}`} className={link}>
            {EMAIL}
          </a>
          .
        </P>
      </div>
    </PageShell>
  );
}
