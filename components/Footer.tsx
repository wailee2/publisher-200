import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import { PillButton } from "@/components/PillButton";

type SiteSettings = {
  companyName?: string;
  logo?: { asset?: { _ref: string } };
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

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of service" },
  { href: "/privacy", label: "Privacy policy" },
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

  return (
    <span className="inline-flex flex-col items-start border border-border rounded px-2 py-1 leading-none mb-8">
      <span className="text-[8px] tracking-[0.2em] text-text-muted">THE</span>
      <span className="font-display text-small font-extrabold text-primary tracking-tight">ODOH</span>
      <span className="text-[7px] tracking-[0.15em] text-text-muted">PUBLISHERS</span>
    </span>
  );
}

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
    <footer className="bg-bg">
      <div className="container-press section-space-y pt-[9em] pb-[2em] ">
        <div className="container-layout  ">
          <div className="col-span-2">
            <Logo settings={settings} />
          </div>

          <div className="col-start-4 col-span-full section-space-y   ">
            <div className="space-y-[0.5em]">
              <h2 className="max-w-md">
                {settings?.footerHeadline || "Let's build something great"}
              </h2>

              <div>
                <p className="  max-w-md">
                  {settings?.footerSubtext ||
                    "Odoh helps authors turn ideas into results through design, strategy, and innovation."}
                </p>
                <PillButton href="/contact" variant="pill-primary" className="mt-5">
                  {settings?.footerButtonText || "Get started"}
                </PillButton>
              </div>
            </div>

            <div className="space-y-[2.5em] ">
              <div className="md:hidden sm:max-w-80">
                <span className="footer-label">
                  Contact
                </span>
                <ul className="footer-list space-y-3 ">
                  {settings?.email && (
                    <li className="">
                      <a href={`mailto:${settings.email}`} className="underline ">
                        {settings.email}
                      </a>
                    </li>
                  )}
                  {settings?.phone && 
                    <li>
                      <a href={`tel:${settings.phone}`} className="underline">
                        {settings.phone}
                      </a>
                    </li>
                  }
                  {settings?.address && 
                    <li className="whitespace-pre-line ">
                      {settings.address}
                    </li>
                  }
                </ul>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-[2.5em] gap-y-[2.5em]  ">
                <div className="">
                  <span className=" footer-label ">
                    Quick Links
                  </span>
                  <ul className="footer-list">
                    {QUICK_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="hover:text-primary">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {socials.length > 0 && (
                  <div>
                    <span className="footer-label">
                      Follow
                    </span>
                    <ul className="footer-list">
                      {socials.map((s) => (
                        <li key={s.label}>
                          <a href={s.href} className="footer-list">{s.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="md:block hidden">
                  <span className="footer-label">
                    Contact
                  </span>
                  <ul className="footer-list space-y-3 ">
                    {settings?.email && (
                      <li className="">
                        <a href={`mailto:${settings.email}`} className="underline  break-all">
                          {settings.email}
                        </a>
                      </li>
                    )}
                    {settings?.phone && 
                      <li>
                        <a href={`tel:${settings.phone}`} className="underline">
                          {settings.phone}
                        </a>
                      </li>
                    }
                    {settings?.address && 
                      <li className="whitespace-pre-line mb-1b">
                        {settings.address}
                      </li>
                    }
                  </ul>
                </div>

                <div className="">
                  <span className=" footer-label ">
                    Legal
                  </span>
                  <ul className="footer-list">
                    {LEGAL_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="hover:text-primary">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-[2em] uppercase flex  items-end justify-between gap-3 text-xsmall text-text-muted">
              <p>All right reserve @{year}</p>
              <a 
                href='https://wa.me/qr/DEVSJBVEXRRGG1' 
                className="footer-list" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Site by Wailee
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
