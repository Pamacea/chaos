'use client'

import { useRef, useState, cloneElement, ReactElement, CSSProperties } from 'react'
import styles from './cursor-magnet.module.css'

export interface CursorMagnetProps {
  /**
   * The child element to apply magnetic effect to
   */
  children: ReactElement
  /**
   * Magnetic pull strength (0-1)
   * @default 0.5
   */
  strength?: number
  /**
   * Radius in pixels where magnetic effect activates
   * @default 100
   */
  radius?: number
  /**
   * Enable/disable the magnetic effect
   * @default true
   */
  enabled?: boolean
  /**
   * Additional class names
   */
  className?: string
}

export const CursorMagnet = ({
  children,
  strength = 0.5,
  radius = 100,
  enabled = true,
  className,
}: CursorMagnetProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    if (distance < radius) {
      const moveX = distanceX * strength
      const moveY = distanceY * strength
      setTransform(`translate(${moveX}px, ${moveY}px)`)
    } else {
      setTransform('')
    }
  }

  const handleMouseLeave = () => {
    setTransform('')
  }

  const enhancedStyle: CSSProperties = {
    transform,
    ...children.props.style,
  }

  return (
    <div
      ref={elementRef}
      className={`${styles.magneticWrap} ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {cloneElement(children, {
        ...children.props,
        className: `${styles.magneticElement} ${children.props.className || ''}`,
        style: enhancedStyle,
      })}
    </div>
  )
}

CursorMagnet.displayName = 'CursorMagnet'
