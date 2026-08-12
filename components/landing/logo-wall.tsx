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
    <section id="logo-wall" className="w-full py-8 sm:py-16 overflow-hidden">
      <Reveal>
        <p className="text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-6 sm:mb-10">
          Trusted by teams building the future
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LogoMarquee logos={LOGOS} />
      </Reveal>
    </section>
  )
}


