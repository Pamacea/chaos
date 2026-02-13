'use client'

import { useState, useEffect } from 'react'
import styles from './falling-text.module.css'

export interface FallingTextProps {
  text: string
  delay?: number
  className?: string
}

export function FallingText({
  text,
  delay = 50,
  className = '',
}: FallingTextProps) {
  const [visibleChars, setVisibleChars] = useState(0)
  const chars = text.split('')

  useEffect(() => {
    setVisibleChars(0)

    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= chars.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, delay)

    return () => clearInterval(interval)
  }, [text, delay, chars.length])

  return (
    <span className={`${styles.falling} ${className}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className={i < visibleChars ? styles.visible : styles.hidden}
          style={{
            transitionDelay: `${i * delay}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
