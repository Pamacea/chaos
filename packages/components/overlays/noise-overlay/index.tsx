export interface NoiseOverlayProps {
  /** Opacity of noise effect (0-1) */
  opacity?: number
  /** CSS blend mode */
  blendMode?: 'overlay' | 'multiply' | 'screen' | 'soft-light'
  /** Additional class names */
  className?: string
}

/**
 * Noise overlay component for adding film grain texture.
 * Uses SVG noise filter for performance.
 */
export function NoiseOverlay({
  opacity = 0.03,
  blendMode = 'overlay',
  className = '',
}: NoiseOverlayProps) {
  return (
    <div
      className={`chaos-noise-overlay ${className}`.trim()}
      style={{
        opacity,
        mixBlendMode: blendMode,
      }}
      aria-hidden="true"
    />
  )
}
