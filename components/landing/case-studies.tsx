'use client'

import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { CarouselArrows, Scroller, useScroller } from './carousel'
import { SectionHeader } from './section-header'
import { Reveal } from './reveal'

const CASES = [
  {
    path: '/customers/logos/northwind.svg',
    title: 'How Northwind scales developer documentation to millions',
    stats: [
      { value: '5M+', label: 'Monthly API requests documented' },
      { value: '200+', label: 'Endpoints serviced' },
    ],
    img: '/case/office-building.png',
  },
  {
    path: '/customers/logos/summit.svg',
    title: 'See how Summit rebuilt their open-source contribution experience',
    stats: [
      { value: '3x', label: 'Faster docs contribution cycle' },
      { value: '40k', label: 'Community contributors' },
    ],
    img: '/case/team-working.png',
  },
]

export function CaseStudies() {
  const scrollerRef = useScroller()
  return (
    <section id="customers" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title={
              <>
                Powering businesses of all sizes.{' '}
                <span className="text-muted-foreground">
                  Run your business on a reliable platform that adapts to your needs.
                </span>
              </>
            }
            action={
              <div className="flex items-center gap-3">
                <CarouselArrows scrollerRef={scrollerRef} />
                <a
                  href="#contact"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  For enterprises
                  <ChevronRight className="size-4" aria-hidden />
                </a>
              </div>
            }
          />
        </Reveal>
      </div>

      <div className="mx-auto mt-10 max-w-7xl pl-4 sm:pl-6 lg:pl-8">
        <Scroller scrollerRef={scrollerRef} className="pr-4 sm:pr-6 lg:pr-8">
          {CASES.map((item, i) => (
            <article
              key={i}
              className="grid w-[88vw] max-w-[1000px] shrink-0 snap-start grid-cols-1 overflow-hidden rounded-xl border border-border bg-primary md:grid-cols-2"
            >
              <div className="flex flex-col justify-between gap-8 p-6 sm:p-9">
                <p className="font-mono text-xs text-primary-foreground/60">{item.path}</p>
                <h3 className="font-serif text-2xl leading-snug font-semibold text-balance text-primary-foreground sm:text-3xl">
                  {item.title}
                </h3>
                <div className="flex gap-10">
                  {item.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-serif text-3xl font-semibold text-primary-foreground">
                        {stat.value}
                      </p>
                      <p className="mt-1 max-w-[9rem] text-xs text-primary-foreground/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href="#customers"
                  className="inline-flex h-10 w-fit items-center justify-center gap-1.5 rounded-md bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
                >
                  Read the story
                  <ChevronRight className="size-4" aria-hidden />
                </a>
              </div>
              <div className="relative min-h-[240px] md:min-h-full">
                <Image
                  src={item.img || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 88vw, 500px"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </Scroller>
      </div>
    </section>
  )
}
