'use client'

import { useState } from 'react'
import styles from './glitch-text.module.css'

export interface GlitchTextProps {
  text: string
  intensity?: 'low' | 'medium' | 'high'
  triggerOnHover?: boolean
  className?: string
}

export function GlitchText({
  text,
  intensity = 'medium',
  triggerOnHover = false,
  className = '',
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  const intensityClass = intensity === 'high' ? styles.highIntensity : intensity === 'low' ? styles.lowIntensity : ''

  return (
    <span
      className={`${styles.glitch} ${intensityClass} ${isGlitching ? styles.active : ''} ${className}`}
      data-text={text}
      onMouseEnter={() => triggerOnHover && setIsGlitching(true)}
      onMouseLeave={() => triggerOnHover && setIsGlitching(false)}
    >
      {text}
    </span>
  )
}
