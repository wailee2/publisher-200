import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/queries";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Odoh Publishers",
  description:
    "The Odoh Publishers is a Nigerian publishing house offering full-service publishing, editing, design, and manuscript consultation for authors.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <html lang="en" className={inter.variable}>
      <body className='  antialiased max-w-375 mx-auto '>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
