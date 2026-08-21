"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";

type SiteSettings = {
  companyName?: string;
  logo?: { asset?: { _ref: string } };
} | null;

const NAV_LINKS = [
  { href: "/", label: "Home" },
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

  return (
    <span className="inline-flex flex-col items-start border border-border rounded px-2 py-1 leading-none mb-8">
      <span className="text-[8px] tracking-[0.2em] text-text-muted">THE</span>
      <span className="font-display text-small font-extrabold text-primary tracking-tight">ODOH</span>
      <span className="text-[7px] tracking-[0.15em] text-text-muted">PUBLISHERS</span>
    </span>
  );
}

function HamburgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="relative w-9 h-9 flex items-center justify-center"
    >
      <span
        className={`absolute h-0.5 w-8 bg-text-primary rounded-full transition-transform duration-400 ease-out -translate-y-1.25`}
      />
      <span
        className={`absolute h-0.5 w-8 bg-text-primary rounded-full transition-transform duration-400 ease-out translate-y-1.25`}
      />
    </button>
  );
}

export default function Header({ settings }: { settings: SiteSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsOverHero] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Header stays transparent near the very top, then goes solid once
  // the user scrolls past a small threshold: 10px below md, 20px at md+.
  useEffect(() => {
    const MD_BREAKPOINT = 768; // Tailwind's `md`

    const getThreshold = () =>
      window.innerWidth >= MD_BREAKPOINT ? 30 : 10;

    let threshold = getThreshold();

    const handleScroll = () => {
      setIsOverHero(window.scrollY < threshold);
    };

    const handleResize = () => {
      threshold = getThreshold();
      handleScroll();
    };

    handleScroll(); // set initial state on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 container-press py-3 md:py-4 transition-colors duration-300 ease-out
                  ${
                    isAtTop
                      ? "bg-transparent border-b border-transparent"
                      : "bg-bg border-b border-border"
                  }`}
    >
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <Logo settings={settings} />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body transition-colors ${
                isAtTop
                  ? "text-white hover:text-white/80"
                  : "text-text-primary hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn-primary hidden md:inline-flex">
          Contact
        </Link>

        <div className="md:hidden">
          <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
        </div>
      </div>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 md:hidden 
                    transition-[opacity,backdrop-filter] duration-700 ease-in-out
                    ${isOpen ? "opacity-100 backdrop-blur-sm pointer-events-auto" : "opacity-0 backdrop-blur-none pointer-events-none"}`}
      />

      <div
        className={`fixed top-4 right-4 left-4 z-50 md:hidden grid 
                    transition-[grid-template-rows] duration-500 ease-out
                    ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden min-h-0">
          <div className="relative ">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-7 w-8 h-8 flex items-center justify-center"
            >
              <span className="relative block w-5 h-5">
                <span className="absolute inset-0 rotate-45 top-1/2 h-0.5 w-8 bg-text-primary rounded-full" />
                <span className="absolute inset-0 -rotate-45 top-1/2 h-0.5 w-8 bg-text-primary rounded-full" />
              </span>
            </button>

            <div className="bg-bg rounded-2xl shadow-2xl p-6 pt-17 ">

              <p className="text-xsmall hidden font-semibold tracking-wide text-text-primary mb-2">
                Navigation
              </p>
              
              <div className="border-t hidden border-dashed border-text-primary/60 mb-8" />

              <nav aria-label="Mobile" className="flex flex-col gap-3 ">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-large font-medium text-text-primary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                  
                ))}

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="font-display text-large font-medium text-text-primary hover:text-primary transition-colors block"
                >
                  Contact us
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}