import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Providers } from "@/components/site/providers";
import { SiteNav } from "@/components/site/site-nav";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tcosta.dev"),
  title: { default: "Talisson Costa — Frontend Design Engineer", template: "%s · Talisson Costa" },
  description: "Frontend design engineer. Small, fluid, animated React components — built in public.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-white font-sans text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <Providers>
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <header className="flex items-center justify-between gap-4 py-6">
              <Link href="/" className="font-semibold tracking-tight">
                Talisson Costa
              </Link>
              <SiteNav />
            </header>
            <main className="pb-24">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
