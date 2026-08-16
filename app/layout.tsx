import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans  } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/queries";


const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adire Press — Nigerian voices, bound to last",
  description:
    "Adire Press is a Lagos-based publishing house working with Nigerian writers on fiction, poetry, and non-fiction that lasts.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${plexSans.variable} font-body bg-paper text-ink antialiased`}
      >
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
