export interface StaticFlickerProps {
  /** Flicker intensity level */
  intensity?: 'low' | 'medium' | 'high'
  /** Flicker speed in ms */
  speed?: number
  /** Additional class names */
  className?: string
}

/**
 * Static flicker overlay component for unstable signal effect.
 * Creates random opacity flickering for authenticity.
 */
export function StaticFlicker({
  intensity = 'medium',
  speed = 100,
  className = '',
}: StaticFlickerProps) {
  const intensityClass = `chaos-static-flicker--${intensity}`

  return (
    <div
      className={`chaos-static-flicker ${intensityClass} ${className}`.trim()}
      style={{
        animationDuration: `${speed}ms`,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  )
}
