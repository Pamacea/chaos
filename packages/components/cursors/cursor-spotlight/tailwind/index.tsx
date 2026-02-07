'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@chaosui/lib/utils'

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
  /**
   * Additional class names
   */
  className?: string
}

export const CursorSpotlight = ({
  size = 200,
  opacity = 0.85,
  smooth = true,
  smoothing = 0.1,
  showHighlight = true,
  overlayColor,
  className,
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

  return (
    <>
      <div
        ref={overlayRef}
        className={cn(
          'fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9998]',
          'will-change-[background]',
          className
        )}
        style={
          overlayColor
            ? {
                background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), transparent 0%, transparent ${size}px, ${overlayColor} calc(${size}px + 50px), ${overlayColor} 100%)`,
              }
            : {
                background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), transparent 0%, transparent ${size}px, rgba(0, 0, 0, ${opacity}) calc(${size}px + 50px), rgba(0, 0, 0, ${opacity}) 100%)`,
              }
        }
      />
      {showHighlight && (
        <div
          ref={highlightRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full will-change-transform"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </>
  )
}

CursorSpotlight.displayName = 'CursorSpotlight'
