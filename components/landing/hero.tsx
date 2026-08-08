'use client'

import { useRef, useEffect } from 'react'
import { BOOKING_URL } from '@/lib/config'
import { ChevronRight } from 'lucide-react'
import { BrandMark } from './brand-logo'
import { motion, useInView } from 'framer-motion'
import { SpecularButton } from '@/components/ui/SpecularButton'

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export const WordsPullUp = ({ text, className = '', style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <motion.span
            key={i}
            initial={{ y: 25, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : '0.25em' }}
          >
            {word}
          </motion.span>
        )
      })}
    </div>
  )
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      // Loop seamlessly right before the video ends to avoid native player freeze/pause
      if (video.duration && video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0.001
      }
    }

    const handleEnded = () => {
      video.currentTime = 0.001
      video.play().catch(() => {})
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <section id="top" className="relative w-full px-4 pt-4 pb-12 sm:px-6 lg:px-8">
      <div className="relative min-h-[85vh] w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-border shadow-2xl flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://res.cloudinary.com/qdfiwwkf/video/upload/v1786190053/nature_boy_laptop_final_video_flnxpe.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />

        {/* Top Tag / Pill */}
        <div className="relative z-10 self-start">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-white/90"
          >
            <BrandMark className="size-3.5 text-white" />
            <span>We are live, Launching Very Soon</span>
            <ChevronRight className="size-3.5 text-white/60" aria-hidden />
          </motion.div>
        </div>

        {/* Main Content Area (Layout inspired by NEXORA reference design) */}
        <div className="relative z-10 my-auto pt-10 pb-8 flex flex-col justify-between min-h-[60vh]">
          
          {/* Main Headline & Action Buttons */}
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[-0.04em] leading-[1.05] text-white mb-6">
              <span className="block font-sans">
                <WordsPullUp text="Discover the way" />
              </span>
              <span className="block text-white/70 font-sans font-normal">
                <WordsPullUp text="enterprises should work." />
              </span>
            </h1>

            {/* CTAs directly under title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <SpecularButton
                href={BOOKING_URL}
                size="md"
                radius={9999}
                tint="#ffffff"
                tintOpacity={0.15}
                blur={12}
                textColor="#ffffff"
                lineColor="#ffffff"
                baseColor="#888888"
                intensity={1.5}
                shineSize={15}
                shineFade={40}
                thickness={2}
                speed={0.4}
                followMouse
                proximity={300}
                autoAnimate
              >
                Book a call
                <ChevronRight className="size-4" aria-hidden />
              </SpecularButton>

              <a
                href="#solutions"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                See our work
              </a>
            </motion.div>
          </div>

          {/* Bottom Row: Description aligned bottom-center + scroll indicator bottom-right */}
          <div className="mt-16 grid grid-cols-12 items-end gap-4">
            
            {/* Tagline / micro copy bottom-left */}
            <div className="col-span-12 md:col-span-3 text-xs text-white/50 tracking-wider">
              AI-native solutions studio
            </div>

            {/* Center paragraph (like NEXORA reference description at bottom) */}
            <div className="col-span-12 md:col-span-6 text-center">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-md text-sm text-white/75 sm:text-base leading-relaxed"
              >
                Building custom <span className="font-semibold text-white">AI-powered</span> web products and solutions for forward-thinking companies.
              </motion.p>
            </div>

            {/* Bottom-right scroll prompt */}
            <div className="col-span-12 md:col-span-3 text-right hidden md:block">
              <a
                href="#solutions"
                className="text-xs text-white/50 tracking-widest hover:text-white transition-colors uppercase"
              >
                [Scroll to Explore]
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
