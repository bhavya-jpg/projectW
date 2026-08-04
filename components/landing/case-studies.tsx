'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { CarouselArrows, Scroller, useScroller } from './carousel'
import { SectionHeader } from './section-header'
import { Reveal } from './reveal'
import { PROJECTS } from '@/lib/config'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function CaseStudies() {
  const scrollerRef = useScroller()
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Parallax effect on the images inside the carousel as the user scrolls down the page
    gsap.utils.toArray('.case-study-image').forEach((img: any) => {
      gsap.fromTo(
        img,
        { scale: 1.15, yPercent: -5 },
        {
          scale: 1,
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })
  }, { scope: container })

  return (
    <section ref={container} className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title={
              <>
                Solutions that deliver.{' '}
                <span className="text-muted-foreground">
                  Case studies of AI products we've shipped.
                </span>
              </>
            }
            action={
              <div className="flex items-center gap-3">
                <CarouselArrows scrollerRef={scrollerRef} />
              </div>
            }
          />
        </Reveal>
      </div>

      <div className="mx-auto mt-10 max-w-7xl pl-4 sm:pl-6 lg:pl-8">
        <Scroller scrollerRef={scrollerRef} className="pr-4 sm:pr-6 lg:pr-8">
          {PROJECTS.map((item, i) => (
            <article
              key={i}
              className="grid w-[88vw] max-w-[1000px] shrink-0 snap-start grid-cols-1 overflow-hidden rounded-xl border border-border bg-primary md:grid-cols-2 transition-colors hover:bg-primary/95"
            >
              <div className="flex flex-col justify-between gap-8 p-6 sm:p-9">
                <p className="font-mono text-xs text-primary-foreground/60">{item.label}</p>
                <h3 className="font-serif text-2xl leading-snug font-semibold text-balance text-primary-foreground sm:text-3xl">
                  {item.headline}
                </h3>
                <div className="flex gap-10">
                  {item.stats.map((stat, idx) => (
                    <div key={idx}>
                      <p className="font-serif text-2xl font-semibold text-primary-foreground">
                        {stat}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href={item.link}
                  className="inline-flex h-10 w-fit items-center justify-center gap-1.5 rounded-md bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
                >
                  View case study
                  <ChevronRight className="size-4" aria-hidden />
                </a>
              </div>
              <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.headline}
                  fill
                  sizes="(max-width: 768px) 88vw, 500px"
                  className="case-study-image object-cover will-change-transform"
                />
              </div>
            </article>
          ))}
        </Scroller>
      </div>
    </section>
  )
}

