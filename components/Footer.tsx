import Link from "next/link";

type SiteSettings = {
  companyName?: string;
  footerHeadline?: string;
  footerSubtext?: string;
  footerButtonText?: string;
  email?: string;
  phone?: string;
  address?: string;
  facebook?: string;
  whatsapp?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
} | null;

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  const socials = [
    { label: "Facebook", href: settings?.facebook },
    { label: "Whatsapp", href: settings?.whatsapp },
    { label: "Instagram", href: settings?.instagram },
    { label: "LinkedIn", href: settings?.linkedin },
    { label: "X/Twitter", href: settings?.twitter },
  ].filter((s) => s.href);

  return (
    <footer className="bg-bg border-t border-border mt-24">
      <div className="container-press py-16 md:py-24">
        <span className="inline-flex flex-col items-start border border-border rounded px-2 py-1 leading-none mb-8">
          <span className="text-[8px] tracking-[0.2em] text-text-muted">THE</span>
          <span className="font-display text-sm font-extrabold text-primary tracking-tight">ODOH</span>
          <span className="text-[7px] tracking-[0.15em] text-text-muted">PUBLISHERS</span>
        </span>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary max-w-lg">
          {settings?.footerHeadline || "Let's build something great"}
        </h2>
        <p className="font-body text-text-secondary mt-3 max-w-md">
          {settings?.footerSubtext ||
            "Odoh helps authors turn ideas into results through design, strategy, and innovation."}
        </p>
        <Link href="/contact" className="btn-pill-primary mt-6">
          {settings?.footerButtonText || "Get started"}
          <span className="btn-pill-icon">↗</span>
        </Link>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-16">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.14em] text-text-muted mb-4">
              Quick Links
            </p>
            <ul className="space-y-2 font-body text-sm text-text-primary">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary">About us</Link></li>
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary">Portfolio</Link></li>
            </ul>

            <p className="font-body text-xs uppercase tracking-[0.14em] text-text-muted mb-4 mt-8">
              Legal
            </p>
            <ul className="space-y-2 font-body text-sm text-text-primary">
              <li><Link href="/terms" className="hover:text-primary">Terms of service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy policy</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.14em] text-text-muted mb-4">
              Contact
            </p>
            <ul className="space-y-2 font-body text-sm text-text-primary">
              {settings?.email && (
                <li><a href={`mailto:${settings.email}`} className="hover:text-primary">{settings.email}</a></li>
              )}
              {settings?.address && <li className="whitespace-pre-line">{settings.address}</li>}
              {settings?.phone && <li>{settings.phone}</li>}
            </ul>
          </div>

          {socials.length > 0 && (
            <div>
              <p className="font-body text-xs uppercase tracking-[0.14em] text-text-muted mb-4">
                Follow
              </p>
              <ul className="space-y-2 font-body text-sm text-text-primary">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="hover:text-primary">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-text-muted font-body">
          <p>All right reserve @{year}</p>
          <p>Site by Wailee</p>
        </div>
      </div>
    </footer>
  );
}
