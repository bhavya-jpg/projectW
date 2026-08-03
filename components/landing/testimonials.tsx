'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeader } from './section-header'
import { Reveal } from './reveal'

const POOL = [
  { name: 'Ethan Carter', role: 'Founder, NovaTech', avatar: '/avatars/a1.png', quote: 'This completely transformed the way our team manages work. Everything is faster, cleaner, and much easier to maintain.' },
  { name: 'Sophia Bennett', role: 'Product Designer, PixelFlow', avatar: '/avatars/a2.png', quote: "We've tried several tools, but this is by far the most intuitive and enjoyable to work with." },
  { name: 'Liam Foster', role: 'Engineering Lead, CloudForge', avatar: '/avatars/a3.png', quote: 'Our delivery went from outdated to world-class in just a few days thanks to this platform.' },
  { name: 'Olivia Hayes', role: 'Developer Advocate, DevCore', avatar: '/avatars/a4.png', quote: 'Publishing and shipping is effortless. The search experience alone is worth it.' },
  { name: 'Noah Brooks', role: 'CTO, StackPilot', avatar: '/avatars/a5.png', quote: 'We migrated everything over and instantly noticed happier developers and fewer support questions.' },
  { name: 'Emma Collins', role: 'Product Manager, LaunchPad', avatar: '/avatars/a6.png', quote: 'It gives our team the confidence to ship alongside every product release.' },
  { name: 'Marcus Reed', role: 'Head of Ops, Vantage', avatar: '/avatars/a1.png', quote: 'The automation caught blockers before they became real problems. A genuine step change for us.' },
  { name: 'Ava Mitchell', role: 'VP Product, Brightline', avatar: '/avatars/a2.png', quote: 'Onboarding a new hire used to take a week. Now our workspace does most of the work for us.' },
  { name: 'Daniel Price', role: 'Staff Engineer, Corewave', avatar: '/avatars/a3.png', quote: 'The AI agents feel like real teammates. They keep every workflow moving without hand-holding.' },
]

const PAGE_SIZE = 6

export function Testimonials() {
  const [offset, setOffset] = useState(0)
  const items = Array.from({ length: PAGE_SIZE }, (_, i) => POOL[(offset + i) % POOL.length])

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeader
          title="Trusted by teams building for agents."
          action={
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonials"
                  onClick={() => setOffset((o) => (o - PAGE_SIZE + POOL.length) % POOL.length)}
                  className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonials"
                  onClick={() => setOffset((o) => (o + PAGE_SIZE) % POOL.length)}
                  className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted"
                >
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </div>
              <a
                href="#customers"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Read more
                <ChevronRight className="size-4" aria-hidden />
              </a>
            </div>
          }
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <article
            key={`${t.name}-${i}`}
            className="flex flex-col rounded-xl border border-border bg-card p-6"
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
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t.quote}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
