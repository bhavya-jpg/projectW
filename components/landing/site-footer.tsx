'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { AsciiVignetteBloomBackground } from './ascii-vignette-bloom'

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16.11 7.66v.01" />
    <circle cx="12" cy="12" r="4" />
  </svg>
)

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: false, amount: 0.1 })

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-[#0c0c0c] text-[#f4f4f0] selection:bg-[#f4f4f0] selection:text-[#0c0c0c]"
    >
      {/* Vignette Bloom Canvas Background */}
      <AsciiVignetteBloomBackground />

      {/* Footer Content Container */}
      <div className="relative z-10 mx-auto max-w-[1800px] px-6 pt-8 pb-4 sm:px-10 sm:pt-16 lg:px-16 lg:pt-20">
        
        {/* Top Grid: Left (Tagline & Button) | Right (Nav & Socials) */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          
          {/* Top Left: Tagline & "Take a seat" Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex flex-col items-start justify-between space-y-8 md:col-span-6 lg:col-span-7"
          >
            <h2 className="text-4xl font-normal tracking-tight sm:text-6xl lg:text-7xl text-[#f4f4f0]">
              Relax. We got you.
            </h2>


          </motion.div>

          {/* Top Right: Navigation & Social Links Columns */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="grid grid-cols-2 gap-10 md:col-span-6 lg:col-span-5 text-sm font-normal"
          >
            {/* Nav Links Column */}
            <div className="flex flex-col space-y-2 text-[#f4f4f0]">
              <a href="#" className="w-fit transition-opacity hover:opacity-70">Home</a>
              <a href="#solutions" className="w-fit transition-opacity hover:opacity-70">Work</a>
              <a href="#what-we-do" className="w-fit transition-opacity hover:opacity-70">About</a>
              <a href="#what-we-do" className="w-fit transition-opacity hover:opacity-70">Services</a>
              <a href="#contact" className="w-fit transition-opacity hover:opacity-70">Contact</a>
            </div>

            {/* Social Links Column */}
            <div className="flex flex-row space-x-6 text-[#f4f4f0]">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-fit transition-opacity hover:opacity-70" aria-label="X (Twitter)">
                <Twitter className="size-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-fit transition-opacity hover:opacity-70" aria-label="Instagram">
                <Instagram className="size-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-fit transition-opacity hover:opacity-70" aria-label="LinkedIn">
                <Linkedin className="size-5" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Middle Row: Locations (Left) | Email & Legal (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
          className="mt-12 sm:mt-24 grid grid-cols-1 gap-6 text-sm text-[#f4f4f0] md:grid-cols-12"
        >
          {/* Locations */}
          <div className="space-y-1 md:col-span-6 lg:col-span-7">
            <p>Delhi—India</p>
          </div>

          {/* Email & Legal */}
          <div className="flex flex-wrap items-center justify-between gap-6 md:col-span-6 lg:col-span-5">
            <a href="mailto:deworklabs@gmail.com" className="transition-opacity hover:opacity-70">
              deworklabs@gmail.com
            </a>
            <span>©2026 legal</span>
          </div>
        </motion.div>

        {/* Bottom Hero Typography: "rejouice" styled with Space Grotesk */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 w-full select-none overflow-hidden"
        >
          <svg
            viewBox="0 0 1000 160"
            className="w-full h-auto text-[#f4f4f0] overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="deWork Labs"
          >
            <text
              x="50%"
              y="130"
              textAnchor="middle"
              fill="currentColor"
              fontSize="120"
              fontWeight="300"
              letterSpacing="0.04em"
              style={{ fontFamily: "'Urbanist', var(--font-urbanist), sans-serif" }}
            >
              deWork Labs
            </text>
          </svg>
        </motion.div>

      </div>
    </footer>
  )
}
