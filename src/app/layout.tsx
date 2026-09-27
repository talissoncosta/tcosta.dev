import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/site/providers';
import { site } from '@/lib/site';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: '/',
    siteName: site.name,
    type: 'website',
    images: [{ url: '/og/home.png', width: 1200, height: 630, alt: site.title }],
  },
  twitter: { card: 'summary_large_image', images: ['/og/home.png'] },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
