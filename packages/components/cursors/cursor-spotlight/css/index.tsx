'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './cursor-spotlight.module.css'

export interface CursorSpotlightProps {
  /**
   * Size of the spotlight in pixels
   * @default 200
   */
  size?: number
  /**
   * Opacity of the dark overlay (0-1)
   * @default 0.85
   */
  opacity?: number
  /**
   * Smooth the spotlight movement
   * @default true
   */
  smooth?: boolean
  /**
   * Smoothing factor (0-1), lower is smoother
   * @default 0.1
   */
  smoothing?: number
  /**
   * Show subtle highlight ring at cursor
   * @default true
   */
  showHighlight?: boolean
  /**
   * Color of the overlay (CSS color value)
   * @default 'rgba(0, 0, 0, 0.85)'
   */
  overlayColor?: string
}

export const CursorSpotlight = ({
  size = 200,
  opacity = 0.85,
  smooth = true,
  smoothing = 0.1,
  showHighlight = true,
  overlayColor,
}: CursorSpotlightProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetPosRef = useRef({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    const highlight = highlightRef.current

    if (!overlay) return

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY }

      if (!smooth) {
        posRef.current = { x: e.clientX, y: e.clientY }
        updateStyles(posRef.current)
      }
    }

    const updateStyles = (pos: { x: number; y: number }) => {
      overlay.style.setProperty('--x', `${pos.x}px`)
      overlay.style.setProperty('--y', `${pos.y}px`)

      if (highlight) {
        highlight.style.left = `${pos.x}px`
        highlight.style.top = `${pos.y}px`
      }
    }

    const animate = () => {
      if (smooth) {
        const dx = targetPosRef.current.x - posRef.current.x
        const dy = targetPosRef.current.y - posRef.current.y

        posRef.current.x += dx * smoothing
        posRef.current.y += dy * smoothing

        updateStyles(posRef.current)
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [smooth, smoothing])

  if (!mounted) return null

  const finalOpacity = overlayColor ? opacity : undefined

  return (
    <>
      <div
        ref={overlayRef}
        className={styles.overlay}
        style={
          overlayColor
            ? {
                background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), transparent 0%, transparent ${size}px, ${overlayColor} calc(${size}px + 50px), ${overlayColor} 100%)`,
              }
            : {
                '--size': `${size}px`,
                '--opacity': finalOpacity,
              }
        }
      />
      {showHighlight && (
        <div
          ref={highlightRef}
          className={styles.spotlight}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      )}
    </>
  )
}

CursorSpotlight.displayName = 'CursorSpotlight'
