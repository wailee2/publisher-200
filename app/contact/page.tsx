import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/queries";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — The Odoh Publishers",
  description: "Get in touch with The Odoh Publishers — submissions, services, and press.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <div className="container-press py-16 md:py-24">
      <p className="eyebrow">Contact</p>
      <h1 className="font-display text-4xl md:text-6xl font-bold text-text-primary mb-16">
        Let&apos;s talk about
        <br />
        what&apos;s next.
      </h1>

      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-2xl font-semibold text-text-primary mb-8">
            Contact Details
          </h2>
          <dl className="space-y-6 font-body text-sm">
            {settings?.email && (
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-text-muted mb-1">
                  Email &amp; Support
                </dt>
                <dd>
                  <a href={`mailto:${settings.email}`} className="text-text-primary underline hover:text-primary">
                    {settings.email}
                  </a>
                </dd>
              </div>
            )}
            {settings?.phone && (
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-text-muted mb-1">Phone</dt>
                <dd className="text-text-primary">{settings.phone}</dd>
              </div>
            )}
            {settings?.address && (
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-text-muted mb-1">Address</dt>
                <dd className="text-text-primary whitespace-pre-line">{settings.address}</dd>
              </div>
            )}
          </dl>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
