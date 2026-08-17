import Link from "next/link";

type SiteSettings = {
  companyName?: string;
} | null;

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/book-catalog", label: "Catalog" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ settings }: { settings: SiteSettings }) {
  const name = settings?.companyName || "Adire Press";

  return (
    <header className="border-b border-ink/10 bg-paper/95 backdrop-blur sticky top-0 z-40">
      <div className="container-press flex items-center justify-between h-20">
        <Link
          href="/"
          className="font-display text-xl md:text-2xl font-semibold tracking-tight text-ink"
        >
          {name}
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm tracking-wide text-ink/80 hover:text-rust transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn-primary hidden md:inline-flex">
          Submit a manuscript
        </Link>
        {/* Mobile nav: kept intentionally simple — a client can extend this
            with a drawer/menu component later without touching page content. */}
        <nav aria-label="Primary mobile" className="flex md:hidden gap-4">
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-xs tracking-wide text-ink/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
