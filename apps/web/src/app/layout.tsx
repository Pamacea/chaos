import type { Metadata } from 'next';
import { Space_Mono, Bebas_Neue } from 'next/font/google';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"

const BASE_URL = 'https://chaos.oalacea.com';

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CHAOS — Glitch & Noise Components',
  description: 'Glitch, noise, and distortion UI components. Copy-paste like shadcn.',
  url: BASE_URL,
  author: {
    '@type': 'Person',
    name: 'Oalacea',
    url: 'https://github.com/Pamacea',
    sameAs: [
      'https://github.com/Pamacea',
      'https://www.linkedin.com/in/yanis-dessaint/',
      'https://x.com/oalacea_',
    ],
    email: 'oalacea@proton.me',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/docs?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const spaceMono = Space_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const bebasNeue = Bebas_Neue({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'CHAOS — Glitch & Noise Components',
  description: 'Glitch, noise, and distortion UI components. Copy-paste like shadcn. 60+ pure CSS components for brutalist, cyberpunk, and VHS aesthetics.',
  keywords: ['ui', 'components', 'glitch', 'noise', 'react', 'nextjs', 'css', 'animation', 'brutalist', 'vhs', 'cyberpunk', 'distortion', 'chaos', 'copy-paste'],
  authors: [{ name: 'Oalacea', url: 'https://github.com/Pamacea' }],
  creator: 'Oalacea',
  publisher: 'Oalacea',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    title: 'CHAOS — Glitch & Noise Components',
    description: 'Glitch, noise, and distortion UI components. Copy-paste like shadcn.',
    siteName: 'CHAOS',
    images: [
      {
        url: '/branding/chaos.png',
        width: 1200,
        height: 630,
        alt: 'CHAOS — Glitch & Noise Components',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHAOS — Glitch & Noise Components',
    description: 'Glitch, noise, and distortion UI components. Copy-paste like shadcn.',
    images: ['/branding/chaos.png'],
    creator: '@oalacea_',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Noise overlay */}
        <div className="noise" aria-hidden="true" />
        {/* Scanlines */}
        <div className="scanlines" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
