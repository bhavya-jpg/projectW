'use client'

import { useRef, useEffect, useState } from 'react'
import { BOOKING_URL } from '@/lib/config'
import { ChevronRight } from 'lucide-react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
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

/* ---------------- WordCycler ---------------- */
const CYCLIC_WORDS = ['work', 'Automate', 'scale', 'build', 'function']

export const WordCycler = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % CYCLIC_WORDS.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={CYCLIC_WORDS[index]}
          initial={{ y: 10, opacity: 0, filter: 'blur(5px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -10, opacity: 0, filter: 'blur(5px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block relative text-white italic border-b-2 border-white/35 pb-0.5 sm:pb-1"
        >
          {CYCLIC_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
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
    <section id="top" className="relative w-full px-4 pt-4 pb-6 sm:pb-12 sm:px-6 lg:px-8">
      <div className="relative min-h-[70vh] sm:min-h-[85vh] w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-border shadow-2xl flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        
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

        {/* Main Content Area (Layout inspired by NEXORA reference design) */}
        <div className="relative z-10 my-auto pt-6 sm:pt-10 pb-6 sm:pb-8 flex flex-col justify-between min-h-[50vh] sm:min-h-[60vh]">
          
          {/* Main Headline & Action Buttons */}
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[-0.04em] leading-[1.05] text-white mb-6">
              <span className="block font-sans">
                <WordsPullUp text="Discover the way" />
              </span>
              <span className="block text-white/70 font-sans font-normal">
                <WordsPullUp text="enterprises should" /> <WordCycler />
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
          <div className="mt-8 sm:mt-16 grid grid-cols-12 items-end gap-4">
            
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
                Custom <span className="font-semibold text-white">AI solutions</span> that move your business forward — not just talk about it.
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
