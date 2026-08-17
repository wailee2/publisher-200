import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";

type SiteSettings = {
  companyName?: string;
  logo?: { asset?: { _ref: string } };
} | null;

const NAV_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
];

function Logo({ settings }: { settings: SiteSettings }) {
  const logoUrl = settings?.logo
    ? urlForImage(settings.logo).width(80).height(80).url()
    : null;

  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt={settings?.companyName || "The Odoh Publishers"}
        width={40}
        height={40}
        className="h-9 w-auto"
      />
    );
  }

  // Text-based fallback logo, styled to match the Figma boxed mark —
  // swap for an uploaded logo in Site Settings at any time.
  return (
    <span className="inline-flex flex-col items-start border border-border rounded px-2 py-1 leading-none">
      <span className="text-[8px] tracking-[0.2em] text-text-muted">THE</span>
      <span className="font-display text-sm font-extrabold text-primary tracking-tight">
        ODOH
      </span>
      <span className="text-[7px] tracking-[0.15em] text-text-muted">
        PUBLISHERS
      </span>
    </span>
  );
}

export default function Header({ settings }: { settings: SiteSettings }) {
  return (
    <header className="bg-bg border-b border-border sticky top-0 z-40">
      <div className="container-press flex items-center justify-between h-20">
        <Link href="/" aria-label="Home">
          <Logo settings={settings} />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-text-primary hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn-primary hidden md:inline-flex !py-2.5 !px-5">
          Contact
        </Link>

        {/* Minimal mobile nav — a client can extend this with a drawer
            later without touching any page content. */}
        <nav aria-label="Primary mobile" className="flex md:hidden items-center gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-xs text-text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary !py-2 !px-4 !text-xs">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
