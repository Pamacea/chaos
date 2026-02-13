export interface ScanlinesProps {
  /** Opacity of scanlines (0-1) */
  opacity?: number
  /** Thickness of scanlines in pixels */
  lineSize?: number
  /** Animation speed (none, slow, medium, fast) */
  animationSpeed?: 'none' | 'slow' | 'medium' | 'fast'
  /** Additional class names */
  className?: string
}

/**
 * Scanlines overlay component for CRT monitor effect.
 * Creates horizontal lines like old displays.
 */
export function Scanlines({
  opacity = 0.1,
  lineSize = 2,
  animationSpeed = 'none',
  className = '',
}: ScanlinesProps) {
  const animationClass = animationSpeed !== 'none'
    ? `chaos-scanlines--${animationSpeed}`
    : ''

  return (
    <div
      className={`chaos-scanlines ${animationClass} ${className}`.trim()}
      style={{
        opacity,
        '--line-size': `${lineSize}px`,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  )
}
