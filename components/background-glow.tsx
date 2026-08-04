'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function BackgroundGlow() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return
    const ctx = gsap.context(() => {
      // Animate the blobs slowly to give it life and character
      gsap.to('.orb-1', {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to('.orb-2', {
        x: 'random(-80, 80)',
        y: 'random(-80, 80)',
        duration: 10,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: -2,
      })
      gsap.to('.orb-3', {
        x: 'random(-60, 60)',
        y: 'random(-60, 60)',
        duration: 12,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: -5,
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={container}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[100px] z-10" />
      
      {/* Orb 1: Violet */}
      <div className="orb-1 absolute -top-[10%] -left-[10%] h-[50vh] w-[50vw] rounded-full bg-purple-500/30 mix-blend-multiply blur-[120px] dark:bg-purple-600/20 dark:mix-blend-screen" />
      
      {/* Orb 2: Blue */}
      <div className="orb-2 absolute top-[20%] -right-[10%] h-[60vh] w-[40vw] rounded-full bg-blue-500/30 mix-blend-multiply blur-[120px] dark:bg-blue-600/20 dark:mix-blend-screen" />
      
      {/* Orb 3: Coral/Pink */}
      <div className="orb-3 absolute -bottom-[10%] left-[20%] h-[50vh] w-[60vw] rounded-full bg-rose-500/30 mix-blend-multiply blur-[120px] dark:bg-rose-600/20 dark:mix-blend-screen" />
    </div>
  )
}
