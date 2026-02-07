'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@chaosui/lib/utils'

export interface InvertedCursorProps {
  /**
   * Size of the inverted cursor ring in pixels
   * @default 64
   */
  size?: number
  /**
   * Size of the center dot in pixels
   * @default 8
   */
  dotSize?: number
  /**
   * Enable/disable smooth trailing animation
   * @default true
   */
  smooth?: boolean
  /**
   * Smoothing factor (0-1), lower is smoother
   * @default 0.15
   */
  smoothing?: number
  /**
   * Hide default cursor
   * @default false
   */
  hideDefault?: boolean
  /**
   * Additional class names
   */
  className?: string
}

export const InvertedCursor = ({
  size = 64,
  dotSize = 8,
  smooth = true,
  smoothing = 0.15,
  hideDefault = false,
  className,
}: InvertedCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current

    if (!cursor || !dot) return

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY }

      if (!smooth) {
        posRef.current = { x: e.clientX, y: e.clientY }
        cursor.style.transform = `translate(${e.clientX - size / 2}px, ${e.clientY - size / 2}px)`
        dot.style.transform = `translate(${e.clientX - dotSize / 2}px, ${e.clientY - dotSize / 2}px)`
      }
    }

    const animate = () => {
      if (smooth) {
        const dx = targetPosRef.current.x - posRef.current.x
        const dy = targetPosRef.current.y - posRef.current.y

        posRef.current.x += dx * smoothing
        posRef.current.y += dy * smoothing

        cursor.style.transform = `translate(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px)`
        dot.style.transform = `translate(${posRef.current.x - dotSize / 2}px, ${posRef.current.y - dotSize / 2}px)`
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [size, dotSize, smooth, smoothing])

  useEffect(() => {
    if (hideDefault) {
      document.body.style.cursor = 'none'
      return () => {
        document.body.style.cursor = ''
      }
    }
  }, [hideDefault])

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9999] rounded-full',
          'mix-blend-difference invert will-change-transform',
          'transition-[width,height] duration-200 ease-out',
          className
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] bg-white rounded-full will-change-transform"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
        }}
      />
    </>
  )
}

InvertedCursor.displayName = 'InvertedCursor'
