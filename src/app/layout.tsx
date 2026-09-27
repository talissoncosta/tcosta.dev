import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Providers } from "@/components/site/providers";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: { default: "UI Lab", template: "%s · UI Lab" },
  description: "Small, fluid, animated React components — built in public.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-white font-sans text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <Providers>
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <header className="flex items-center justify-between py-6">
              <Link href="/" className="font-semibold tracking-tight">
                UI Lab
              </Link>
              <span className="text-sm text-neutral-500">fluid components, built in public</span>
            </header>
            <main className="pb-24">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
