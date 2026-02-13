'use client'

import { useRef, useEffect } from 'react'
import styles from './distortion-text.module.css'

export interface DistortionTextProps {
  text: string
  distortionLevel?: 'low' | 'medium' | 'high'
  speed?: number
  className?: string
}

export function DistortionText({
  text,
  distortionLevel = 'medium',
  speed = 1,
  className = '',
}: DistortionTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    // Create SVG filter for liquid distortion
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('style', 'position: absolute; width: 0; height: 0;')

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    filter.setAttribute('id', `distortion-${Math.random().toString(36).substr(2, 9)}`)

    const turbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence')
    turbulence.setAttribute('type', 'fractalNoise')
    turbulence.setAttribute('baseFrequency', distortionLevel === 'high' ? '0.02' : distortionLevel === 'low' ? '0.005' : '0.01')
    turbulence.setAttribute('numOctaves', '2')
    turbulence.setAttribute('result', 'noise')

    const displacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap')
    displacementMap.setAttribute('in', 'SourceGraphic')
    displacementMap.setAttribute('in2', 'noise')
    displacementMap.setAttribute('scale', distortionLevel === 'high' ? '20' : distortionLevel === 'low' ? '5' : '10')

    filter.appendChild(turbulence)
    filter.appendChild(displacementMap)
    defs.appendChild(filter)
    svg.appendChild(defs)
    document.body.appendChild(svg)

    const filterId = filter.getAttribute('id')
    element.style.filter = `url(#${filterId})`

    let frame: number
    let time = 0

    const animate = () => {
      time += 0.05 * speed
      turbulence.setAttribute('baseFrequency', `${distortionLevel === 'high' ? '0.02' : distortionLevel === 'low' ? '0.005' : '0.01'} ${Math.sin(time) * 0.01}`)
      frame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(frame)
      document.body.removeChild(svg)
    }
  }, [distortionLevel, speed])

  return (
    <span
      ref={textRef}
      className={`${styles.distortion} ${className}`}
      style={{ animationDuration: `${2 / speed}s` }}
    >
      {text}
    </span>
  )
}
