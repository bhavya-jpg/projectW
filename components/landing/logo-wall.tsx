import { ChevronRight } from 'lucide-react'
import { Reveal } from './reveal'

// Swap these for your own partner / integration names.
const LOGOS = [
  'Northwind',
  'Turso',
  'Vertex',
  'Clerk',
  'Forge',
  'Basewave',
  'Nimbus',
  'Stripe',
]

export function LogoWall() {
  return (
    <section id="changelog" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal>
          <div className="flex h-full flex-col justify-between">
            <p className="max-w-sm text-xl leading-relaxed text-pretty text-foreground">
              Join 20,000+ ambitious teams building with AI at the center of their workflow.
            </p>
            <a
              href="#customers"
              className="mt-8 inline-flex h-11 w-fit items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Read customer stories
              <ChevronRight className="size-4" aria-hidden />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {LOGOS.map((name, i) => (
            <Reveal key={name} delay={(i % 4) * 60}>
              <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-border bg-card transition-colors hover:border-foreground/20">
                <span className="text-lg font-semibold tracking-tight text-foreground/80">
                  {name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
