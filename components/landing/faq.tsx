'use client'

import { useState } from 'react'
import { Plus, Minus, ChevronRight } from 'lucide-react'
import { Reveal } from './reveal'
import { BRAND_NAME } from './brand-logo'
import { cn } from '@/lib/utils'
import { FAQS, BOOKING_URL } from '@/lib/config'

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            Frequently asked questions.{' '}
            <span className="text-muted-foreground">
              Everything you need to know about working with us.
            </span>
          </h2>
        </div>
      </Reveal>

      <div className="mt-4">
        {FAQS.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.question} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span className="text-lg font-medium text-foreground">{item.question}</span>
                {isOpen ? (
                  <Minus className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                ) : (
                  <Plus className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                )}
              </button>
              <div
                className={cn(
                  'grid transition-all duration-300 ease-out',
                  isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-3xl leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
