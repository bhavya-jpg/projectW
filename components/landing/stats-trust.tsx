import { BarChart3, Sparkles, Clock, ChevronRight } from 'lucide-react'
import { SectionHeader } from './section-header'
import { CountUp } from './count-up'
import { Reveal } from './reveal'

const STATS = [
  {
    icon: BarChart3,
    value: 500,
    suffix: 'M+',
    label: 'tasks coordinated in the past year',
  },
  {
    icon: Sparkles,
    value: 6,
    suffix: 'B+',
    label: 'agent actions completed',
  },
  {
    icon: Clock,
    value: 99.99,
    decimals: 2,
    suffix: '%',
    label: 'uptime across all services',
  },
]

export function StatsTrust() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-20 md:py-24 lg:px-8">
      <Reveal>
        <SectionHeader
          title={
            <>
              Built for modern execution.{' '}
              <span className="text-muted-foreground">
                Enterprise-grade speed, reliability, and control.
              </span>
            </>
          }
          action={
            <a
              href="#contact"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              For enterprises
              <ChevronRight className="size-4" aria-hidden />
            </a>
          }
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3 md:divide-x md:divide-border">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100}>
            <div className="md:px-8 md:first:pl-0">
              <stat.icon className="size-5 text-muted-foreground" aria-hidden />
              <p className="mt-4 font-serif text-6xl font-semibold tracking-tight text-foreground">
                <CountUp
                  value={stat.value}
                  decimals={stat.decimals ?? 0}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-3 text-muted-foreground">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
