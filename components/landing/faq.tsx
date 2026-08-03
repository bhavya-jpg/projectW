'use client'

import { useState } from 'react'
import { Plus, Minus, ChevronRight } from 'lucide-react'
import { Reveal } from './reveal'
import { BRAND_NAME } from './brand-logo'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: `What is ${BRAND_NAME}?`,
    a: `${BRAND_NAME} is an AI-native workspace for product and engineering teams. It brings issues, projects, knowledge, updates, and agents together so teams can move from intent to shipped work faster.`,
  },
  {
    q: `How does ${BRAND_NAME} work with AI agents?`,
    a: 'Agents run alongside your team, triaging issues, drafting updates, and executing routine workflows. You stay in control with clear permissions and full activity history.',
  },
  {
    q: 'Can I import my existing work?',
    a: 'Yes. Import issues, projects, and documents from the tools you already use, and keep them in sync with two-way integrations.',
  },
  {
    q: 'What integrations do you support?',
    a: 'Connect Slack, GitHub, and dozens of other tools, plus a full API and webhooks to extend your workflow however you need.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Plans scale by seats and capabilities, from a free Hobby tier to company-scale plans. Switch between monthly and annual billing at any time.',
  },
  {
    q: 'Is my data secure?',
    a: 'Your data is encrypted in transit and at rest, with role-based permissions, audit logs, and enterprise-grade controls available on higher tiers.',
  },
]

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            Frequently asked questions.{' '}
            <span className="text-muted-foreground">
              Everything you need to know about {BRAND_NAME}.
            </span>
          </h2>
          <a
            href="#contact"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact us
            <ChevronRight className="size-4" aria-hidden />
          </a>
        </div>
      </Reveal>

      <div className="mt-4">
        {FAQS.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span className="text-lg font-medium text-foreground">{item.q}</span>
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
                  <p className="max-w-3xl leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
