import type { Metadata } from 'next';
import { Space_Mono, Bebas_Neue } from 'next/font/google';
import './globals.css';

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
  title: 'CHAOS — Glitch & Noise Components',
  description: 'Glitch, noise, and distortion UI components. Copy-paste like shadcn.',
  keywords: ['ui', 'components', 'glitch', 'noise', 'react', 'nextjs'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${bebasNeue.variable}`}>
      <body>
        {/* Noise overlay */}
        <div className="noise" aria-hidden="true" />
        {/* Scanlines */}
        <div className="scanlines" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
