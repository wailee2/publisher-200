import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/queries";
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with The Odoh Publishers.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <section className="container-press section-space-y page-space-y page-pt">
      <div className="container-layout  ">
        <div className="col-span-2">
          <p className="eyebrow">Contact</p>
        </div>

        <div className="col-start-4 col-span-7 ">
          <h1 className="">
            Let&apos;s talk about
            <br />
            what&apos;s next.
          </h1>
        </div>
      </div>

      <div className='h-[0.05em] bg-border'/>

      <div className="grid md:grid-cols-2 gap-[3em]">
        <div>
          <h4 className=" mb-8">
            Contact Details
          </h4>
          <dl className="space-y-6 ">
            {settings?.email && (
              <div>
                <dt className="text-xsmall uppercase tracking-[0.14em] text-text-muted mb-1">
                  Email &amp; Support
                </dt>
                <dd>
                  <a href={`mailto:${settings.email}`} className=" underline hover:text-primary">
                    {settings.email}
                  </a>
                </dd>
              </div>
            )}
            {settings?.phone && (
              <div>
                <dt className="text-xsmall uppercase tracking-[0.14em] text-text-muted mb-1">Phone</dt>
                <dd className="text-text-primary">{settings.phone}</dd>
              </div>
            )}
            {settings?.address && (
              <div>
                <dt className="text-xsmall uppercase tracking-[0.14em] text-text-muted mb-1">Address</dt>
                <dd className="text-text-primary whitespace-pre-line">{settings.address}</dd>
              </div>
            )}
          </dl>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
