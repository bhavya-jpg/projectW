import { FileText, Calendar } from 'lucide-react'
import { SectionHeader, PrimaryLink } from './section-header'
import { Reveal } from './reveal'

const PRIMARY = {
  id: 'about',
  title: (
    <>
      One workspace for product execution.{' '}
      <span className="text-muted-foreground">AI that keeps teams aligned.</span>
    </>
  ),
  features: [
    {
      icon: FileText,
      title: 'Issues that organize themselves',
      desc: 'Keep work moving with AI that captures, prioritizes, and routes issues automatically.',
    },
    {
      icon: Calendar,
      title: 'Projects that stay on track',
      desc: 'Plan milestones, monitor progress, and surface blockers before they slow your team down.',
    },
  ],
}

const SECONDARY = {
  id: 'workflow',
  title: (
    <>
      Everything in one place.{' '}
      <span className="text-muted-foreground">From first idea to shipped work.</span>
    </>
  ),
  features: [
    {
      icon: FileText,
      title: 'Knowledge that stays current',
      desc: 'Capture decisions and docs where the work happens, so context is never lost between teams.',
    },
    {
      icon: Calendar,
      title: 'Updates that write themselves',
      desc: 'Let agents summarize progress and share status automatically, so nobody chases updates.',
    },
  ],
}

export function FeatureIntro({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  const config = variant === 'secondary' ? SECONDARY : PRIMARY
  return (
    <section id={config.id} className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeader
          title={config.title}
          action={<PrimaryLink>Get started</PrimaryLink>}
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {config.features.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 100}>
            <article className="bg-diagonal-lines group flex h-full min-h-[420px] flex-col justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 sm:p-8">
              <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm">
                <feature.icon className="size-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
