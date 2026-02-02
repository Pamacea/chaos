import { Metadata } from 'next';

const BASE_URL = 'https://chaos.oalacea.com';
const SITE_NAME = 'CHAOS — Glitch & Noise Components';
const DEFAULT_DESCRIPTION = 'Glitch, noise, and distortion UI components. Copy-paste like shadcn.';
const DEFAULT_OG_IMAGE = '/branding/chaos.png';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  path = '',
  noindex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${BASE_URL}${path}`;
  const ogImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: ['ui', 'components', 'glitch', 'noise', 'react', 'nextjs', 'css', 'animation', 'brutalist', 'vhs', 'cyberpunk'],
    authors: [{ name: 'Oalacea', url: 'https://github.com/oalacea' }],
    creator: 'Oalacea',
    publisher: 'Oalacea',
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@oalacea',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    alternates: {
      canonical: url,
    },
  };
}

export const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  'glitch-text': 'RGB split glitch text effect with customizable intensity and colors. Pure CSS, no JavaScript.',
  'glitch-button': 'Button with glitch effect on hover. Adds visual chaos to your CTA.',
  'chaos-button': 'Chaotic button with debris and broken pieces. Maximum visual impact.',
  'flicker-text': 'Text that randomly flickers like a broken neon sign.',
  'neon-button': 'Glowing neon button with customizable colors. Perfect for cyberpunk themes.',
  'neon-badge': 'Luminous status badge with neon glow effect.',
  'noise-canvas': 'Animated noise canvas background. Creates a film grain texture.',
  'scanlines': 'CRT horizontal scanlines overlay. Retro monitor effect.',
  'warning-tape': 'Scrolling warning banner tape. Hazard stripe pattern.',
  'cursor-follower': 'Custom cursor that follows the mouse with lag and trail effects.',
};
