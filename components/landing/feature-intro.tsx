'use client'

import { useRef } from 'react'
import { ShieldCheck, Cable, Users, PencilLine, ChevronRight } from 'lucide-react'
import { SectionHeader } from './section-header'
import { Reveal } from './reveal'
import { SERVICES } from '@/lib/config'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ICONS = [ShieldCheck, Cable, Users, PencilLine]

export function FeatureIntro() {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.feature-card',
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.feature-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: container })

  return (
    <section ref={container} className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeader
          title={
            <>
              What we do.{' '}
              <span className="text-muted-foreground">End-to-end AI solutions.</span>
            </>
          }
        />
      </Reveal>

      <div className="feature-grid mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {SERVICES.map((feature, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <article key={feature.title} className="feature-card bg-diagonal-lines group flex h-full min-h-[280px] flex-col justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 sm:p-8">
              <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:text-primary">
                <Icon className="size-5" aria-hidden />
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

