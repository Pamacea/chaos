import { MetadataRoute } from 'next';

// Component list extracted from docs page
const COMPONENTS = [
  'neon-button', 'neon-badge', 'neon-progress', 'neon-toggle', 'neon-alert', 'neon-tabs', 'neon-divider', 'glowing-border',
  'cyber-input', 'cyber-loader', 'cyber-modal', 'cyber-avatar', 'cyber-slider', 'cyber-tooltip', 'hologram-card', 'data-grid', 'spec-grid',
  'glitch-text', 'glitch-button', 'chaos-button', 'glitch-image', 'char-glitch', 'screen-distortion', 'warning-tape',
  'blood-drip', 'dead-button', 'giant-layers', 'deeper-button',
  'terminal-output', 'ascii-art', 'countdown-display',
  'flicker-text', 'distortion-text', 'falling-text', 'typing-text', 'reveal-text', 'strike-reveal', 'rotate-text',
  'breathing-text', 'handwritten-text', 'scramble-text', 'stroke-text', 'word-by-word-reveal', 'shadow-glitch', 'split-text',
  'scattered-nav', 'vertical-nav', 'brutal-nav', 'progress-dots', 'scroll-indicator', 'corner-nav', 'minimal-nav', 'timeline-nav',
  'noise-canvas', 'particle-field', 'glow-orbs', 'gradient-mesh', 'noise-pattern', 'starfield',
  'noise-overlay', 'scanlines', 'scanlines-overlay', 'vignette', 'static-flicker',
  'cursor-follower', 'chromatic-aberration', 'glass-crack', 'radar-scan',
  'horizontal-scroll', 'horizontal-panel-scroll', 'void-frame', 'tower-pricing', 'tracklist', 'glass-container', 'phase-container',
  'rune-symbols', 'ornaments', 'sheet-music', 'inscription', 'coffee-stain', 'document-stamp', 'marginalia', 'paper-edges',
  'dual-choice', 'cta-brutal', 'tension-bar', 'tension-meter',
  'chat-interface', 'secret-reveal',
  'countdown-timer', 'terminal-message',
];

const BASE_URL = 'https://chaos.oalacea.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const componentPages: MetadataRoute.Sitemap = COMPONENTS.map((component) => ({
    url: `${BASE_URL}/docs/${component}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...componentPages];
}
