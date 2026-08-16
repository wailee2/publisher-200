import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/queries";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Adire Press",
  description: "Get in touch with Adire Press — submissions, services, and press.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <div className="container-press py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="marginalia">Get in touch</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">
            Let&apos;s talk
          </h1>
          <p className="font-body text-ink/70 leading-relaxed max-w-md mb-10">
            Submitting a manuscript, asking about editorial services, or
            reaching out for press — this reaches our editorial team
            directly.
          </p>

          <dl className="space-y-4 font-body text-sm">
            {settings?.email && (
              <div>
                <dt className="text-slate">Email</dt>
                <dd>
                  <a href={`mailto:${settings.email}`} className="text-rust hover:underline">
                    {settings.email}
                  </a>
                </dd>
              </div>
            )}
            {settings?.phone && (
              <div>
                <dt className="text-slate">Phone</dt>
                <dd className="text-ink">{settings.phone}</dd>
              </div>
            )}
            {settings?.address && (
              <div>
                <dt className="text-slate">Office</dt>
                <dd className="text-ink">{settings.address}</dd>
              </div>
            )}
          </dl>

          <div className="mt-10 border-l-2 border-gold pl-5">
            <p className="font-body text-sm text-ink/70">
              Submitting a manuscript? Include a one-page synopsis and the
              first three chapters. We read every submission — response
              time is typically 6–8 weeks.
            </p>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
