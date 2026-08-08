'use client'

import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { CarouselArrows, Scroller, useScroller } from './carousel'
import { SectionHeader } from './section-header'
import { Reveal } from './reveal'

const ITEMS = [
  { img: '/halftone/cloud-orange.png', tint: 'orange', title: 'Ship product experiments faster', tag: 'Product' },
  { img: '/halftone/cloud-gray.png', tint: 'gray', title: 'Coordinate launches across teams', tag: 'Operations' },
  { img: '/halftone/cloud-teal.png', tint: 'teal', title: 'Scale support without adding headcount', tag: 'Support' },
  { img: '/halftone/cloud-olive.png', tint: 'olive', title: 'Keep engineering unblocked', tag: 'Engineering' },
  { img: '/halftone/cloud-orange.png', tint: 'orange', title: 'Turn research into roadmap', tag: 'Research' },
]

export function Gallery() {
  const scrollerRef = useScroller()
  return (
    <section id="blog" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            title={
              <>
                Helping ambitious teams{' '}
                <span className="text-muted-foreground">build, launch, and scale faster.</span>
              </>
            }
            action={
              <div className="flex items-center gap-3">
                <CarouselArrows scrollerRef={scrollerRef} />
                <a
                  href="#customers"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  For startups
                  <ChevronRight className="size-4" aria-hidden />
                </a>
              </div>
            }
          />
        </Reveal>
      </div>

      <div className="mx-auto mt-10 max-w-7xl pl-4 sm:pl-6 lg:pl-8">
        <Scroller scrollerRef={scrollerRef} className="pr-4 sm:pr-6 lg:pr-8">
          {ITEMS.map((item, i) => (
            <article
              key={i}
              className="group relative aspect-[3/4] w-[280px] shrink-0 snap-start overflow-hidden rounded-xl border border-border sm:w-[320px]"
            >
              <Image
                src={item.img || '/placeholder.svg'}
                alt=""
                fill
                sizes="320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-black">
                  {item.tag}
                </span>
                <h3 className="mt-3 text-lg leading-snug font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </Scroller>
      </div>
    </section>
  )
}
