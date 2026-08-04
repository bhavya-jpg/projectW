'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeader } from './section-header'
import { Reveal } from './reveal'
import { TESTIMONIALS } from '@/lib/config'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const PAGE_SIZE = 6

export function Testimonials() {
  const [offset, setOffset] = useState(0)
  const items = Array.from({ length: Math.min(PAGE_SIZE, TESTIMONIALS.length) }, (_, i) => TESTIMONIALS[(offset + i) % TESTIMONIALS.length])
  const container = useRef<HTMLElement>(null)

  // Initial scroll reveal
  useGSAP(() => {
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: container })

  // Animate on pagination change
  useGSAP(() => {
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.05,
      }
    )
  }, { scope: container, dependencies: [offset] })

  return (
    <section id="testimonials" ref={container} className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeader
          title="What our partners say."
          subtitle="Don't just take our word for it. Here's what engineering and product leaders have to say about our work."
          action={
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonials"
                  onClick={() => setOffset((o) => (o - PAGE_SIZE + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonials"
                  onClick={() => setOffset((o) => (o + PAGE_SIZE) % TESTIMONIALS.length)}
                  className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted"
                >
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          }
        />
      </Reveal>

      <div className="testimonials-grid mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <article
            key={`${t.name}-${i}-${offset}`}
            className="testimonial-card flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-foreground/5"
          >
            <div className="flex items-center gap-3">
              <Image
                src={t.avatar || '/placeholder.svg'}
                alt={t.name}
                width={44}
                height={44}
                className="size-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
              </div>
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t.quote}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

