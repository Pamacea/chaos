'use client'

import { useState, useEffect } from 'react'
import styles from './flicker-text.module.css'

export interface FlickerTextProps {
  text: string
  flickerSpeed?: 'slow' | 'medium' | 'fast'
  className?: string
}

export function FlickerText({
  text,
  flickerSpeed = 'medium',
  className = '',
}: FlickerTextProps) {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const speedMap = {
      slow: { min: 100, max: 500 },
      medium: { min: 50, max: 200 },
      fast: { min: 20, max: 100 },
    }

    const { min, max } = speedMap[flickerSpeed]

    const flicker = () => {
      // Random opacity between 0.3 and 1
      const newOpacity = Math.random() * 0.7 + 0.3
      setOpacity(newOpacity)

      // Random delay between flickers
      const delay = Math.random() * (max - min) + min
      setTimeout(flicker, delay)
    }

    const timeout = setTimeout(flicker, Math.random() * max)
    return () => clearTimeout(timeout)
  }, [flickerSpeed])

  return (
    <span
      className={`${styles.flicker} ${className}`}
      style={{
        opacity,
        animationDuration: flickerSpeed === 'fast' ? '0.1s' : flickerSpeed === 'slow' ? '0.5s' : '0.2s',
      }}
    >
      {text}
    </span>
  )
}
