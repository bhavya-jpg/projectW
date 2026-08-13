'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'
import { cn } from '@/lib/utils'

const TIERS = [
  {
    name: 'Hobby',
    img: '/halftone/cloud-gray.png',
    monthly: 0,
    annual: 0,
    seats: '3 seats included',
    blurb: (
      <>
        Everything you need to <span className="font-medium text-foreground">organize early work.</span>
      </>
    ),
    features: ['Unlimited issues', '1 active project', 'Basic AI summaries'],
    cta: 'Start for free',
    highlighted: false,
    outline: true,
  },
  {
    name: 'Starter',
    img: '/halftone/cloud-teal.png',
    monthly: 29,
    annual: 23,
    seats: '5 seats included',
    blurb: (
      <>
        Everything you need to <span className="font-medium text-foreground">run a growing team.</span>
      </>
    ),
    features: ['Unlimited projects', 'Slack and GitHub sync', 'AI triage and summaries'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Developers',
    img: '/halftone/cloud-orange.png',
    monthly: 99,
    annual: 79,
    seats: '15 seats included',
    blurb: (
      <>
        Everything you need to <span className="font-medium text-foreground">ship at startup speed.</span>
      </>
    ),
    features: ['Advanced roadmaps', 'Custom workflows', 'Agent automation runs'],
    cta: 'Get started',
    highlighted: true,
    popular: true,
  },
  {
    name: 'Startups',
    img: '/halftone/cloud-olive.png',
    monthly: 499,
    annual: 399,
    seats: '50 seats included',
    blurb: (
      <>
        Everything you need to <span className="font-medium text-foreground">operate at company scale.</span>
      </>
    ),
    features: ['Portfolio planning', 'Advanced permissions', 'Dedicated success support'],
    cta: 'Get started',
    highlighted: false,
  },
]

export function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-10 sm:py-20 md:py-24 lg:px-8">
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Our Pricing
            </h2>
            <p className="mt-4 inline-flex items-center gap-1 text-lg text-muted-foreground">
              Simple plans for teams adopting an AI-native workflow
              <ArrowUpRight className="size-4" aria-hidden />
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={cn(
                'text-sm font-medium',
                !annual ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual((v) => !v)}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                annual ? 'bg-primary' : 'bg-border',
              )}
            >
              <span
                className={cn(
                  'inline-block size-5 transform rounded-full bg-background transition-transform',
                  annual ? 'translate-x-5' : 'translate-x-0.5',
                )}
              />
            </button>
            <span
              className={cn(
                'text-sm font-medium',
                annual ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              Annually{' '}
              <span className="text-muted-foreground">(Save 20%)</span>
            </span>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier, i) => {
          const price = annual ? tier.annual : tier.monthly
          return (
            <Reveal key={tier.name} delay={i * 80}>
              <article
                className={cn(
                  'flex h-full flex-col overflow-hidden rounded-xl border bg-card',
                  tier.highlighted ? 'border-foreground/25 shadow-lg' : 'border-border',
                )}
              >
                <div className="relative h-28 w-full">
                  <Image
                    src={tier.img || '/placeholder.svg'}
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-muted-foreground">{tier.name}</h3>
                    {tier.popular && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium tracking-wide text-foreground uppercase">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-serif text-4xl font-semibold text-foreground">
                      {price === 0 ? 'Free' : `$${price}`}
                    </span>
                    {price !== 0 && (
                      <span className="text-sm text-muted-foreground">per month</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.seats}</p>

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{tier.blurb}</p>

                  <p className="mt-6 text-sm font-medium text-foreground">Included:</p>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="size-4 shrink-0 text-primary" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#get-started"
                    className={cn(
                      'mt-8 inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors',
                      tier.outline
                        ? 'border border-border bg-background text-foreground hover:bg-muted'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90',
                    )}
                  >
                    {tier.cta}
                  </a>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
