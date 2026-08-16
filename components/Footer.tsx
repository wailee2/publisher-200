import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

type SiteSettings = {
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
  instagram?: string;
  twitter?: string;
} | null;

export default function Footer({ settings }: { settings: SiteSettings }) {
  const name = settings?.companyName || "Adire Press";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper mt-24">
      <div className="container-press py-16 grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl mb-3">{name}</p>
          <p className="font-body text-sm text-paper/70 max-w-xs">
            Nigerian voices, bound to last. Fiction, poetry, and non-fiction
            from writers who mean it.
          </p>
        </div>

        <div className="font-body text-sm text-paper/80 space-y-2">
          <p className="uppercase tracking-[0.18em] text-xs text-gold mb-3">
            Contact
          </p>
          {settings?.email && (
            <p>
              <a href={`mailto:${settings.email}`} className="hover:text-rust">
                {settings.email}
              </a>
            </p>
          )}
          {settings?.phone && <p>{settings.phone}</p>}
          {settings?.address && <p>{settings.address}</p>}
          <div className="flex gap-4 pt-2">
            {settings?.instagram && (
              <a href={settings.instagram} className="hover:text-rust">
                Instagram
              </a>
            )}
            {settings?.twitter && (
              <a href={settings.twitter} className="hover:text-rust">
                Twitter/X
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="uppercase tracking-[0.18em] text-xs text-gold mb-3">
            Stay in the loop
          </p>
          <NewsletterForm dark />
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-press py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-paper/50 font-body">
          <p>© {year} {name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-paper">About</Link>
            <Link href="/book-catalog" className="hover:text-paper">Catalog</Link>
            <Link href="/contact" className="hover:text-paper">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
