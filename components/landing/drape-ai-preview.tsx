'use client'

import Lottie from 'lottie-react'
import drapeLottie from '@/public/drape-hero-lottie.json'

export function DrapeAiPreview({ className = '' }: { className?: string }) {
  return (
    <div className={`group/drape relative flex flex-1 h-full w-full min-h-[300px] sm:min-h-[420px] items-center justify-center bg-background/50 dark:bg-black/95 p-4 rounded-xl overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-pink-500/5 animate-pulse rounded-xl" />
      <div className="relative h-full w-full flex items-center justify-center overflow-hidden scale-110">
        <Lottie animationData={drapeLottie} loop={true} className="h-full w-full object-contain" />
      </div>
    </div>
  )
}
