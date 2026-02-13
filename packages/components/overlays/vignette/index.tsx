export interface VignetteProps {
  /** Vignette intensity (0-1) */
  intensity?: number
  /** Size of vignette effect in pixels */
  size?: number
  /** Additional class names */
  className?: string
}

/**
 * Vignette overlay component for focus effect.
 * Creates dark corners with radial gradient.
 */
export function Vignette({
  intensity = 0.5,
  size = 500,
  className = '',
}: VignetteProps) {
  return (
    <div
      className={`chaos-vignette ${className}`.trim()}
      style={{
        '--vignette-intensity': intensity,
        '--vignette-size': `${size}px`,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  )
}
