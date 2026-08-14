"use client"

import { Reveal } from './reveal'
import { LogoMarquee, Logo } from '@/components/ui/logo-marquee'

const LOGOS: Logo[] = [
  {
    src: "https://svgl.app/library/google.svg",
    alt: "Google",
  },
  {
    src: "/logos/zomato.svg",
    alt: "Zomato",
  },
  {
    src: "/logos/swiggy.svg",
    alt: "Swiggy",
  },
  {
    src: "/logos/snapbit.svg",
    alt: "Snapbit",
  },
  {
    src: "/logos/rapido.svg",
    alt: "Rapido",
  },
  {
    src: "/logos/snitch.svg",
    alt: "Snitch",
  },
  {
    src: "/logos/devon.svg",
    alt: "Devon",
  },
  {
    src: "/logos/drapai.svg",
    alt: "DrapAI",
  },
]

export function LogoWall() {
  return (
    <section id="logo-wall" className="w-full py-4 sm:py-8 overflow-hidden">
      <Reveal>
        <h2 className="text-center text-lg sm:text-2xl font-semibold tracking-wider text-muted-foreground uppercase mb-12 sm:mb-16 pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8">
          Built with the most ambitious companies
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <LogoMarquee logos={LOGOS} />
      </Reveal>
    </section>
  )
}


